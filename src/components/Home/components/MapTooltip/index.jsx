import React from 'react';
import Moment from 'react-moment';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default function MapTooltip(props) {
    return (
        <div className={cx('container')}>
            <div className={cx('item')}><span className={cx('itemTitle')}>Complain:</span><span className={cx('itemValue')}>{props.service}</span></div>
            <div className={cx('item')}><span className={cx('itemTitle')}>Ticket #:</span><span className={cx('itemValue')}>{props.ticket}</span></div>
            <div className={cx('item')}><span className={cx('itemTitle')}>Address:</span><span className={cx('itemValue')}>{props.address}</span></div>
            <div className={cx('item')}><span className={cx('itemTitle')}>Area:</span><span className={cx('itemValue')}>{props.area}</span></div>
            <div className={cx('item')}><span className={cx('itemTitle')}>Date:</span><span className={cx('itemValue')}><Moment format='ddd MMM D, YYYY' date={props.date} /></span></div>
            <div className={cx('item')}><span className={cx('itemTitle')}>Status:</span><span className={cx('itemValue')}>{props.status}</span></div>
        </div>
    );
}
