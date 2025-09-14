import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    return serializedFavorites ? JSON.parse(serializedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const initialState = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setToFavorites: (state, action) => {
      const car = action.payload;
      const exists = state.find(favCar => favCar.id === car.id);
      
      if (!exists) {
        state.push(car);
        saveFavoritesToStorage(state);
      }
    },
    removeFromFavorites: (state, action) => {
      const car = action.payload;
      const index = state.findIndex(favCar => favCar.id === car.id);
      
      if (index !== -1) {
        state.splice(index, 1);
        saveFavoritesToStorage(state);
      }
    },
    clearFavorites: (state) => {
      state.length = 0;
      saveFavoritesToStorage(state);
    },
    loadFavorites: (state) => {
      const loaded = loadFavoritesFromStorage();
      state.length = 0;
      state.push(...loaded);
    }
  },
});

export const { 
  setToFavorites, 
  removeFromFavorites, 
  clearFavorites, 
  loadFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;