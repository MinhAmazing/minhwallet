/**
 * auth.middleware.js
 * Middleware kiểm tra JWT, lấy userId...
 */
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

exports.isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user; // Gắn user vào req để controller dùng
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
