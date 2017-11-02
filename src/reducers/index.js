import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import services from './services';
import { MAP_LOADING, MAP_LOADING_COMPLETE, SHOWSRCARD, HIDESRCARD } from 'actions';

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


export default combineReducers({
    serviceRequests,
    services,
    mapLoading,
    showSRCard: serviceRequestCard
});