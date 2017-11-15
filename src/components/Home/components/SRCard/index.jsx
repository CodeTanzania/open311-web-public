import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import { connect } from 'react-redux';
import { unselectMapPoint } from 'actions';
import Moment from 'react-moment';
import './streamline.css';

const getSRPriorityClass = (priority) => {
    switch (priority) {
        case 'Low':
            return 'priorityLow';
        case 'Normal':
            return 'priorityNormal';
        case 'Critical':
            return 'priorityCritical';
        default:
            return '';
    }
};
const getSRStatusClass = (status) => {
    switch (status) {
        case 'Open':
            return 'statusOpen';
        case 'In Progress':
            return 'statusInProgress';
        case 'Closed':
            return 'statusClosed';
        case 'Escallated':
            return 'statusEscallated';
        default:
            return '';
    }
};

const renderCard = (serviceRequest, onBackBtnClicked) => {
    if (serviceRequest) {
        return (
            <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
                <div className={cx('header', 'navBtn')} onClick={onBackBtnClicked}>
                    <span>&#x3c;</span><span>&#x3c;</span><span> Back to Summary Statistics</span>
                </div>
                <div>
                    <div className={cx('serviceName')}>
                        <span>{serviceRequest.service.name}</span>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('itemTitle', 'horizontal')}>Ticket No:</div>
                        <div className={cx('itemValue', 'horizontal')}>{serviceRequest.code}</div>
                    </div>
                    <div className={cx('item', 'grid')}>
                        <div className={cx('itemLeft')}>
                            <div className={cx('itemTitle', 'vertical')}>Address:</div>
                            <div className={cx('itemValue')}>{serviceRequest.address}</div>
                        </div>
                        <div className={cx('itemRight')}>
                            <div className={cx('itemTitle', 'vertical')}>Area:</div>
                            <div className={cx('itemValue')}>{serviceRequest.jurisdiction.name}</div>
                        </div>
                    </div>
                    <div className={cx('item', 'grid')}>
                        <div className={cx('itemLeft')}>
                            <div className={cx('itemBtn', getSRStatusClass(serviceRequest.status.name))}>
                                Status - {serviceRequest.status.name}
                            </div>
                        </div>
                        <div className={cx('itemRight')}>
                            <div className={cx('itemBtn', getSRPriorityClass(serviceRequest.priority.name))}>
                                Priority - {serviceRequest.priority.name}
                            </div>
                        </div>
                    </div>
                    <div className={cx('item', 'last')}>
                        <div className="streamline">
                            {
                                serviceRequest.changelogs ?
                                    serviceRequest.changelogs.map(changelog => (
                                        <div className="sl-item" key={changelog.id} style={{ borderColor: changelog.status.color }}>
                                            <div className="sl-content">
                                                <div className="sl-date">
                                                    <span className="sl-dateTitle"> {changelog.changer ? changelog.changer.name : ''} </span>
                                                    <Moment format='ddd MMM D, YYYY' date={changelog.createdAt} />
                                                </div>
                                                {
                                                    changelog.status ? (<p>Change status to
                                            <span className='labelBadge' style={{ backgroundColor: changelog.status.color, color: changelog.status.color }}>
                                                            <span className='labelText'>{changelog.status.name}</span>
                                                        </span>
                                                    </p>) : ''
                                                }
                                                {
                                                    changelog.priority ? (<p>Change priority to
                                            <span className='labelBadge' style={{ backgroundColor: changelog.priority.color, color: changelog.priority.color }}>
                                                            <span className='labelText'>{changelog.priority.name}</span>
                                                        </span>
                                                    </p>) : ''
                                                }
                                                {
                                                    changelog.assignee ? (
                                                        <p>
                                                            Assignee to {changelog.assignee.name}
                                                        </p>
                                                    ) : ''
                                                }

                                            </div>
                                        </div>
                                    )) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
                <div className={cx('header')} >
                    <span> Summary Statistics</span>
                </div>
            </div>
        );
    }
};

class SRCard extends Component {
    constructor(props) {
        super(props);
        this.state = { showCard: true };
        //bind functions
        this.onBackBtnClicked = this.onBackBtnClicked.bind(this);
    }

    onBackBtnClicked() {
        this.props.unselectMapPoint();
    }

    render() {
        const { selectedSR } = this.props;
        return renderCard(selectedSR, this.onBackBtnClicked);
    }
}

const mapStateToProps = (state) => {
    return {
        selectedSR: state.selectedMapPoint
    };
};

export default connect(mapStateToProps, { unselectMapPoint })(SRCard);