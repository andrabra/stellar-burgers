import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />}>
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute children={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute children={<ResetPassword />} />}
        />
        <Route path='/profile' element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route
          path='*'
          element={<ProtectedRoute children={<NotFound404 />} />}
        />
      </Route>
    </Routes>
  </div>
);

export default App;
