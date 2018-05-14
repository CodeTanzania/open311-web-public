import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Select from 'react-select';
import {
  toggleJurisdiction,
  toggleStatus,
  toggleService,
} from 'actions';
import MapDateFilter from '../MapDateFilter';
import Status from './status';
import Issue from './issue';
import styles from './styles.scss';

const cx = classnames.bind(styles);


class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.jurisdictionChangeHandler = this.jurisdictionChangeHandler.bind(this);
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
    this.issueChangeHandler = this.issueChangeHandler.bind(this);
    this.clearSelectedArea = this.clearSelectedArea.bind(this);
  }

  /**
   * This function is fired when jurisdiction/area select box
   * change
   *
   * @param {[Object]} selected ~ An array of selected areas as
   *  seen from select box [{label, value}]
   * @memberof MapFilter
   */
  jurisdictionChangeHandler(selected) {
    let changed = ''; // variable to hold changed jurisdiction
    if (!this.state.selectedArea) {
      changed = selected[0].value;
    } else {
      selected.forEach((item) => {
        if (!this.state.selectedArea.includes(item)) {
          // There is new added item
          changed = item.value;
        }
      });
      this.state.selectedArea.forEach((item) => {
        if (!selected.some(selectItem => selectItem.value === item.value)) {
          // There is an item removed
          changed = item.value;
        }
      });
    }
    this.setState({ selectedArea: selected });
    this.props.toggleJurisdiction(changed);
    if (this.props.onFilterChange) {
      this.props.onFilterChange('JurisdictionFilter');
    }
  }

  /**
   *
   *
   * @param {String} id ~ id of selected status
   * @memberof SRFilter
   */
  statusChangeHandler(id) {
    this.props.toggleStatus(id);
    if (this.props.onFilterChange) {
      this.props.onFilterChange('StatusFilter');
    }
  }

  issueChangeHandler(issueId) {
    this.props.toggleService(issueId);
    if (this.props.onFilterChange) {
      this.props.onFilterChange('IssueFilter');
    }
  }

  clearSelectedArea() {
    this.setState({
      selectedArea: undefined,
    });
  }


  render() {
    const {
      areas,
      statuses,
      issues,
      showDateFilter,
    } = this.props;
    const { selectedArea } = this.state;
    const areaOptions = areas.map(jurisdiction => ({
      label: jurisdiction.name,
      value: jurisdiction.id,
    }));
    return (
      <Fragment>
        {
          showDateFilter ? (
            <div className={cx('filterItem')}>
              <span className={cx('filterTitle')}>Filter By Date</span>
              <MapDateFilter />
            </div>
          ) : ''
        }
        <div className={cx('filterItem')}>
          <span className={cx('filterTitle')}>Filter By Area</span>
          <Select
            onChange={this.jurisdictionChangeHandler}
            options={areaOptions}
            value={selectedArea}
            multi={true}
            placeholder='Select Area'
          />
        </div>
        <div className={cx('filterItem')}>
          <span className={cx('filterTitle')}>Filter By Status</span>
          <div className={cx('statuses')}>
            {
              statuses.map(status => (
                <Status
                  key={status.name}
                  status={status}
                  onStatusClicked={this.statusChangeHandler} />
              ))
            }
          </div>
        </div>
        <div className={cx('filterItem')}>
          <span className={cx('filterTitle')}>Filter By Issue Type</span>
          <div className={cx('issues')}>
            {
              issues.map(issue => (<Issue
                key={issue.name}
                issue={issue}
                onIssueClicked={this.issueChangeHandler}
              />))
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.jurisdictionFilter.jurisdictions,
  statuses: state.statusFilter.statuses,
  issues: state.serviceFilter.services,
});

const mapDispatchToProps = {
  toggleJurisdiction,
  toggleStatus,
  toggleService,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(MapFilter);
