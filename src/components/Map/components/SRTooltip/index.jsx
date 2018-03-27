import React from 'react';
import Moment from 'react-moment';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function SRTooltip(props) {
  const { serviceRequest } = props;
  return (
    <div className={cx('container')}>
      <div className={cx('item')}><span className={cx('itemTitle')}>Complain:</span><span className={cx('itemValue')}>{serviceRequest.service.name}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Ticket #:</span><span className={cx('itemValue')}>{serviceRequest.code.toUpperCase()}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Address:</span><span className={cx('itemValue')}>{serviceRequest.address}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Area:</span><span className={cx('itemValue')}>{serviceRequest.jurisdiction.name}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Date:</span><span className={cx('itemValue')}><Moment format='ddd MMM D, YYYY' date={serviceRequest.createdAt} /></span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Status:</span><span className={cx('itemValue')}>{serviceRequest.status.name}</span></div>
    </div>
  );
}
