export async function signTx(payload) {
    const res = await fetch('/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error(`SIGN_FAILED ${res.status}`)
    return res.json()          // { rawTx, txHash }
  }
  
  export async function signMessage({ address, message }) {
    const res = await fetch('/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ type: 'message', address, message })
    })
    if (!res.ok) throw new Error(`SIGN_FAILED ${res.status}`)
    const { signature } = await res.json()
    return signature
  }
  