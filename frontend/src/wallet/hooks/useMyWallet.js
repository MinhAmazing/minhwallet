import { useCallback, useEffect, useState } from 'react'
import { BrowserProvider } from 'ethers'   // v6 – EIP‑1193 wrapper :contentReference[oaicite:0]{index=0}

export default function useMyWallet() {
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)
  const [chainId, setChainId] = useState(null)

  const connect = useCallback(async () => {
    if (!window.myWallet) throw new Error('Provider not found')
    console.log(window.myWallet);
    const eth = new BrowserProvider(window.myWallet)   // ethers v6 :contentReference[oaicite:1]{index=1}
    const signer = await eth.getSigner()
    setProvider(eth)
    setAddress(await signer.getAddress())
    setChainId((await eth.getNetwork()).chainId)
  }, [])

  useEffect(() => {
    // auto‑connect nếu đã lưu addr
    if (localStorage.getItem('mywallet:addr')) connect()
  }, [connect])

  return { provider, address, chainId, connect }
}
