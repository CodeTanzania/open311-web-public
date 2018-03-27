import React from 'react';
import Moment from 'react-moment';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function SRTooltip(props) {
  const { serviceRequest } = props;
  return (
    <div className={cx('container')}>
      <div className={cx('item')}><span className={cx('itemTitle', 'emphasize')}>ISSUE TYPE</span><span className={cx('itemValue', 'emphasize')}>{serviceRequest.service.name}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle', 'emphasize')}>STATUS</span><span className={cx('itemValue', 'emphasize')}>{serviceRequest.status.name}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Submitted:</span><span className={cx('itemValue')}><Moment format='D/MM/YYYY' date={serviceRequest.createdAt} /></span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Address:</span><span className={cx('itemValue')}>{serviceRequest.address}</span></div>
      <div className={cx('item')}><span className={cx('itemTitle')}>Area:</span><span className={cx('itemValue')}>{serviceRequest.jurisdiction.name}</span></div>
    </div>
  );
}
