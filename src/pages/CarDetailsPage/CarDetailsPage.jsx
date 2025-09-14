import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { fetchCarById } from '../../redux/cars/carsSlice';
import { addReservation } from '../../redux/reservations/reservationsSlice';
import {
  selectCarById,
  selectSelectedCar,
  selectIsCarsLoading,
} from '../../redux/selectors';

import { ReservationForm } from '../../components/ReservationForm/ReservationForm';
import { address } from '../../utils/address';
import { formatBigNumbers } from '../../utils/formatBigNumbers';

import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { carId } = useParams();

  const carFromList = useSelector(state =>
    carId ? selectCarById(state, carId) : undefined
  );
  
  const selectedCar = useSelector(selectSelectedCar);
  
  const carData = carFromList || (selectedCar?.id === carId ? selectedCar : null);

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

    setIsDialogOpen(true);
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
        <div className={styles.topSection}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>
              {`${carData.brand} ${carData.model}, ${carData.year}`}
            </h2>
            <span className={styles.carId}>
              {`id: ${carData.id.substring(0, 6)}...`}
            </span>
          </div>
          
          <div className={styles.locationSection}>
            <svg className={styles.icon}>
              <use href="/public/icon.svg#icon-Location" />
            </svg>
            <p className={styles.locationText}>{`${city}, ${country}`}</p>
            <p className={styles.mileageText}>
              {`Mileage: ${formatBigNumbers(carData.mileage, ' ')}`}
            </p>
          </div>
          
          <p className={styles.price}>{`$${carData.rentalPrice}`}</p>
          <p className={styles.description}>{carData.description}</p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Rental Conditions:</p>
          <ul className={styles.list}>
            {carData.rentalConditions.map((item, index) => (
              <li key={`cond-${index}`} className={styles.listItem}>
                <svg className={styles.icon}>
                  <use href="/public/icon.svg#icon-Group" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Car Specifications:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <svg className={styles.icon}>
                <use href="/public/icon.svg#icon-calendar" />
              </svg>
              <p>{`Year: ${carData.year}`}</p>
            </li>
            <li className={styles.listItem}>
              <svg className={styles.icon}>
                <use href="/public/icon.svg#icon-car" />
              </svg>
              <p>{`Type: ${carData.type}`}</p>
            </li>
            <li className={styles.listItem}>
              <svg className={styles.icon}>
                <use href="/public/icon.svg#icon-fuel-pump" />
              </svg>
              <p>{`Fuel Consumption: ${carData.fuelConsumption}`}</p>
            </li>
            <li className={styles.listItem}>
              <svg className={styles.icon}>
                <use href="/public/icon.svg#icon-gear" />
              </svg>
              <p>{`Engine Size: ${carData.engineSize}`}</p>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Accessories and functionalities:</p>
          <ul className={styles.list}>
            {carData.functionalities.map((item, index) => (
              <li key={`func-${index}`} className={styles.listItem}>
                <svg className={styles.icon}>
                  <use href="/public/icon.svg#icon-Group" />
                </svg>
                {item}
              </li>
            ))}
            {carData.accessories.map((item, index) => (
              <li key={`acc-${index}`} className={styles.listItem}>
                <svg className={styles.icon}>
                  <use href="/public/icon.svg#icon-Group" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {isDialogOpen && (
        <div className={styles.dialog}>
          <div 
            className={styles.dialogBackdrop} 
            onClick={() => setIsDialogOpen(false)} 
          />
          <div className={styles.dialogWrapper}>
            <div className={styles.dialogPanel}>
              <h2 className={styles.dialogTitle}>
                Reservation places successfully!
              </h2>
              <p className={styles.dialogDescription}>
                Our manager will contact you soon.
              </p>
              <button className={styles.button} onClick={() => setIsDialogOpen(false)}>Okay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;