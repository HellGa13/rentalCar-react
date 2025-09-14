export const priceOpt = (cars) => {
  if (!Array.isArray(cars)) {
    return [];
  }
  
  if (cars.length === 0) {
    return [];
  }

  try {
    const prices = cars
      .map(car => {
        if (!car || !car.rentalPrice) return null;
        
        const numericPrice = parseFloat(car.rentalPrice.toString().replace(/[^0-9.]/g, ''));
        return isNaN(numericPrice) ? null : numericPrice;
      })
      .filter(price => price !== null && price > 0) 
      .sort((a, b) => a - b); 

    const uniquePrices = [...new Set(prices)];
    
    return uniquePrices.map(price => `${price}`);
    
  } catch (error) {
    console.error('Error in priceOpt:', error);
    return [];
  }
};