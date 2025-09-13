// favorites/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const updated = [...state, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    },
    removeFavorite: (state, action) => {
      const updated = state.filter((car) => car.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    },
    // Додаткові методи для сумісності з вашим компонентом
    setToFavorites: (state, action) => {
      const car = action.payload;
      const exists = state.find(favCar => favCar.id === car.id);
      if (!exists) {
        const updated = [...state, car];
        localStorage.setItem('favorites', JSON.stringify(updated));
        return updated;
      }
      return state;
    },
    removeFromFavorites: (state, action) => {
      const car = action.payload;
      const updated = state.filter((favCar) => favCar.id !== car.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addFavorite, removeFavorite, setToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;