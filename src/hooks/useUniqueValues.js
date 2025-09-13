// hooks/useUniqueValues.js
import { useMemo } from 'react';

export const useUniqueValues = (data, property) => {
  return useMemo(() => {
    // Перевіряємо чи data є масивом
    if (!Array.isArray(data) || !property) {
      console.warn('useUniqueValues: data is not an array or property is not provided', { data, property });
      return [];
    }

    try {
      // Витягуємо унікальні значення з масиву
      const uniqueValues = data
        .map(item => {
          // Перевіряємо чи item є об'єктом і має потрібну властивість
          if (item && typeof item === 'object' && item[property]) {
            return item[property];
          }
          return null;
        })
        .filter(value => value !== null && value !== undefined && value !== '') // Фільтруємо порожні значення
        .filter((value, index, array) => array.indexOf(value) === index) // Залишаємо тільки унікальні
        .sort(); // Сортуємо за алфавітом

      return uniqueValues;
    } catch (error) {
      console.error('Error in useUniqueValues:', error);
      return [];
    }
  }, [data, property]);
};