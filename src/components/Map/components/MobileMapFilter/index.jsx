import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { getServiceRequests, resetSearchTicketNum } from 'actions';
import MapFilter from '../MapFilter';
import styles from './styles.scss';

const cx = classnames.bind(styles);
/* */
class MobileMapFilter extends Component {
  constructor() {
    super();
    this.filterMapData = this.filterMapData.bind(this);
  }

  filterMapData() {
    this.props.resetSearchTicketNum();
    this.props.getServiceRequests();
    this.props.onClickCancel();
  }
  render() {
    const { showFilter, onClickCancel } = this.props;
    if (showFilter) {
      return (
        <div className={cx('container')}>
          <MapFilter showDateFilter />
          <div className={cx('actionBtn')}>
            <a className={cx('button', 'tertiary')} onClick={onClickCancel}>Cancel</a>
            <a className={cx('button', 'primary')} onClick={this.filterMapData}>Filter</a>
          </div>
        </div>
      );
    }
    return '';
  }
}

export default connect(null, {
  getServiceRequests,
  resetSearchTicketNum,
})(MobileMapFilter);

