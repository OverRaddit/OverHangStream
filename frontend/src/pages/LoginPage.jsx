import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <p>로그인 중입니다...</p>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
