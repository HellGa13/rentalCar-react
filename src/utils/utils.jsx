export const getCarData = car => {
  const { type, mileage, functionalities } = car;
  return { type, mileage, functionalities };
};

export const getLocationData = (address) => {
  if (!address) return { city: 'Unknown', country: 'Unknown' };

  const [country, city] = address.split(',').map(part => part.trim());
  return { city, country };
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
