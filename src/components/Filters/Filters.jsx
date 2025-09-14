import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { fetchCarBrands } from '../../redux/cars/carsSlice';
import { setFilter, resetFilters } from '../../redux/filters/filtersSlice';

import {
  selectFilters,
  selectShouldLoadBrands,
} from '../../redux/selectors';

import {
  selectCarBrands,
  selectCarsForFilters,
  selectIsCarsLoading,
  selectCarsError,
} from '../../redux/selectors';

import { priceOpt } from '../../utils/priceOpt';
import css from './Filter.module.css';

const Filter = ({ cars = [] }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const filter = useSelector(selectFilters);
  const brands = useSelector(selectCarBrands);
  const brandsLoading = useSelector(selectIsCarsLoading);
  const brandsError = useSelector(selectCarsError);
  const shouldLoadBrands = useSelector(selectShouldLoadBrands);
  const carsForFilters = useSelector(selectCarsForFilters);

  const isFormDisabled = pathname === '/favorites' && cars.length === 0;
  const carsForPrice = cars.length > 0 ? cars : carsForFilters;
  const price = priceOpt(carsForPrice);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: filter,
    shouldDisable: isFormDisabled,
  });

  useEffect(() => {
    if (shouldLoadBrands) {
      dispatch(fetchCarBrands());
    }
  }, [dispatch, shouldLoadBrands]);

  useEffect(() => {
    reset(filter);
  }, [filter, reset]);

  const onSubmit = data => {
    const apiFilters = {
      brand: data.brand || '',
      price: data.price || '',
      from: data.from || '',
      to: data.to || '',
    };
    dispatch(setFilter(apiFilters));
  };

  const resetFilterInRedux = () => {
    dispatch(resetFilters());
    reset({
      brand: '',
      price: '',
      from: '',
      to: '',
    });
  };

  const isBrandsSelectDisabled = brandsLoading || isFormDisabled;
  const brandsSelectPlaceholder = brandsLoading
    ? 'Loading brands...'
    : brands.length === 0
    ? 'No brands available'
    : 'Enter the text';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${css.form} ${isFormDisabled ? css.disabled : ''}`}
      disabled={isFormDisabled}
    >
      <div className={css.formRow}>
        <div className={css.formGroup}>
          <div className={css.selectWrapper}>
            <label htmlFor="brand" className={css.label}>
              Car brand
            </label>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    className={css.select}
                    disabled={isBrandsSelectDisabled}
                  >
                    <option value="" className={css.placeholder}>
                      {brandsSelectPlaceholder}
                    </option>
                    {brands.map((make, idx) => (
                      <option key={idx} value={make} className={css.option}>
                        {make}
                      </option>
                    ))}
                  </select>
                  {brandsError && !brandsLoading && (
                    <p className={`${css.error} ${css.visible}`}>
                      Failed to load brands: {brandsError}
                    </p>
                  )}
                  {errors.brand && (
                    <p
                      className={`${css.error} ${
                        isFormDisabled ? css.invisible : css.visible
                      }`}
                    >
                      {errors.brand.type === 'required'
                        ? 'Brand is required'
                        : errors.brand.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className={css.selectWrapper}>
            <label htmlFor="price" className={css.label}>
              Price / 1 hour
            </label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <select {...field} className={css.select}>
                    <option value="" className={css.placeholder}>
                      Choose a price
                    </option>
                    {price.map((p, index) => (
                      <option key={index} value={p} className={css.option}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.price && (
                    <p
                      className={`${css.error} ${
                        isFormDisabled ? css.invisible : css.visible
                      }`}
                    >
                      {errors.price.type === 'required'
                        ? 'Price is required'
                        : errors.price.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className={css.mileageGroup}>
            <label htmlFor="minMileage" className={css.label}>
              Car mileage / km (from)
            </label>
            <div className={css.mileageWrapper}>
              <label className={css.inputWrapper}>
                <input
                  type="number"
                  className={css.input}
                  placeholder="From"
                  {...register('from', {
                    min: {
                      value: 0,
                      message: 'Must be 0 or greater',
                    },
                  })}
                />
              </label>
              <label className={css.inputWrapper}>
                <input
                  type="number"
                  className={css.input}
                  placeholder="To"
                  {...register('to', {
                    min: {
                      value: 0,
                      message: 'Must be 0 or greater',
                    },
                    validate: (value, { from }) => {
                      if (
                        value &&
                        from &&
                        parseInt(value) <= parseInt(from)
                      ) {
                        return 'To must be greater than From';
                      }
                      return true;
                    },
                  })}
                />
              </label>
              <p
                className={`${css.errorGroup} ${
                  isFormDisabled ? css.invisible : css.visible
                }`}
              >
                {errors?.from && <span>{errors.from.message}</span>}
                {errors?.to && <span>{errors.to.message}</span>}
              </p>
            </div>
          </div>
        </div>

        <div className={css.buttons}>
          <button
            type="submit"
            className={css.button}
            disabled={isFormDisabled}
          >
            Search
          </button>
          <button
            type="button"
            className={css.button}
            onClick={resetFilterInRedux}
            disabled={isFormDisabled}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

Filter.propTypes = {
  cars: PropTypes.array,
};

export default Filter;