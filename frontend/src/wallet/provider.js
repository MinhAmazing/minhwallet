import { EventEmitter } from 'events'
import { signTx, signMessage } from './signer.js'
import { rpcRequest } from './utils/rpc.js'

export default class MyWalletProvider extends EventEmitter {
  constructor(chainIdHex = '0x7A69') {
    super()
    this.isMyWallet = true
    this.chainId = chainIdHex
  }

  /** EIP‑1193 request */
  async request({ method, params }) {
    switch (method) {
      case 'eth_chainId':
        return this.chainId
      case 'eth_accounts':
        return [await this._getAddress()]
      case 'eth_sendTransaction':
        return this._sendTx(params?.[0])
      case 'personal_sign':
      case 'eth_signTypedData_v4':
        return this._signMsg(method, params)
      default:
        return rpcRequest(method, params)
    }
  }

  // -------- helpers --------
  async _getAddress() {
    // const addr = localStorage.getItem('mywallet:addr')
    const addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    if (!addr) throw new Error('NOT_CONNECTED')
    return addr
  }

  async _sendTx(tx) {
    const { txHash } = await signTx(tx)
    this.emit('txSent', txHash)
    return txHash
  }

  async _signMsg(method, params) {
    const [msg, addr] = method === 'personal_sign' ? params : [params[1], params[0]]
    return signMessage({ address: addr, message: msg })
  }
}

/* Auto‑inject vào window để dApp phát hiện */
if (typeof window !== 'undefined' && !window.myWallet) {
  window.myWallet = new MyWalletProvider()
}
