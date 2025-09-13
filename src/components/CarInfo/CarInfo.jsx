import PropTypes from 'prop-types';

import { formatedValue } from '../../utils/utils';
import { renderItem } from '../../utils/utils';

const CardInfo = ({ locationData, carData }) => {
  return (
    <>
      <ul className="card-info-block flex-wrap dark:text-white/50">
        {renderItem(locationData)}
      </ul>
      <ul className="card-info-block mb-[28px] dark:text-white/50">
        {Object.entries(carData).map(([key, value], idx, arr) => (
          <li key={idx} className="text-description dark:text-white/50">
            {formatedValue(key, value)}
            {idx < arr.length - 1 }
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