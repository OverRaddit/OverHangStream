import React from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <h1>환영합니다!</h1>
    </div>
  );
};

export default HomePage;
