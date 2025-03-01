import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerContructorSlice';
import { orderSlice } from '../slices/orderSlice';
import { feedSlice } from '../slices/feedSlice';
import { placedOrdersSlice } from '../slices/placedOrdersSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  feedSlice,
  userSlice,
  placedOrdersSlice
);
