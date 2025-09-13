import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';

import { fetchCarById } from '../../redux/cars/carsSlice';
import { addReservation } from '../../redux/reservations/reservationsSlice';
import {
  selectCarById,
  selectIsCarsLoading,
} from '../../redux/selectors';

import { ReservationForm } from '../../components/ReservationForm/ReservationForm';
import { address } from '../../utils/address';
import { formatBigNumbers } from '../../utils/formatBigNumbers';

import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();

  const carData = useSelector(state =>
    carId ? selectCarById(state, carId) : undefined
  );

  const isLoading = useSelector(selectIsCarsLoading);

  const { city, country } = carData
    ? address(carData.address)
    : { city: undefined, country: undefined };

  useEffect(() => {
    if (carId && !carData) {
      dispatch(fetchCarById(carId));
    }
  }, [carId, carData, dispatch]);

  const handleSubmit = values => {
    if (!carId) return;

    dispatch(
      addReservation({
        ...values,
        carId,
        reservationDate: values.reservationDate
          ? values.reservationDate.getTime()
          : null,
      })
    );
  };

  if (!carId) return <div>Car ID not found</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!carData) return <div>Car not found</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          src={carData.img}
          alt={carData.model}
          className={styles.image}
        />
        <ReservationForm onSubmit={handleSubmit} />
      </div>

      <div className={styles.right}>
        <div className={styles.section}>
          <h2>{`${carData.brand} ${carData.model}, ${carData.year}`}</h2>
          <span>{`id: ${carData.id}`}</span>
        </div>

        <div className={styles.section}>
          <p>{`${city}, ${country}`}</p>
          <p>{`Mileage: ${formatBigNumbers(carData.mileage, ' ')}`}</p>
          <p>{`$${carData.rentalPrice}`}</p>
          <p>{carData.description}</p>
        </div>

        <div className={styles.section}>
          <p><strong>Rental Conditions:</strong></p>
          <ul>
            {carData.rentalConditions.map((item, index) => (
              <li key={`cond-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <p><strong>Car Specifications:</strong></p>
          <ul>
            <li>{`Year: ${carData.year}`}</li>
            <li>{`Type: ${carData.type}`}</li>
            <li>{`Fuel Consumption: ${carData.fuelConsumption}`}</li>
            <li>{`Engine Size: ${carData.engineSize}`}</li>
          </ul>
        </div>

        <div className={styles.section}>
          <p><strong>Accessories and functionalities:</strong></p>
          <ul>
            {carData.functionalities.map((item, index) => (
              <li key={`func-${index}`}>{item}</li>
            ))}
            {carData.accessories.map((item, index) => (
              <li key={`acc-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;