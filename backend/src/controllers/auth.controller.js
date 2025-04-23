/**
 * auth.controller.js
 * Chứa hàm điều khiển cho luồng đăng nhập OAuth (Google, Facebook...) hoặc local login.
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Hàm gọi passport google (bắt đầu OAuth)
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback sau khi Google xác thực
exports.googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
});

// backend/src/controllers/auth.controller.js
exports.loginSuccess = (req, res) => {
    const user = req.user;
    // Tạo JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  
    // Thay vì trả JSON, ta redirect về FE kèm token:
    // Giả sử FE chạy ở http://localhost:3000
    const redirectUrl = `http://localhost:3000/social-login-success?token=${token}`;
    return res.redirect(redirectUrl);
  };
  

// Sau khi passport google callback thành công, trả JWT (hoặc token) cho client
// exports.loginSuccess = (req, res) => {
//   const user = req.user;
//   // Tạo JWT
//   const token = jwt.sign(
//     { userId: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' }
//   );

//   res.json({
//     message: 'Login success',
//     token,
//     user
//   });
// };
