import React from 'react';
import classnames from 'classnames/bind';
import Header from '../Header';
import Main from './Main';
import Footer from '../Footer';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Home() {
  return (
    <div className={cx('wrapper')} >
      <Header />
      <div className={cx('main')}>
        <Main />
      </div>
      <Footer />
    </div>
  );
}
