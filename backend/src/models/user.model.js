/**
 * user.model.js
 * Mô hình User
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  socialId: { type: String },        // ID google/fb...
  displayName: { type: String },     // Tên hiển thị
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
