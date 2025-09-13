// utils/priceOpt.js

export const priceOpt = (cars) => {
  // Перевіряємо чи cars є масивом
  if (!Array.isArray(cars)) {
    return [];
  }
  
  // Якщо масив порожній, повертаємо порожній масив без попередження
  if (cars.length === 0) {
    return [];
  }

  try {
    // Витягуємо і обробляємо ціни
    const prices = cars
      .map(car => {
        if (!car || !car.rentalPrice) return null;
        
        // Витягуємо числове значення з рядка ціни
        const numericPrice = parseFloat(car.rentalPrice.toString().replace(/[^0-9.]/g, ''));
        return isNaN(numericPrice) ? null : numericPrice;
      })
      .filter(price => price !== null && price > 0) // Фільтруємо валідні ціни
      .sort((a, b) => a - b); // Сортуємо по зростанню

    // Повертаємо унікальні ціни
    const uniquePrices = [...new Set(prices)];
    
    // Форматуємо назад до рядків з доларовим знаком
    return uniquePrices.map(price => `${price}`);
    
  } catch (error) {
    console.error('Error in priceOpt:', error);
    return [];
  }
};