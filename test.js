import { swapTokensService } from "./src/services/walletService.js"; // Update this path
import mongoose from "mongoose";

// ✅ Connect to your MongoDB
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/crypto-wallet");
  console.log("Connected to MongoDB");
}

// ✅ Swap test runner
async function runSwapTest() {
  try {
    await connectDB();

    // Example swap test
    const fromToken = "0x06DDeeD3D2Eb3dEad723c037b89E4384BFb29Bf8"; // Replace with actual ERC20 token contract on Sepolia
    const toToken = "0x4ffD88e2DB68323585986233CEDf0ff087C72D30"; // Replace with another ERC20 token contract on Sepolia

    const amountToSwap = "1000"; // 0.01 token amount
    const userWalletAddress = "0x93Dc6f3110EDC05f1cC7f784EB957FBB1cE5519b"; // Your wallet

    const result = await swapTokensService(
      fromToken,
      toToken,
      amountToSwap,
      userWalletAddress
    );

    console.log("Swap successful! TX Hash:", result.txHash);
  } catch (error) {
    console.error("Error during swap test:", error);
  } finally {
    mongoose.disconnect();
  }
}

runSwapTest();
