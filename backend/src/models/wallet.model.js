/**
 * wallet.model.js
 */
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, required: true },
  privateKeyEncrypted: { type: String, required: true },
  chain: { type: String, default: 'ETH' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', walletSchema);
