import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('mobileAppInfo')}>
        <div className={cx('mobileIcon')}></div>
        <div className={cx('mobileText')}>Download the App on <strong>Android</strong> </div>
      </div>
      <div className={cx('ussdInfo')}>
        <div className={cx('ussdText')}>
          Send <strong>Dawasco</strong>  to <strong>"15900"</strong> for free
                </div>
        <div className={cx('ussdChannel')}>Vodacom &nbsp;&nbsp;Airtel &nbsp;&nbsp;Tigo &nbsp;&nbsp;Halotel</div>
      </div>
    </div>
  );
}
