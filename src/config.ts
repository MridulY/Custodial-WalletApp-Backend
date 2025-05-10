import dotenv from "dotenv";
dotenv.config();

export const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "12345678901234567890123456789012"; // 32 chars
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/walletdb";
export const JWT_SECRET = process.env.JWT_SECRET || '1234';
