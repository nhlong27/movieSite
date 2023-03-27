import {  SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div>
      <SignUpContainer />
      <SignInContainer />
      <button onClick={() => navigate(-1)}>Auth done!</button>
    </div>
  );
};

export default Auth;
