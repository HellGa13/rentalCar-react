import PropTypes from 'prop-types';

import { useLoadMore } from '../../hooks/useLoadMore';
import { filtered } from '../../utils/filtered';

import CarCard from '../CarCards/CarCards';

const CarList = ({ adverts }) => {
  const [currentPage, carsLimit, loadMore] = useLoadMore(8);

  const indexOfLastCar = currentPage * carsLimit;

  return (
    <>
      <ul className="cards-list">
        {filtered(adverts, indexOfLastCar).map(car => (
          <CarCard car={car} key={car.id} />
        ))}
      </ul>
      {adverts?.length >= indexOfLastCar && (
        <button className="button-load" onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
};

CarList.propTypes = {
  adverts: PropTypes.array
};

export default CarList;