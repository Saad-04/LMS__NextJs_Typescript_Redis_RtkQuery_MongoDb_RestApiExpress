import { redirect } from 'next/navigation';
import UserAuth from './UserAuth';
import React, { FC } from 'react';

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect('/');
};
export default Protected;
