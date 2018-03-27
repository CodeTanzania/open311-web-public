import React from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'Button';
import Statistic from './Statistics';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Main() {
  return (
    <div className={cx('container')} >
      <div id='about' className={cx('about')}>
        <div className={cx('illustrator')} ></div>
        <div className={cx('info')} >
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >What is MAJIFIX</div>
            <div >
              MOPA is a Mozambican platform for participatory
              monitoring of the delivery of public urban services.
              </div>
          </div>
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >How to use MAJIFIX</div>
            <div >
              Any citizen can report public service issues
              through their mobile phone by dialing * 311 #,
               using mobile application, or from www.mopa.co.mz.
               </div>
          </div>
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >How does MAJIFIX work</div>
            <div>Any citizen can report public service issues
              through their mobile phone by dialing * 311 #,
              using mobile application, or from www.mopa.co.mz.
              </div>
          </div>
          <div className={cx('infoItem')}>
            <Link to="/issues"> <Button color='green'>VIEW REPORTED ISSUES</Button></Link>
          </div>
        </div>
      </div>
      <Statistic />
    </div>
  );
}
