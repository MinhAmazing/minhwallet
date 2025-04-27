import React, { useState, useEffect } from 'react'
import { ConnectButton } from '../wallet/index.js'
import useMyWallet from '../wallet/hooks/useMyWallet.js'
import { formatEther, parseEther } from 'ethers'

function Balance() {
  const { provider, address } = useMyWallet()

  const [balance, setBalance] = useState(null)
  const [receiver, setReceiver] = useState('')  // Địa chỉ ví người nhận
  const [amount, setAmount] = useState('')      // Số lượng ETH người dùng muốn gửi
  const [sending, setSending] = useState(false) // Trạng thái gửi giao dịch

  // Lấy số dư tài khoản
  const fetchBalance = async () => {
    if (provider && address) {
      const bal = await provider.getBalance(address)
      setBalance(formatEther(bal)) // Chuyển đổi từ wei sang ether
    }
  }

  // Hàm gửi ETH
  const sendETH = async () => {
    if (provider && address && receiver && amount) {
      try {
        setSending(true)

        // Kiểm tra xem số tiền gửi có hợp lệ không
        // const parsedAmount = parseEther(amount) // Chuyển đổi từ string sang BigNumber

        // Tạo giao dịch chưa ký (chưa có chữ ký)
        const tx = {
          to: receiver,       // Địa chỉ người nhận
          value: amount, // Số ETH cần gửi (được chuyển sang BigNumber)
        }

        // Gọi vào provider để gửi giao dịch
        const response = await provider.send("eth_sendTransaction", tx);
        console.log(response);

        // return;

        console.log('Transaction response:', response)

        // Sau khi giao dịch được gửi, làm gì đó (ví dụ: hiển thị txHash)
        alert('Transaction sent successfully. Wait for confirmation!')
        
      } catch (error) {
        console.error('Error sending ETH:', error)
        alert('Failed to send ETH. Please try again.')
      } finally {
        setSending(false)
      }
    } else {
      alert('Please ensure all fields are filled correctly.')
    }
  }

  // Hàm ký và gửi thông báo (personal_sign hoặc eth_signTypedData_v4)
  const signMessage = async () => {
    if (provider && address) {
      try {
        const message = "Hello, please sign this message"
        
        // Gọi vào provider để ký thông điệp
        const signature = await provider.request({
          method: 'personal_sign',
          params: [message, address]
        })

        console.log('Signature:', signature)
        
        // Sau khi ký, làm gì đó (ví dụ: hiển thị chữ ký)
        alert('Message signed successfully!')

      } catch (error) {
        console.error('Error signing message:', error)
        alert('Failed to sign message. Please try again.')
      }
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
          <br/>
          {balance && <p>Balance: {balance} ETH</p>}
          <br/>
          {/* Input cho người dùng nhập địa chỉ người nhận và số lượng ETH */}
          <div>
            <label>Receiver Address:</label>
            <input 
              type="text" 
              value={receiver} 
              onChange={(e) => setReceiver(e.target.value)} 
              placeholder="Enter receiver address" 
            />
          </div>
          <div>
            <label>Amount (ETH):</label>
            <input 
              type="text" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount to send" 
            />
          </div>
          <br/>
          <button onClick={sendETH} disabled={sending}>
            {sending ? 'Sending...' : 'Send ETH'}
          </button>
          <br/>
          {/* <button onClick={signMessage}>Sign Message</button> */}
        </>
      )}
    </div>
  )
}

export default Balance
