import React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);

const FilterBtn = ({ isFilterApplied, toggleFilterContent }) => (
  <div className={cx('filterBtn', { selected: isFilterApplied })}
    title='More Filters' onClick={toggleFilterContent}>
    <span className={cx('filterBtnIcon')}>
      <img src={isFilterApplied ? 'icons/filter-white.svg' : 'icons/filter.svg'} alt=""
        className={cx('filterIcon')} />
    </span>
    <span className={cx('filterBtnLabel', { selected: isFilterApplied })}>
      <span style={{ display: 'block' }}>Filters</span>{isFilterApplied ? 'applied' : ''}
    </span>
  </div>
);

export default FilterBtn;
