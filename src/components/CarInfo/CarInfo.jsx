import PropTypes from 'prop-types';
import css from './CarInfo.module.css';

import { formatedValue } from '../../utils/utils';
import { renderItem } from '../../utils/utils';

const CardInfo = ({ locationData, carData }) => {
  return (
    <>
      <ul className={`${css.cardInfoBlock}`}>
        {renderItem(locationData)}
      </ul>
      <ul className={`${css.cardInfoBlock} ${css.cardInfoBlockMargin}`}>
        {Object.entries(carData).map(([key, value], idx, arr) => (
          <li key={idx} className={css.textDescription}>
            {formatedValue(key, value)}
            {idx < arr.length - 1}
          </li>
        ))}
      </ul>
    </>
  );
};

CardInfo.propTypes = {
  carData: PropTypes.object.isRequired,
  locationData: PropTypes.array.isRequired
};

export default CardInfo;