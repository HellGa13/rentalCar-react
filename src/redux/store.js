import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
  },
});