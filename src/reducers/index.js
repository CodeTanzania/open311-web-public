import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import serviceFilter from './serviceFilter';
import dateFilter from './dateFilter';
import statusFilter from './statusFilter';
import jurisdictionFilter from './jurisdictionFilter';
import mapData from './mapData';

import { SELECT_MAP_POINT, UNSELECT_MAP_POINT, SEARCH_TICKET_NUM, SEARCH_TICKET_NUM_RESET } from 'actions';


const selectedMapPoint = (state = null, action) => {
    switch (action.type) {
        case SELECT_MAP_POINT:
            return action.selected;
        case UNSELECT_MAP_POINT:
            return null;
        default:
            return state;
    }
};

const ticketNum = (state = '', action) => {
    switch (action.type) {
        case SEARCH_TICKET_NUM:
            return action.ticketNum;
        case SEARCH_TICKET_NUM_RESET:
            return '';
        default:
            return state;
    }
};

export default combineReducers({
    serviceRequests,
    dateFilter,
    serviceFilter,
    jurisdictionFilter,
    statusFilter,
    mapData,
    selectedMapPoint,
    ticketNum
});