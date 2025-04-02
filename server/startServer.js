const { exec } = require('child_process');
const { spawn } = require('child_process');
require('dotenv').config();

// Check if MongoDB is running locally
console.log('Checking if MongoDB is running...');

// Define the command to check MongoDB status based on OS
const checkMongoCmd = process.platform === 'win32' 
  ? 'sc query MongoDB' 
  : 'systemctl status mongod';

exec(checkMongoCmd, (error, stdout, stderr) => {
  const isMongoRunning = !error && stdout.includes(process.platform === 'win32' ? 'RUNNING' : 'active (running)');
  
  if (isMongoRunning) {
    console.log('MongoDB is running. Starting server...');
    startServer();
  } else {
    console.log('MongoDB is not running. Please start MongoDB and try again.');
    console.log('You can start MongoDB:');
    console.log('- On Windows: Run "net start MongoDB" as administrator');
    console.log('- On Linux: Run "sudo systemctl start mongod"');
    console.log('- On macOS: Run "brew services start mongodb-community@6.0" (or your installed version)');
    process.exit(1);
  }
});

function startServer() {
  console.log(`Starting server on port ${process.env.PORT || 5000}...`);
  
  // Start the server
  const server = spawn('node', ['server.js'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
}
