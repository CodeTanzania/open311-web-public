import { RECEIVE_SERVICEREQUESTS } from 'actions';

export default function (state = { serviceRequest: { items: [] } }, action) {
    switch (action.type) {
        case RECEIVE_SERVICEREQUESTS:
            return {
                ...state,
                serviceRequest: {
                    items: action.serviceRequests,
                    isFetching: action.isFetching
                }
            };
        default:
            return state;
    }
}