import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

export const PublicRoute: React.FC = () => {
  const {token, user} = useAuth()


  if(token && user) {

    return <Navigate to="/" replace />;
  }
 
  return <Outlet />;
};