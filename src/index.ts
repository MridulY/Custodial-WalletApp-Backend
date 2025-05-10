import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import {
  createWalletHandler,
  swapTokensHandler,
} from "./controllers/walletController.js";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./utils/db.js";
import cors from "cors";



const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "https://custodial-wallet-app-frontend.vercel.app", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you send cookies or auth headers
  })
);
app.use(express.json()); // This will parse JSON request bodies


app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.post("/api/wallet/create", createWalletHandler);
app.post("/api/wallet/swap", swapTokensHandler);

const PORT = 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Backend server running at http://localhost:${PORT}`);
});
