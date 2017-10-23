import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default function SRMapLegend() {
    return (
        <div className={cx('legend')}>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'WTH')}></div>
                <div className={cx('symbolDesc')}>Water Theft</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'LW')}></div>
                <div className={cx('symbolDesc')}>Lack of Water</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'WL')}></div>
                <div className={cx('symbolDesc')}>Water Leakage</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'MP')}></div>
                <div className={cx('symbolDesc')}>Meter Problem</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'SL')}></div>
                <div className={cx('symbolDesc')}>Seawage Leakage</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'WQ')}></div>
                <div className={cx('symbolDesc')}>Water Quality</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'NW')}></div>
                <div className={cx('symbolDesc')}>New Connection</div>
            </div>
            <div className={cx('symbol')}>
                <div className={cx('symbolIcon', 'RO')}></div>
                <div className={cx('symbolDesc')}>Other</div>
            </div>
        </div>
    );
}
