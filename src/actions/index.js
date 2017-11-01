import API from 'API';


export const FETCH_SERVICEREQUESTS = 'service_request_fetch';
export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';
export const RECEIVE_SERVICES = 'services_receive';
export const TOGGLE_SERVICE = 'toggle_service';

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

const receiveServices = (services) => ({
    type: RECEIVE_SERVICES,
    services
});


export const getServiceRequests = (services) => dispatch => {
    dispatch(fetchServiceRequests([], true));
    API
        .getSR({ services })
        .then(data => {
            const serviceRequests = data.servicerequests;
            dispatch(receiveServiceRequests(serviceRequests, false));
        })
        .catch(() => {
            dispatch(receiveServiceRequests([], false));
        });
};

export const getServices = () => dispatch => {
    API
        .getServices()
        .then(data => {
            const services = data.services.map(service => {
                return {
                    code: service.code,
                    name: service.name,
                    id: service._id,
                    selected: true
                };
            });
            dispatch(receiveServices(services));
        })
        .catch(() => {
            dispatch(receiveServices([]));
        });
};

export const toggleService = (id) => ({
    type: TOGGLE_SERVICE,
    id
});