import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import services from './services';
import mapFilter from './mapFilter';
import {
    MAP_LOADING,
    MAP_LOADING_COMPLETE,
    SHOWSRCARD,
    HIDESRCARD,
    RECEIVE_STATUSES,
    TOGGLE_STATUS,
    RECEIVE_JURISDICTIONS,
    TOGGLE_JURISDICTION
} from 'actions';

const mapLoading = (state = false, action) => {
    switch (action.type) {
        case MAP_LOADING:
            return action.mapLoading;
        case MAP_LOADING_COMPLETE:
            return action.mapLoading;
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

const jurisdictions = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_JURISDICTIONS:
            return action.jurisdictions;
        case TOGGLE_JURISDICTION:
            return state.map(jurisdiction => {
                if (jurisdiction.id === action.id) {
                    jurisdiction.selected = !jurisdiction.selected;
                }
                return jurisdiction;
            });
        default:
            return state;
    }
};

const statuses = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_STATUSES:
            return action.statuses;
        case TOGGLE_STATUS:
            return state.map(status => {
                if (status.id === action.id) {
                    status.selected = !status.selected;
                }
                return status;
            });
        default:
            return state;
    }
};


export default combineReducers({
    mapFilter,
    serviceRequests,
    services,
    jurisdictions,
    statuses,
    mapLoading,
    showSRCard: serviceRequestCard
});