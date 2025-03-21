import React from 'react';
import authService from '../../services/authService';

const AuthForm = () => {
  const handleKakaoLogin = async () => {
    try {
      const { url } = await authService.kakaoLogin();
      window.location.href = url;
    } catch (error) {
      console.error('Kakao login failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <button onClick={handleKakaoLogin} className="kakao-login-btn">
        카카오로 로그인
      </button>
    </div>
  );
};

export default AuthForm;
