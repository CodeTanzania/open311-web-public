import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class SRCard extends Component {
    constructor(props) {
        super(props);
        this.state = { showCard: true };
        //bind functions
        this.onCloseBtnClicked = this.onCloseBtnClicked.bind(this);
    }

    onCloseBtnClicked(event) {
        event.preventDefault();
        this.setState({
            showCard: false
        });
    }

    componentWillReceiveProps() {
        this.setState({
            showCard: true
        });
    }

    render() {
        const { showCard } = this.state;
        const { serviceRequest } = this.props;
        return Object.keys(serviceRequest).length && showCard ?
            <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
                <div className={cx('closeBtn')} title='Close' onClick={this.onCloseBtnClicked}>   <span> &#10005;</span>
                </div>
                <div className={cx('serviceName')}>
                    <span>{serviceRequest.service.name}</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('title', 'horizontal')}>Ticket No:</div>
                    <div className={cx('horizontalValue')}>{serviceRequest.code}</div>
                </div>
                <div className={cx('item')}>
                    <div className={cx('itemLeft')}>
                        <div className={cx('title', 'vertical')}>Address:</div>
                        <div className={cx('verticalValue')}>{serviceRequest.address}</div>
                    </div>
                    <div className={cx('itemRight')}>
                        <div className={cx('title', 'vertical')}>Area:</div>
                        <div className={cx('verticalValue')}>{serviceRequest.jurisdiction.name}</div>
                    </div>
                </div>
                {/* <div className={cx('items')}>
                    <div className={cx('item', 'horizontal')}>
                        <div className={cx('itemTitle', 'horizontal')}>Ticket#:</div>
                        <div className={cx('itemValue', 'horizontal', 'big')}>{serviceRequest.code}</div>
                    </div>
                    <div className={cx('item', 'horizontal')}>
                        <div className={cx('itemTitle', 'horizontal')}>Address:</div>
                        <div className={cx('itemValue', 'horizontal')}>{serviceRequest.address}</div>
                    </div>
                </div>
                <div className={cx('items')}>
                    <div className={cx('item')}>
                        <div className={cx('itemTitle')}>Description:</div>
                        <div className={cx('itemValue', 'vertical')}>{serviceRequest.description}</div>
                    </div>
                </div> */}
            </div> : null;
    }
}

SRCard.propTypes = {
    issue: PropTypes.object
};

export default SRCard;