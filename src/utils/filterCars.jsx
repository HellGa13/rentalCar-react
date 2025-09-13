export const filterCars = (cars, filter) => {
  if (!filter) {
    return cars;
  }

  return cars.filter(car => {
    const rentalPrice = parseInt(car.rentalPrice.substring(1));
    const mileage = parseFloat(car.mileage);

    const brandMatch =!filter.brand ||(car.make && filter.brand && car.make.toLowerCase() === filter.brand.toLowerCase());
    const priceMatch = !filter.price || rentalPrice <= parseInt(filter.price);
    const minMileageMatch = !filter.from || mileage >= filter.from;
    const maxMileageMatch = !filter.to || mileage <= filter.to;
    const companyMatch =
      !filter.rentalCompany ||
      car.rentalCompany.toLowerCase() === filter.rentalCompany.toLowerCase();

    return brandMatch && priceMatch && minMileageMatch && maxMileageMatch && companyMatch;
  });
};