import PropTypes from 'prop-types';

export const carItemPropTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    functionalities: PropTypes.array.isRequired,
    rentalPrice: PropTypes.string.isRequired,
    rentalCompany: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    mileage: PropTypes.number.isRequired
  }).isRequired,
  fav: PropTypes.bool
};