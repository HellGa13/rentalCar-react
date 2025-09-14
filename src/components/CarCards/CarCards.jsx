import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { carItemPropTypes } from './carItemPropTypes';
import { getLocationData } from '../../utils/utils';
import { removeFromFavorites, setToFavorites } from '../../redux/favorites/favoritesSlice';
import { selectFavorites } from '../../redux/selectors';

import css from './CarCard.module.css';

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

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(setToFavorites(car));
    }
  };

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div>
      <div className={css.cardInner}>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`${css.heartButton} ${isFavorite ? css.favorite : ''}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg className={css.heartIcon} width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorite ? "#3470FF" : "none"}
              stroke={isFavorite ? "#3470FF" : "#FFFFFF"}
              strokeWidth="2"
            />
          </svg>
        </button>

        <img
          src={img}
          alt={`${brand} ${model}`}
          className={css.image}
          loading="lazy"
        />

        <div className={css.cardContent}>
          <div className={css.header}>
            <h3 className={css.title}>
              {`${brand} `}
              <span className={css.highlight}>{model}</span>
              {`, ${year}`}
            </h3>
            <p className={css.price}>{`$${rentalPrice}`}</p>
          </div>

          <p className={css.meta}>
            {`${city} | ${country} | ${rentalCompany}`}
          </p>
          <p className={css.meta}>
            {`${type} | ${mileage}`}
          </p>

          <button
            type="button"
            className={css.readMoreButton}
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