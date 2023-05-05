import { useGetUserQuery } from '@/features/profile';
import AuthPage from '@/pages/AuthPage';
import Wrapper from './handling/Wrapper';
import React from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data } = useGetUserQuery();
  return data ? children : null;
};

export default (props: ProtectedRouteProps) => (
  <Wrapper errorComponent={AuthPage}>
    <ProtectedRoute {...props} />
  </Wrapper>
);
