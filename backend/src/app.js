/**
 * app.js
 * Tạo Express app, kết nối MongoDB, cấu hình middleware...
 */
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const walletRoutes = require('./routes/wallet.routes');

// Kết nối MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo passport
app.use(passport.initialize());

// Sử dụng routes
app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the Wallet Backend!');
});

module.exports = app;
// minhpham@192 bl % cd ntf-marketplace-backend-api
// cd: no such file or directory: ntf-marketplace-backend-api
// minhpham@192 bl % cd nft-marketplace-backend-api
// minhpham@192 nft-marketplace-backend-api %