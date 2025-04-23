/**
 * strategies/google.js
 * Cấu hình Passport Google OAuth
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/user.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Tìm user trong DB
        let user = await UserModel.findOne({ socialId: profile.id });
        if (!user) {
          // Tạo user mới nếu chưa có
          user = new UserModel({
            email: profile.emails[0].value,
            socialId: profile.id,
            displayName: profile.displayName
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
