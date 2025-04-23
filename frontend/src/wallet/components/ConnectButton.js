import React from 'react'
import useMyWallet from '../hooks/useMyWallet.js'

export default function ConnectButton() {
  const { address, connect } = useMyWallet()

  return (
    <button onClick={connect} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      {address ? `Connected: ${address.slice(0, 6)}…` : 'Connect My Wallet'}
    </button>
  )
}
