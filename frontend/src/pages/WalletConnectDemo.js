import React, { useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
// ethers v6
import { BrowserProvider, parseUnits } from 'ethers'; 

function WalletConnectDemo() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      const wcProvider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/your-infura-id",
          5: "https://goerli.infura.io/v3/your-infura-id"
        },
        chainId: 5
      });

      await wcProvider.enable();

      // ethers v6: dùng BrowserProvider
      const provider = new BrowserProvider(wcProvider);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>WalletConnect Demo</h2>
      <button onClick={connectWallet}>Connect with WalletConnect</button>
      {account && <p>Connected address: {account}</p>}
    </div>
  );
}

export default WalletConnectDemo;
