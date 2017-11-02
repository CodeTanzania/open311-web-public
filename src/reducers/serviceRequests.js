import { RECEIVE_SERVICEREQUESTS } from 'actions';

const serviceRequest = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SERVICEREQUESTS:
            return action.serviceRequests;
        default:
            return state;
    }
};

export default serviceRequest;