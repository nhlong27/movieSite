import {  SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <SignUpContainer />
      <SignInContainer />
      <button onClick={() => navigate(-1)}>Auth done!</button>
    </div>
  );
};

export default AuthPage;
