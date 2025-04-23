import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ImportWallet() {
  const { token } = useContext(AuthContext);
  const [privateKey, setPrivateKey] = useState('');

  const handleImport = async () => {
    try {
      const res = await fetch('http://localhost:4000/wallet/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ privateKey })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Import thành công ví: ${data.address}`);
        setPrivateKey('');
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
      <h2>Import Wallet</h2>
      <input
        type="text"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Nhập private key..."
        style={{ width: '300px' }}
      />
      <button onClick={handleImport}>Import</button>
    </div>
  );
}

export default ImportWallet;
