import API from 'API';


export const FETCH_SERVICEREQUESTS = 'service_request_fetch';
export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';

const fetchServiceRequests = (serviceRequests, isFetching) => ({
    type: FETCH_SERVICEREQUESTS,
    serviceRequests,
    isFetching
});
const receiveServiceRequests = (serviceRequests, isFetching) => ({
    type: RECEIVE_SERVICEREQUESTS,
    serviceRequests,
    isFetching
});


export const getAllServiceRequests = () => dispatch => {
    dispatch(fetchServiceRequests([], true));
    API
        .getAllSR()
        .then(data => {
            const serviceRequests = data.servicerequests;
            dispatch(receiveServiceRequests(serviceRequests, false));
        })
        .catch(() => {
            dispatch(receiveServiceRequests([], false));
        });
};