
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import {
  getServiceRequests,
  resetStatuses,
  resetJurisdictions,
  resetServices,
  resetSearchTicketNum,
} from 'actions';
import MapFilter from '../MapFilter';
import FilterBtn from '../FilterBtn';
import styles from './styles.scss';

const cx = classnames.bind(styles);
const delayTime = 2000;

/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

class DesktopMapFilter extends Component {
  constructor() {
    super();
    this.state = { hideFilterContent: true };
    this.mapFilter = React.createRef();
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.toggleFilterContent = this.toggleFilterContent.bind(this);
    this.onClearFilterClicked = this.onClearFilterClicked.bind(this);
  }

  toggleFilterContent() {
    this.setState({
      hideFilterContent: !this.state.hideFilterContent,
    });
  }

  onClearFilterClicked() {
    this.props.resetStatuses();
    this.props.resetServices();
    this.props.resetJurisdictions();
    this.props.getServiceRequests();
    this.mapFilter.current.getWrappedInstance().clearSelectedArea();

    setTimeout(function () {
      this.setState({
        hideFilterContent: !this.state.hideFilterContent,
      });
    }.bind(this), delayTime);
  }

  filterChangeHandler() {
    this.props.resetSearchTicketNum();
    this.props.getServiceRequests();
    setTimeout(function () {
      this.setState({
        hideFilterContent: !this.state.hideFilterContent,
      });
    }.bind(this), delayTime);
  }

  render() {
    const { hideFilterContent } = this.state;
    const { areas, statuses, issues } = this.props;
    const isFilterApplied = areas.some(item => item.selected) ||
      statuses.some(item => item.selected) || issues.some(item => item.selected);

    return (
      <div className={cx('filterContainer')}>
        <FilterBtn
          isFilterApplied={isFilterApplied}
          toggleFilterContent={this.toggleFilterContent}
        />
        <div className={cx('filterContent', { hide: hideFilterContent })} >
          {
            isFilterApplied ? (<div className={cx('filterClear')} onClick={this.onClearFilterClicked}>
              <img src='icons/x-mark.svg' style={{ width: '12px', marginRight: '3px' }} />
              <span>Clear all filters</span>
            </div>) : ''
          }
          <MapFilter onFilterChange={this.filterChangeHandler} ref={this.mapFilter} />
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  areas: state.jurisdictionFilter.jurisdictions,
  statuses: state.statusFilter.statuses,
  issues: state.serviceFilter.services,
});

export default connect(mapStateToProps, {
  getServiceRequests,
  resetJurisdictions,
  resetServices,
  resetStatuses,
  resetSearchTicketNum,
})(DesktopMapFilter);
