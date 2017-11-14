import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import serviceFilter from './serviceFilter';
import dateFilter from './dateFilter';
import statusFilter from './statusFilter';
import jurisdictionFilter from './jurisdictionFilter';
import searchByTicketNum from './searchByTicketNum';

import {
    MAP_LOADING,
    MAP_LOADING_COMPLETE,
    MAP_LOADING_COMPLETE_WITH_STATUS,
    SHOWSRCARD,
    HIDESRCARD
} from 'actions';

const map = (state = { loading: false }, action) => {
    switch (action.type) {
        case MAP_LOADING:
            return { ...state, loading: action.loading };
        case MAP_LOADING_COMPLETE:
            return { ...state, loading: action.loading };
        case MAP_LOADING_COMPLETE_WITH_STATUS:
            return { ...state, loading: action.loading, status: action.status };
        default:
            return state;
    }
};

const serviceRequestCard = (state = false, action) => {
    switch (action.type) {
        case SHOWSRCARD:
            return action.showSRCard;
        case HIDESRCARD:
            return action.showSRCard;
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
    map,
    ticketNum: searchByTicketNum,
    showSRCard: serviceRequestCard
});