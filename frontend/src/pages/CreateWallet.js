import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function CreateWallet() {
  const { token } = useContext(AuthContext);

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:4000/wallet/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Tạo ví thành công: ${data.address}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra');
    }
  };

  return (
    <div>
      <h2>Create Wallet</h2>
      <button onClick={handleCreate}>Create new wallet</button>
    </div>
  );
}

export default CreateWallet;
