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

// const ProtectedRoute = ({
//   redirectPath = '/',
//   route,
//   children,
// }: {
//   redirectPath?: string;
//   route?: string;
//   children: JSX.Element;
// }) => {
//   const { data } = useGetUserQuery();
//   const navigate = useNavigate();
//   if (route === 'profile') {
//     if (!data) {
//       // return <Navigate to={redirectPath} replace />;
//       setTimeout(() => navigate(redirectPath), 1000);
//     }
//   } else if (route === 'auth') {
//     if (data) {
//       // return <Navigate to={redirectPath} replace />;
//       setTimeout(() => navigate(redirectPath), 1000);
//     }
//   }
//   return children;
// };

export default (props: ProtectedRouteProps) => (
  <Wrapper errorComponent={AuthPage}>
    <ProtectedRoute {...props} />
  </Wrapper>
);
