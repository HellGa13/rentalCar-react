export const filtered = (cars, limit) => {
  if (!cars || !Array.isArray(cars)) {
    return [];
  }
  
  if (!limit || limit <= 0) {
    return cars;
  }
  
  return cars.slice(0, limit);
};