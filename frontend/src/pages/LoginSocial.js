// frontend/src/pages/LoginSocial.js
import React from 'react';

function LoginSocial() {
  const handleGoogleLogin = () => {
    // Chỉ cần mở /auth/google bên BE
    // Mặc định passport-google-oauth20 sẽ chuyển qua Google
    window.open('http://localhost:4000/auth/google', '_self');
  };

  return (
    <div>
      <h1>Login Social</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default LoginSocial;
