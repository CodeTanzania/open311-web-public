import API from 'API';


export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';

const receiveServiceRequests = (serviceRequests, isFetching) => ({
    type: RECEIVE_SERVICEREQUESTS,
    serviceRequests,
    isFetching
});


export const getAllServiceRequests = () => dispatch => {
    API
        .getAllSR()
        .then(data => {
            const serviceRequests = data.servicerequests;
            dispatch(receiveServiceRequests(serviceRequests, true));
        })
        .catch(() => {
            dispatch(receiveServiceRequests([], true));
        });
};