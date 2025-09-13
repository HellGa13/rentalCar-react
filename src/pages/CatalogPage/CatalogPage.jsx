import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CarsList from '../../components/CarList/CarList';
import { selectCars, selectFilters } from '../../redux/selectors';
import { fetchCars } from '../../redux/cars/carsSlice';

import { filterCars } from '../../utils/filterCars';
import Filter from '../../components/Filters/Filters';
import { setFilter } from '../../redux/filters/filtersSlice';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const filter = useSelector(selectFilters);

  const filteredCars = filterCars(cars, filter);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilter(null));
  }, [dispatch]);

  return (
    <>
      <Filter cars={filteredCars} />
      {cars?.length > 0 && <CarsList adverts={filteredCars} />}
    </>
  );
};

export default CatalogPage;