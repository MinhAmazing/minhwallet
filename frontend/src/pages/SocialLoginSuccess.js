import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function SocialLoginSuccess() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Lấy token từ URL query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // Lưu token vào AuthContext (hoặc localStorage)
      login(token);
      async function getListAddress() {
        try {
          const res = await fetch('http://localhost:4000/wallet/list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            console.log("data list", data);
            // localStorage.setItem('mywallet:addr', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
            localStorage.setItem('mywallet:addr', data[0].address);
            localStorage.setItem('mywallet:wid', data[0]._id);
          } else {
            // alert(`Login Error: ${data.error}`);
          }
        } catch (err) {
          console.error(err);
          // alert('Có lỗi xảy ra');
        }
      }
      getListAddress();
    }
    // Điều hướng về trang Home (hoặc Dashboard) sau 1s
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, [login, navigate]);

  return (
    <div>
      <h2>Login successful!</h2>
      <p>Redirecting...</p>
    </div>
  );
}

export default SocialLoginSuccess;
