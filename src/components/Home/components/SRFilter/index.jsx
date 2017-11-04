import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import Select from 'react-select';
import Status from './status';
import { connect } from 'react-redux';
import { toggleJurisdiction, toggleStatus, getServiceRequests } from 'actions';


class SRFilter extends Component {
    constructor() {
        super();
        this.state = { hideFilterContent: true, statuses: [] };
        this.toggleFilterContent = this.toggleFilterContent.bind(this);
        this.areaChangeHandler = this.areaChangeHandler.bind(this);
        this.statusChangeHandler = this.statusChangeHandler.bind(this);
    }

    toggleFilterContent() {
        this.setState({
            hideFilterContent: !this.state.hideFilterContent
        });
    }
    /**
     * 
     * 
     * @param {[Object]} selected ~ An array of selected areas[{label, value}] 
     * @memberof SRFilter
     */
    areaChangeHandler(selected) {
        let added = '';
        if (!this.state.selectedArea) {
            added = selected[0].value;
        }
        selected.forEach(item => {
            if (this.state.selectedArea && !this.state.selectedArea.includes(item)) {
                added = item.value;
            }
        });
        this.setState({ selectedArea: selected });
        this.props.toggleJurisdiction(added);
        this.props.getServiceRequests();
    }

    /**
     * 
     * 
     * @param {String} id ~ id of selected status 
     * @memberof SRFilter
     */
    statusChangeHandler(id) {
        this.props.toggleStatus(id);
        this.props.getServiceRequests();
    }

    render() {
        const { hideFilterContent, selectedArea } = this.state;
        const { areas, statuses } = this.props;
        const areaOptions = areas.map(jurisdiction => {
            return {
                label: jurisdiction.name,
                value: jurisdiction.id
            };
        });


        return (
            <div className={cx('filterContainer')}>
                <div className={cx('filterBtn')} title='More Filters' onClick={this.toggleFilterContent}><i className={cx('fa', 'fa-filter', 'fa-2x')} aria-hidden="true"></i></div>
                <div className={cx('filterContent', { 'hide': hideFilterContent })} >
                    <Select
                        onChange={this.areaChangeHandler}
                        options={areaOptions}
                        value={selectedArea}
                        multi={true}
                        placeholder='Select Area'
                    />
                    <div className={cx('statusFilter')}>
                        {
                            statuses.map(status => (
                                <Status key={status.name} status={status} onStatusClicked={this.statusChangeHandler} />
                            ))
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        areas: state.jurisdictions,
        statuses: state.statuses
    };
};

export default connect(mapStateToProps, { toggleJurisdiction, toggleStatus, getServiceRequests })(SRFilter);