import React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);
/* eslint object-curly-newline: "off" */
export default function Button({ children, searchBtn, color, onBtnClicked }) {
  return (<button className={cx('btn', { search: searchBtn }, `${color}`)} onClick={onBtnClicked}>
    {children}</button>);
}
