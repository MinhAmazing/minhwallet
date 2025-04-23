/**
 * auth.routes.js
 * Định nghĩa route cho /auth
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { googleAuth, googleCallback, loginSuccess } = require('../controllers/auth.controller');

// passport Google
require('../strategies/google');

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, loginSuccess);

module.exports = router;
