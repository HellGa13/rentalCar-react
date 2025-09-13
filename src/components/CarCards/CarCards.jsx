import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { carItemPropTypes } from './carItemPropTypes';
import { getLocationData } from '../../utils/utils';
import { removeFromFavorites, setToFavorites } from '../../redux/favorites/favoritesSlice';
import { selectFavorites } from '../../redux/selectors';

const CarCards = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const {
    id,
    year,
    brand,
    model,
    img,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const isFavorite = favorites?.some(favCar => favCar.id === id);
  const { city, country } = getLocationData(address);

  const handleToggleFavorite = () => {
    isFavorite
      ? dispatch(removeFromFavorites(car))
      : dispatch(setToFavorites(car));
  };

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className="car-card">
      <div className="overflow-hidden flex flex-col relative">
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`heart-button absolute top-4 right-4 ${isFavorite ? 'favorite' : ''}`}
          aria-label="Toggle favorite"
        >
          <svg className="heart-icon" width="18" height="18">
            <use href="#icon-heart"></use>
          </svg>
        </button>

        <img
          src={img}
          alt={`${brand} ${model}`}
          className="rounded-2xl h-67 w-full object-cover"
          loading="lazy"
        />

        <div className="flex flex-col justify-between h-39 px-3 pt-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              {`${brand} `}
              <span className="text-primary">{model}</span>
              {`, ${year}`}
            </h3>
            <p className="font-medium text-gray-900">{`$${rentalPrice}`}</p>
          </div>

          <p className="text-gray-400 text-xs mb-1">
            {`${city} | ${country} | ${rentalCompany}`}
          </p>
          <p className="text-gray-400 text-xs">
            {`${type} | ${mileage}`}
          </p>

          <button
            type="button"
            className="learn-more-button mt-4 w-full"
            onClick={handleReadMore}
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

CarCards.propTypes = carItemPropTypes;

export default CarCards;