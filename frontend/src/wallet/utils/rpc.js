const RPC_URL = 'https://hardhat.imminh.com/'

export async function rpcRequest(method, params) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    })
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error.message)
  return json.result
}
