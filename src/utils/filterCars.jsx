export const filterCars = (cars, filters) => {
  if (!cars || !Array.isArray(cars) || cars.length === 0) {
    return [];
  }

  if (!filters || Object.values(filters).every(value => !value)) {
    return cars;
  }

  return cars.filter(car => {
    if (filters.brand && filters.brand !== '') {
      if (car.brand !== filters.brand) {
        return false;
      }
    }

    if (filters.price && filters.price !== '') {
      const maxPrice = parseInt(filters.price);
      const carPrice = parseInt(car.rentalPrice?.toString().replace('$', '')) || 0;
      if (carPrice > maxPrice) {
        return false;
      }
    }

    if (filters.from && filters.from !== '') {
      const minMileage = parseInt(filters.from);
      const carMileage = parseInt(car.mileage?.toString().replace(/,/g, '')) || 0;
      if (carMileage < minMileage) {
        return false;
      }
    }

    if (filters.to && filters.to !== '') {
      const maxMileage = parseInt(filters.to);
      const carMileage = parseInt(car.mileage?.toString().replace(/,/g, '')) || 0;
      if (carMileage > maxMileage) {
        return false;
      }
    }

    return true;
  });
};