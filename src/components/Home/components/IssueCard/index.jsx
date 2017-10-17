import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

class IssueCard extends Component {
    constructor(props) {
        super(props);
        this.state = { showCard: true };
        //bind functions
        this.onHideCardClicked = this.onHideCardClicked.bind(this);
    }

    onHideCardClicked(event) {
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
        const { issue } = this.props;
        return Object.keys(issue).length && showCard ?
            <div className={cx('container')}>
                <div className={cx('issueCard')}>
                    <div className={cx('header')}>
                        <div className={cx('hideBtn')} title='Hide' onClick={this.onHideCardClicked}>&#10005;</div>
                        <div className={cx('name')}>{issue.service.name}</div>
                    </div>
                    <div className={cx('items')}>
                        <div className={cx('item', 'horizontal')}>
                            <div className={cx('itemTitle', 'horizontal')}>Ticket#:</div>
                            <div className={cx('itemValue', 'horizontal', 'big')}>{issue.code}</div>
                        </div>
                        <div className={cx('item', 'horizontal')}>
                            <div className={cx('itemTitle', 'horizontal')}>Address:</div>
                            <div className={cx('itemValue', 'horizontal')}>{issue.address}</div>
                        </div>
                    </div>
                    <div className={cx('items')}>
                        <div className={cx('item')}>
                            <div className={cx('itemTitle')}>Description:</div>
                            <div className={cx('itemValue', 'vertical')}>{issue.description}</div>
                        </div>
                    </div>
                </div>
            </div> : null;
    }
}

IssueCard.propTypes = {
    issue: PropTypes.object
};

export default IssueCard;