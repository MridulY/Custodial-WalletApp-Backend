import { Wallet, ethers } from "ethers";
import axios from "axios";
import { encryptPrivateKey, decryptPrivateKey } from "../utils/cryptoUtils.js";
import { WalletModel } from "../models/walletModal.js";

const UNISWAP_ROUTER_ADDRESS = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3"; 

const UNISWAP_ROUTER_ABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] path, address to, uint deadline) external returns (uint[] amounts)",
  "function getAmountsOut(uint amountIn, address[] path) public view returns (uint[] amounts)",
  "function addLiquidity(address tokenA, address tokenB, uint amountA, uint amountB, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
  "function allowance(address owner, address spender) public view returns (uint256)",
];

const UNISWAP_FACTORY_ABI = [
  "function getPair(address tokenA, address tokenB) external view returns (address pair)",
];


export async function createWalletService() {
  const wallet = Wallet.createRandom();
  const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey);

  const walletDoc = new WalletModel({
    address: wallet.address,
    encryptedPrivateKey,
    mnemonic: wallet.mnemonic?.phrase,
  });

  await walletDoc.save();

  return {
    address: wallet.address,
    encryptedPrivateKey,
    mnemonic: wallet.mnemonic?.phrase,
  };
}

export async function swapTokensService(
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: string,
  walletAddress: string
) {
  console.log("Wallet address from input", walletAddress);
  console.log("Token from address from input", fromTokenAddress);
  console.log("Token To address from input", toTokenAddress);
  console.log("amount from input", amount);
  const walletDoc = await WalletModel.findOne({
    address: walletAddress,
  });
  console.log("Wallet address from DB is", walletDoc?.address);

  if (!walletDoc) {
    throw new Error("Wallet not found!");
  }

  const privateKey = decryptPrivateKey(walletDoc.encryptedPrivateKey);
  const walletSigner = new Wallet(
    privateKey,
    ethers.getDefaultProvider(
      "https://sepolia.infura.io/v3/3b5892c7c5654215bf520b0e28e3ed52"
    )
  );

  const fromTokenContract = new ethers.Contract(
    fromTokenAddress,
    ERC20_ABI,
    walletSigner
  );

  const toTokenContract = new ethers.Contract(
    toTokenAddress,
    ERC20_ABI,
    walletSigner
  );

  const amountIn = ethers.parseUnits(amount, 18); 
  console.log("Approving token A...");
  let tx = await fromTokenContract.approve(UNISWAP_ROUTER_ADDRESS, amountIn);
  await tx.wait();
  console.log("Token A approved for swap.");

  const uniswapRouter = new ethers.Contract(
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_ROUTER_ABI,
    walletSigner
  );

  const path = [fromTokenAddress, toTokenAddress]; 
  const amountsOut = await uniswapRouter.getAmountsOut(amountIn, path);
  console.log("Estimated Amount Out:", ethers.formatUnits(amountsOut[1], 18));

  const slippage = 1; 
  const amountOutMin =
    (BigInt(amountsOut[1].toString()) * BigInt(100 - slippage)) / BigInt(100);

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; 
  console.log("Swapping tokens...");

  const swapTx = await uniswapRouter.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    path,
    walletAddress, 
    deadline 
  );

  const swapReceipt = await swapTx.wait();
  console.log("Swap transaction completed! Tx:", swapReceipt.transactionHash);

  return { txHash: swapTx.hash };
}