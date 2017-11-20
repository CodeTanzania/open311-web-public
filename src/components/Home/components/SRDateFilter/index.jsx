import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
const START_DATE = 'startDate';
const END_DATE = 'endDate';
import { connect } from 'react-redux';
import { dateFilterChange, getServiceRequests, resetSearchTicketNum } from 'actions';

const defaultProps = {
    isOutsideRange: () => false,
    numberOfMonths: 1,
    showDefaultInputIcon: true
};
class DateFilter extends Component {
    constructor(props) {
        super(props);
        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }
        this.state = {
            focusedInput
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        this.props.dateFilterChange(startDate, endDate);
        this.props.resetSearchTicketNum();
        this.props.getServiceRequests();
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput } = this.state;
        const { dateFilter } = this.props;
        const { startDate, endDate } = dateFilter;
        return (
            <div>
                <DateRangePicker
                    {...defaultProps}
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    hideKeyboardShortcutsPanel
                    reopenPickerOnClearDates={false}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dateFilter: state.dateFilter
    };
};

export default connect(mapStateToProps, { dateFilterChange, getServiceRequests, resetSearchTicketNum })(DateFilter);