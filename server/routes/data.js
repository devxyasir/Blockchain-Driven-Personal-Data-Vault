const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const DataItem = require('../models/DataItem');
const User = require('../models/User');

// @route   GET api/data
// @desc    Get all user's data items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const dataItems = await DataItem.find({ user: req.user.id }).sort({ dateCreated: -1 });
    res.json(dataItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/:id
// @desc    Get data item by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const dataItem = await DataItem.findById(req.params.id);
    
    // Check if data item exists
    if (!dataItem) {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    
    // Check user ownership or access permissions
    if (dataItem.user.toString() !== req.user.id && 
        !dataItem.accessControl.some(ac => ac.user.toString() === req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized to access this data' });
    }
    
    res.json(dataItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/data
// @desc    Create a new data item
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('data', 'Data content is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, data, tags, isEncrypted } = req.body;

    try {
      // Create new data item
      const newDataItem = new DataItem({
        user: req.user.id,
        title,
        description,
        category,
        data,
        tags,
        isEncrypted: isEncrypted !== undefined ? isEncrypted : true
      });

      const dataItem = await newDataItem.save();
      res.json(dataItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/data/:id
// @desc    Update a data item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, category, data, tags, isEncrypted } = req.body;

  // Build data item object
  const dataItemFields = {};
  if (title) dataItemFields.title = title;
  if (description !== undefined) dataItemFields.description = description;
  if (category) dataItemFields.category = category;
  if (data) dataItemFields.data = data;
  if (tags) dataItemFields.tags = tags;
  if (isEncrypted !== undefined) dataItemFields.isEncrypted = isEncrypted;
  
  try {
    let dataItem = await DataItem.findById(req.params.id);
    
    // Check if data item exists
    if (!dataItem) {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    
    // Check user ownership
    if (dataItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this data' });
    }
    
    // Update data item
    dataItem = await DataItem.findByIdAndUpdate(
      req.params.id,
      { $set: dataItemFields },
      { new: true }
    );
    
    res.json(dataItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/data/:id
// @desc    Delete a data item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const dataItem = await DataItem.findById(req.params.id);
    
    // Check if data item exists
    if (!dataItem) {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    
    // Check user ownership
    if (dataItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this data' });
    }
    
    // Remove data item
    await dataItem.remove();
    
    res.json({ msg: 'Data item removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/data/:id/share
// @desc    Share a data item with another user
// @access  Private
router.post(
  '/:id/share',
  [
    auth,
    [
      check('email', 'Target user email is required').isEmail(),
      check('accessLevel', 'Access level is required').isIn(['read', 'write', 'admin'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, accessLevel, expiresAt } = req.body;

    try {
      // Find the data item
      const dataItem = await DataItem.findById(req.params.id);
      
      // Check if data item exists
      if (!dataItem) {
        return res.status(404).json({ msg: 'Data item not found' });
      }
      
      // Check user ownership
      if (dataItem.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to share this data' });
      }
      
      // Find target user by email
      const targetUser = await User.findOne({ email });
      if (!targetUser) {
        return res.status(404).json({ msg: 'Target user not found' });
      }
      
      // Check if already shared
      const alreadyShared = dataItem.accessControl.some(
        ac => ac.user.toString() === targetUser._id.toString()
      );
      
      if (alreadyShared) {
        // Update existing access control
        dataItem.accessControl = dataItem.accessControl.map(ac => {
          if (ac.user.toString() === targetUser._id.toString()) {
            return {
              user: targetUser._id,
              accessLevel,
              expiresAt: expiresAt || ac.expiresAt
            };
          }
          return ac;
        });
      } else {
        // Add new access control
        dataItem.accessControl.push({
          user: targetUser._id,
          accessLevel,
          expiresAt
        });
      }
      
      await dataItem.save();
      
      res.json(dataItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/data/:id/share/:userId
// @desc    Remove sharing of a data item with a user
// @access  Private
router.delete('/:id/share/:userId', auth, async (req, res) => {
  try {
    // Find the data item
    const dataItem = await DataItem.findById(req.params.id);
    
    // Check if data item exists
    if (!dataItem) {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    
    // Check user ownership
    if (dataItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to modify sharing for this data' });
    }
    
    // Remove user from access control
    dataItem.accessControl = dataItem.accessControl.filter(
      ac => ac.user.toString() !== req.params.userId
    );
    
    await dataItem.save();
    
    res.json(dataItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
