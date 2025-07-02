# Blockchain-Driven Personal Data Vault

A secure platform for storing personal data using blockchain technology for verification and security.

## Features

- Secure user authentication
- Personal data storage with encryption
- Blockchain verification for data integrity
- User-friendly interface with modern design
- Data access control and permissions
- Automatic Ethereum wallet address generation for new users
- Beautiful landing page showcasing the application

## Tech Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Blockchain**: Ethereum (Web3.js)
- **Authentication**: JWT-based auth

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js/Express backend API
- `/contracts` - Solidity smart contracts for Ethereum blockchain

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally)
- Metamask or other Ethereum wallet (for full blockchain functionality)

### Installation & Setup

#### 1. Clone the repository

```bash
git clone https://github.com/devxyasir/Blockchain-Driven-Personal-Data-Vault
cd blockchain-data-vault
```

#### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory with:
```
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
ADMIN_EMAIL=devxsecure@gmail.com

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/blockchain-data-vault

# Email Validation
ENABLE_SMTP_VERIFICATION=true

# Blockchain Configuration
ETH_NETWORK=goerli
ETH_PRIVATE_KEY=your_ethereum_private_key_here

```

Make sure MongoDB is running locally:
- Windows: Run MongoDB as a service or use MongoDB Compass
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

#### 3. Set up the frontend

```bash
cd ../client
npm install
```

#### 4. Start the application

In the server directory:
```bash
npm start
```

In the client directory:
```bash
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Usage

1. Visit the landing page at http://localhost:3000
2. Register a new account (a random Ethereum wallet address will be generated for you)
3. Log in to access your dashboard
4. Add, manage, and verify your personal data
5. Share data with authorized users as needed

## License

MIT
