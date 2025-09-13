const parseAddress = (address) => {
  if (!address) return { city: '', country: '' };
  
  try {
    const addressParts = address.split(',').map(part => part.trim());
    
    if (addressParts.length >= 2) {
      const country = addressParts[addressParts.length - 1];
      const city = addressParts[addressParts.length - 2];
      
      return { city, country };
    } else if (addressParts.length === 1) {
      return { city: addressParts[0], country: '' };
    }
    
    return { city: '', country: '' };
  } catch (error) {
    console.error('Error parsing address:', error);
    return { city: '', country: '' };
  }
};

export const getCarData = car => {
  const { type, mileage, functionalities } = car;
  return { type, mileage, functionalities };
};

export const getLocationData = (address, car) => {
  const { city, country } = parseAddress(address);
  const { rentalCompany } = car;
  return [city, country, rentalCompany];
};

export const formatPrice = (price) => {
  if (!price) return '';
  const numericPrice = String(price).replace(/[^0-9.]/g, '');
  return `${numericPrice}`;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const findShortestString = arrStrings => {
  if (!arrStrings || arrStrings.length === 0) {
    return '';
  }

  let shortest = arrStrings[0];
  for (let i = 1; i < arrStrings.length; i++) {
    const currentString = arrStrings[i];
    if (currentString.split(' ').length < shortest.split(' ').length) {
      shortest = currentString;
    }
  }

  const shortestWords = shortest.split(' ');

  return shortestWords.length > 3 ? shortestWords.slice(0, 3).join(' ') : shortest;
};

export const formatedValue = (key, value) => {
  if (key === 'functionalities') {
    return findShortestString(value);
  } else if (key === 'type') {
    return value.split(',')[0].trim();
  }
  return value;
};

export const renderItem = (arr, el, className) => {
  return arr.map((item, idx) => (
    <li
      key={idx}
      className={
        className
          ? `text-description ${className} dark:text-white/50`
          : 'text-description dark:text-white/50'
      }
    >
      {item}
      {idx < arr.length - 1 && el}
    </li>
  ));
};
