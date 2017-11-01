import { RECEIVE_SERVICEREQUESTS, FETCH_SERVICEREQUESTS } from 'actions';

const initialState = { items: [], isFetching: false };

const serviceRequest = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SERVICEREQUESTS:
            return {
                ...state,
                items: action.serviceRequests,
                isFetching: action.isFetching
            };
        case FETCH_SERVICEREQUESTS:
            return {
                ...state,
                items: action.serviceRequests,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
};

export default serviceRequest;