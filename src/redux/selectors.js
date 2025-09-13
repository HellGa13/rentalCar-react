export const selectCars = state => state.cars.items;
export const selectAllCars = state => state.cars.allItems;
export const selectSelectedCar = state => state.cars.selectedCar;
export const selectCarBrands = state => state.cars.brands;
export const selectIsCarsLoading = state => state.cars.isLoading;
export const selectCarsError = state => state.cars.error;

export const selectCarById = (state, carId) =>
  state.cars.allItems.find(car => String(car.id) === String(carId));

export const selectShouldLoadBrands = (state) => {
  return state.cars.brands.length === 0 && !state.cars.isLoading;
};

export const selectReservations = state => state.reservations.items;
export const selectIsReservations = state =>
  state.reservations.items.length > 0;

// Favorites selectors
export const selectFavorites = (state) => {
  const favorites = state.favorites;
  return Array.isArray(favorites) ? favorites : [];
};

// Filters selector
export const selectFilters = (state) => state.filters || {};

// Додаткові селектори з захистом
export const selectFavoriteIds = (state) => {
  const favorites = selectFavorites(state);
  return favorites.map(car => car.id);
};

export const selectIsFavorite = (carId) => (state) => {
  const favorites = selectFavorites(state);
  return favorites.some(car => car.id === carId);
};

export const selectCarsWithFavoriteStatus = (state) => {
  const cars = selectCars(state);
  const favoriteIds = selectFavoriteIds(state);
  
  return cars.map(car => ({
    ...car,
    isFavorite: favoriteIds.includes(car.id)
  }));
};

// Селектор для автівок, які використовуються у фільтрах
export const selectCarsForFilters = (state) => {
  const allCars = selectAllCars(state);
  const currentCars = selectCars(state);
  return allCars.length > 0 ? allCars : currentCars;
};