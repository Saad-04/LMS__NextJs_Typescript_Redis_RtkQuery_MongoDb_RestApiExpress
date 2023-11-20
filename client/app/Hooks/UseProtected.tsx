import { redirect } from 'next/navigation';
import UserAuth from './UserAuth';
import React, { FC } from 'react';

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = UserAuth(); //this return true and false

  return isAuthenticated ? children : redirect('/'); //this children in profile page
};
export default Protected;
