import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import { connect } from 'react-redux';
import { hideSRCard } from 'actions';

class SRCard extends Component {
    constructor(props) {
        super(props);
        this.state = { showCard: true };
        //bind functions
        this.onCloseBtnClicked = this.onCloseBtnClicked.bind(this);
    }

    onCloseBtnClicked(event) {
        event.preventDefault();
        this.props.hideSRCard();
    }

    render() {
        const { serviceRequest, showSRCard } = this.props;
        return serviceRequest && Object.keys(serviceRequest).length && showSRCard ?
            <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
                <div className={cx('closeBtn')} title='Close' onClick={this.onCloseBtnClicked}>   <span> &#10005;</span>
                </div>
                <div className={cx('serviceName')}>
                    <span>{serviceRequest.service.name}</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('itemTitle', 'horizontal')}>Ticket No:</div>
                    <div className={cx('itemValue', 'horizontal')}>{serviceRequest.code}</div>
                </div>
                <div className={cx('item')}>
                    <div className={cx('itemLeft')}>
                        <div className={cx('itemTitle', 'vertical')}>Address:</div>
                        <div className={cx('itemValue')}>{serviceRequest.address}</div>
                    </div>
                    <div className={cx('itemRight')}>
                        <div className={cx('itemTitle', 'vertical')}>Area:</div>
                        <div className={cx('itemValue')}>{serviceRequest.jurisdiction.name}</div>
                    </div>
                </div>
                <div className={cx('item')}>
                    <div className={cx('timelineContainer')}>
                        <ul className={cx('timeline')}>
                            <li className={cx('timelineItem')}>
                                <div className={cx('timelineTitle')}>Pending</div>
                                <div className={cx('timelineDetail')}>Fri Jul 21, 2017</div>
                            </li>
                            <li className={cx('timelineItem')} >
                                <div className={cx('timelineTitle')}>Resolved</div>
                                <div className={cx('timelineDetail')}>Fri Jul 21, 2017</div>
                            </li>
                            <li className={cx('timelineItem')} >
                                <div className={cx('timelineTitle')}>Re-Opened</div>
                                <div className={cx('timelineDetail')}>Fri Jul 21, 2017</div>
                            </li>
                            <li className={cx('timelineItem')} >
                                <div className={cx('timelineTitle')}>Re-Opened</div>
                                <div className={cx('timelineDetail')}>Fri Jul 21, 2017</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> : null;
    }
}

const mapStateToProps = (state) => {
    return {
        showSRCard: state.showSRCard
    };
};

export default connect(mapStateToProps, { hideSRCard })(SRCard);