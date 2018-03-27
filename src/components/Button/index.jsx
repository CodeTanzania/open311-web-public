import React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Button({ children, searchBtn, color }) {
  return <button className={cx('btn', { search: searchBtn }, `${color}`)}>{children}</button>;
}
