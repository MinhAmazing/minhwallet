import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import WalletConnectDemo from './pages/WalletConnectDemo';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import LoginSocial from './pages/LoginSocial';
import SocialLoginSuccess from './pages/SocialLoginSuccess';
import Balance from './pages/Balance';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/login-social">Login</Link> |{" "}
          <Link to="/create-wallet">Create Wallet</Link> |{" "}
          <Link to="/import-wallet">Import Wallet</Link> |{" "}
          <Link to="/wc-demo">WalletConnect</Link>
          <Link to="/balance">Balance</Link>

        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to Wallet FE</h1>} />
          <Route path="/create-wallet" element={<CreateWallet />} />
          <Route path="/import-wallet" element={<ImportWallet />} />
          <Route path="/wc-demo" element={<WalletConnectDemo />} />
          <Route path="/login-social" element={<LoginSocial />} />
          <Route path="/social-login-success" element={<SocialLoginSuccess />} />
          <Route path="/balance" element={<Balance />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
