import { Request, Response } from "express";
import {
  createWalletService,
  swapTokensService,
} from "../services/walletService.js";

export async function createWalletHandler(req: Request, res: Response) {
  try {
    const wallet = await createWalletService();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function swapTokensHandler(req: Request, res: Response) {
  try {
    const { fromTokenAddress, toTokenAddress, amount, walletAddress } =
      req.body;
      console.log("User address is ", walletAddress);
      console.log("amount in controller is", amount);
    const swapResult = await swapTokensService(
      fromTokenAddress,
      toTokenAddress,
      amount,
      walletAddress
    );
    res.json(swapResult);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
