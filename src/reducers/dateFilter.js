import { MAP_DATE_FILTER_CHANGE } from 'actions';

import moment from 'moment';
const startDate = moment().subtract(3, 'months');
const endDate = moment();

const mapFilter = (state = { startDate, endDate }, action) => {
    switch (action.type) {
        case MAP_DATE_FILTER_CHANGE:
            return { ...state, startDate: action.startDate, endDate: action.endDate };
        default:
            return state;
    }
};

export default mapFilter;