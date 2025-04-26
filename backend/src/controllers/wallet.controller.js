/**
 * wallet.controller.js
 */
const { ethers } = require('ethers');
const WalletModel = require('../models/wallet.model');
const { encrypt, decrypt } = require('../utils/encrypt');

const providerUrl = "https://hardhat.imminh.com/";
const toAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

exports.createWallet = async (req, res) => {
  try {
    const userId = req.user._id; // Lấy từ middleware JWT
    const wallet = ethers.Wallet.createRandom();
    const privateKeyEncrypted = encrypt(wallet.privateKey);

    const newWallet = new WalletModel({
      userId,
      address: wallet.address,
      privateKeyEncrypted
    });

    await newWallet.save();

    return res.json({
      message: 'Wallet created successfully',
      address: wallet.address
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.importWallet = async (req, res) => {
  try {
    const userId = req.user._id;
    const { privateKey } = req.body;

    if (!privateKey) {
      return res.status(400).json({ error: 'Missing privateKey' });
    }

    let wallet;
    try {
      wallet = new ethers.Wallet(privateKey);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Invalid privateKey' });
    }

    const privateKeyEncrypted = encrypt(wallet.privateKey);

    const importedWallet = new WalletModel({
      userId,
      address: wallet.address,
      privateKeyEncrypted
    });

    await importedWallet.save();

    return res.json({
      message: 'Wallet imported successfully',
      address: wallet.address
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getWallets = async (req, res) => {
  try {
    const userId = req.user._id;
    const wallets = await WalletModel.find({ userId });

    // Không trả privateKeyEncrypted
    const data = wallets.map((w) => ({
      _id: w._id,
      address: w.address,
      chain: w.chain
    }));

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.signData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { walletId, tx } = req.body;
    const {to, value} = tx;

    const walletDoc = await WalletModel.findOne({ _id: walletId, userId });
    if (!walletDoc) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const decryptedKey = decrypt(walletDoc.privateKeyEncrypted);
    console.log("DE", decryptedKey);
    // const userWallet = new ethers.Wallet(decryptedKey);

    // Ký message
    // const signature = await userWallet.signMessage(ethers.utils.arrayify(dataToSign));

    // return res.json({ signature });

    // try {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    // Create a wallet instance
    const wallet = new ethers.Wallet(decryptedKey, provider);

    // Convert the amount to wei
    const amountInWei = ethers.utils.parseEther(value);

    // Create a transaction object
    const txToSign = {
      to: to,
      value: amountInWei,
      gasLimit: 21001
    };

    // Send the transaction
    const transaction = await wallet.sendTransaction(txToSign);
    
    console.log("Transaction sent:", transaction.hash);

    // Wait for the transaction to be mined
    await transaction.wait();
    // } catch (err) {
    //   console.log("err", err);
    //     }
    console.log("Transaction confirmed.");
    return res.json({ "signature": transaction.hash });
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error: error.message });
  }
};
