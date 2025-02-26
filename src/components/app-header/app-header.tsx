import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userState = useSelector(selectUser);
  const userName = userState.user?.name;

  return (
    <>
      <AppHeaderUI userName={userName || 'Личный кабинет'} />
      <Outlet />
    </>
  );
};
