/**
 * wallet.routes.js
 */
const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares/auth.middleware');
const {
  createWallet,
  importWallet,
  getWallets,
  signData
} = require('../controllers/wallet.controller');

// Các route cần JWT
router.post('/create', isAuth, createWallet);
router.post('/import', isAuth, importWallet);
router.get('/list', isAuth, getWallets);
router.post('/sign', isAuth, signData);

module.exports = router;
