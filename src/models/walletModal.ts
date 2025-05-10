import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true },
  encryptedPrivateKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mnemonic: { type: String, required: true },
});

export const WalletModel = mongoose.model("Wallet", walletSchema);
