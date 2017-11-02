import API from 'API';

export const MAP_LOADING = 'map_loading';
export const MAP_LOADING_COMPLETE = 'map_loading_complete';
export const SHOWSRCARD = 'show_service_request_card';
export const HIDESRCARD = 'hide_service_request_card';
export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';
export const RECEIVE_SERVICES = 'services_receive';
export const TOGGLE_SERVICE = 'toggle_service';


const receiveServiceRequests = (serviceRequests) => ({
    type: RECEIVE_SERVICEREQUESTS,
    serviceRequests
});

const receiveServices = (services) => ({
    type: RECEIVE_SERVICES,
    services
});

const mapLoading = () => ({
    type: MAP_LOADING,
    mapLoading: true
});

const mapLoadingComplete = () => ({
    type: MAP_LOADING,
    mapLoading: false
});


export const getServiceRequests = () => (dispatch, getState) => {
    dispatch(mapLoading());
    const { services } = getState();
    const selectedServices = services.filter(service => service.selected);

    API
        .getSR({ services: selectedServices.map(service => service.id) })
        .then(data => {
            const serviceRequests = data.servicerequests;
            dispatch(receiveServiceRequests(serviceRequests));
            dispatch(mapLoadingComplete());
        })
        .catch(() => {
            dispatch(receiveServiceRequests([]));
            dispatch(mapLoadingComplete());
        });
};

export const getServices = () => dispatch => {
    dispatch(mapLoading());
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
            return services;
        })
        .then((services) => {
            // dispatch(fetchServiceRequests([], true));
            return API
                .getSR({ services: services.map(service => service.id) })
                .then(data => {
                    const serviceRequests = data.servicerequests;
                    dispatch(receiveServiceRequests(serviceRequests));
                    dispatch(mapLoadingComplete());
                });
        })
        .catch(() => {
            dispatch(receiveServices([]));
            dispatch(mapLoadingComplete());
        });
};

export const toggleService = (id) => ({
    type: TOGGLE_SERVICE,
    id
});

export const showSRCard = () => ({
    type: SHOWSRCARD,
    showSRCard: true
});
export const hideSRCard = () => ({
    type: HIDESRCARD,
    showSRCard: false
});