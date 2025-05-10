# Wallet Generator & Token Swap - Backend

## Overview
The **Backend** of the **Wallet Generator & Token Swap** application handles Ethereum wallet creation, private key encryption, token swap functionality using the **Uniswap V2** protocol, and secure storage of wallet-related data. Built using **Node.js** and **Express.js**, this backend securely manages user wallets, performs token swaps on the Ethereum testnet, and allows for retrieving wallet and transaction data.

The backend integrates with the **MongoDB** database to store user wallet data (address, private key, mnemonic) and securely handles sensitive information using **AES-256-CBC** encryption. It also exposes APIs for generating wallets, performing token swaps, and retrieving transaction history.

---

## Technologies Used
- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express.js**: A fast and minimal web framework for building APIs in Node.js.
- **MongoDB**: A NoSQL database used to store wallet data and transaction records.
- **ethers.js**: A library for interacting with the Ethereum blockchain, creating wallets, and interacting with smart contracts.
- **AES-256-CBC**: A symmetric encryption algorithm used to securely store private keys.
- **dotenv**: A module to manage environment variables for configuration.
- **Uniswap V2**: Decentralized exchange protocol used for token swaps on the Ethereum blockchain.

---

## Features
- **Wallet Generation**: Generates a new Ethereum wallet with a private key, address, and mnemonic phrase. The private key is encrypted before being stored.
- **Token Swap**: Facilitates token swaps using **Uniswap V2** on the Ethereum testnet. The backend handles token approval, swap transactions, and transaction history.
- **Transaction History**: Stores and retrieves transaction history for users (e.g., token swaps).
- **Private Key Encryption**: Encrypts private keys using **AES-256-CBC** before storing them in the database, ensuring the private key is never exposed in plaintext.
- **Secure API**: Provides API endpoints for wallet creation, key encryption, and token swap operations.

---

## API Endpoints
```json
### 1. **POST /api/wallet/create**
Generates a new wallet for the user.

- **Request**:
  {
    "walletName": "My Wallet"
  }
- **Response**:
  {
    "address": "0x123abc...",
    "privateKey": "encryptedPrivateKey",
    "mnemonic": "seed phrase"
  }
2. POST /api/wallet/swap
Performs a token swap using the Uniswap V2 protocol on the Ethereum testnet.

Request:

{
  "fromTokenAddress": "0xABC...",
  "toTokenAddress": "0xDEF...",
  "amountIn": "1.0",
  "amountOutMin": "0.9",
  "path": ["0xABC...", "0xDEF..."],
  "to": "0x123abc...",
  "deadline": 1627890565
}
Response:

{
  "txHash": "0xabcdef123..."
}
3. GET /api/wallet/transactions
Fetches the list of transactions associated with the user's wallet.

Response:

[
  {
    "transactionId": "12345",
    "from": "0xABC...",
    "to": "0xDEF...",
    "amount": "1.0",
    "status": "completed",
    "timestamp": 1627890565
  },
]
```
Setup Instructions
1. Clone the Repository
Clone the backend repository to your local machine:
```bash
git clone https://github.com/your-repo/backend
cd backend
```
2. Install Dependencies
Ensure Node.js and npm are installed, then install the required dependencies:
```bash
npm install
```
3. Run the Application
Start the backend server:
```bash
npm start
This will run the backend on http://localhost:3000.
```

### Folder Structure
```bash
/backend
  ├── /controllers    # Wallet creation and token swap logic
  ├── /models         # MongoDB models for wallet and transaction data
  ├── /routes         # API route definitions
  ├── /services       # Helper functions (wallet generation, encryption)
  ├── config.js       # Configuration for API keys, database, etc.
  ├── server.js       # Express server entry point
  ├── .env            # Environment variables
  └── package.json    # Project metadata and dependencies
```
