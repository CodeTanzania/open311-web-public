import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

export default function Main() {
    return (
        <div className={cx('container')} >
            <div className={cx('illustrator')} ></div>
            <div className={cx('desc')} >
                <div className={cx('descItem')} >
                    <div className={cx('title')} >What is MAJIFIX</div>
                    <div >MOPA is a Mozambican platform for participatory monitoring of the delivery of public urban services.</div>
                </div>
                <div className={cx('descItem')} >
                    <div className={cx('title')} >How to use MAJIFIX</div>
                    <div >Any citizen can report public service issues through their mobile phone by dialing * 311 #, using mobile application, or from www.mopa.co.mz.</div>
                </div>
                <div className={cx('descItem')} >
                    <div className={cx('title')} >How does MAJIFIX work</div>
                    <div >Any citizen can report public service issues through their mobile phone by dialing * 311 #, using mobile application, or from www.mopa.co.mz.</div>
                </div>
                <div className={cx('descItem')}>
                    <Link to="/issues">VIEW REPORTED ISSUES</Link>
                </div>
            </div>
        </div>
    );
}