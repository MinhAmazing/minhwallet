import React from 'react'
import { ConnectButton } from '../wallet/index.js'
import useMyWallet from '../wallet/hooks/useMyWallet.js'
import { formatEther } from 'ethers'

function Balance() {
  const { provider, address } = useMyWallet()

  const [balance, setBalance] = React.useState(null)

  const fetchBalance = async () => {
    if (provider && address) {
      const bal = await provider.getBalance(address)
      setBalance(formatEther(bal))
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>My Wallet Demo</h1>
      <ConnectButton />
      {address && (
        <>
          <p>Address: {address}</p>
          <button onClick={fetchBalance}>Get Balance</button>
          {balance && <p>Balance: {balance} ETH</p>}
        </>
      )}
    </div>
  )
}

export default Balance;