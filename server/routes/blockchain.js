const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const DataItem = require('../models/DataItem');
const crypto = require('crypto');
const Web3 = require('web3');

// Initialize Web3 with a provider
// For development, we'll use a default provider, but in production this should be configured
// to connect to a real Ethereum node or service like Infura
const web3 = new Web3(process.env.ETHEREUM_PROVIDER || 'http://localhost:8545');

// @route   POST api/blockchain/verify
// @desc    Verify data on blockchain
// @access  Private
router.post(
  '/verify',
  [
    auth,
    [
      check('dataId', 'Data ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dataId } = req.body;

    try {
      // Find the data item
      const dataItem = await DataItem.findById(dataId);
      
      // Check if data item exists
      if (!dataItem) {
        return res.status(404).json({ msg: 'Data item not found' });
      }
      
      // Check user ownership
      if (dataItem.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to verify this data' });
      }
      
      // Generate hash from data
      const dataHash = crypto.createHash('sha256').update(dataItem.data).digest('hex');
      
      // In a real application, this would interact with a deployed smart contract
      // For the basic version, we'll simulate blockchain verification
      
      // Update the data item with "blockchain" verification
      dataItem.blockchainVerified = true;
      dataItem.blockchainHash = dataHash;
      dataItem.blockchainTxId = 'tx_' + Math.random().toString(36).substring(2, 15); // Simulated transaction ID
      
      await dataItem.save();
      
      res.json({
        msg: 'Data verified on blockchain',
        dataItem
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/blockchain/status/:id
// @desc    Check blockchain verification status
// @access  Private
router.get('/status/:id', auth, async (req, res) => {
  try {
    // Find the data item
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
    
    // Return verification status
    res.json({
      verified: dataItem.blockchainVerified,
      hash: dataItem.blockchainHash,
      txId: dataItem.blockchainTxId
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Data item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/blockchain/validate
// @desc    Validate data integrity against blockchain
// @access  Private
router.post(
  '/validate',
  [
    auth,
    [
      check('dataId', 'Data ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dataId } = req.body;

    try {
      // Find the data item
      const dataItem = await DataItem.findById(dataId);
      
      // Check if data item exists
      if (!dataItem) {
        return res.status(404).json({ msg: 'Data item not found' });
      }
      
      // Check user ownership or access permissions
      if (dataItem.user.toString() !== req.user.id && 
          !dataItem.accessControl.some(ac => ac.user.toString() === req.user.id)) {
        return res.status(401).json({ msg: 'Not authorized to access this data' });
      }
      
      // Check if data has been verified
      if (!dataItem.blockchainVerified) {
        return res.status(400).json({ msg: 'Data has not been verified on blockchain yet' });
      }
      
      // Generate hash from current data
      const currentHash = crypto.createHash('sha256').update(dataItem.data).digest('hex');
      
      // Compare with stored hash
      const isValid = currentHash === dataItem.blockchainHash;
      
      res.json({
        isValid,
        storedHash: dataItem.blockchainHash,
        currentHash
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
