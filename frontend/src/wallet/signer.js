


export async function signTx(token, walletId, payload) {
  console.log("AA");
  // console.log("A", JSON.stringify({walletId, tx: payload}))
  try {
    const res = await fetch('http://localhost:4000/wallet/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`},
      credentials: 'include',
      body: JSON.stringify({walletId, tx: payload})
    })
  
    if (!res.ok) throw new Error(`SIGN_FAILED ${res.status}`)
      
    return res.json()          // { rawTx, txHash }
}catch(err) {
      console.log("err", err);
    }
  }
  
  export async function signMessage(token, { address, message }) {
    console.log("B");
    const res = await fetch('http://localhost:4000/wallet/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      credentials: 'include',
      body: JSON.stringify({ type: 'message', address, message })
    })
    if (!res.ok) throw new Error(`SIGN_FAILED ${res.status}`)
    const { signature } = await res.json()
    return signature
  }
  