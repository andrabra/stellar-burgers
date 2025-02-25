import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/services/store'; // Убедитесь, что путь правильный

type ProtectedRouteProps = {
  children?: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) =>
  children ? children : <Outlet />;

export default ProtectedRoute;
