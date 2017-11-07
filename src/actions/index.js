import API from 'API';

export const MAP_LOADING = 'map_loading';
export const MAP_LOADING_COMPLETE = 'map_loading_complete';
export const SHOWSRCARD = 'show_service_request_card';
export const HIDESRCARD = 'hide_service_request_card';
export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';
export const RECEIVE_SERVICES = 'services_receive';
export const RECEIVE_STATUSES = 'statuses_receive';
export const RECEIVE_JURISDICTIONS = 'jurisdictions_receive';
export const TOGGLE_SERVICE = 'toggle_service';
export const TOGGLE_JURISDICTION = 'toggle_jurisdiction';
export const TOGGLE_STATUS = 'toggle_status';
export const MAP_DATE_FILTER_CHANGE = 'map_date_change';


const receiveServiceRequests = (serviceRequests) => ({
    type: RECEIVE_SERVICEREQUESTS,
    serviceRequests
});

const receiveServices = (services) => ({
    type: RECEIVE_SERVICES,
    services
});

const receiveJurisdictions = jurisdictions => ({
    type: RECEIVE_JURISDICTIONS,
    jurisdictions
});

const receiveStatuses = statuses => ({
    type: RECEIVE_STATUSES,
    statuses
});

const mapLoading = () => ({
    type: MAP_LOADING,
    mapLoading: true
});

const mapLoadingComplete = () => ({
    type: MAP_LOADING,
    mapLoading: false
});

// Action to select or unselect service among filters
export const toggleService = (id) => ({
    type: TOGGLE_SERVICE,
    id
});
// Action to select or unselect area among filters
export const toggleJurisdiction = (id) => ({
    type: TOGGLE_JURISDICTION,
    id
});
// Action to select or unselect status among filters
export const toggleStatus = (id) => ({
    type: TOGGLE_STATUS,
    id
});

export const dateFilterChange = (startDate, endDate) => ({
    type: MAP_DATE_FILTER_CHANGE,
    startDate,
    endDate
});

export const showSRCard = () => ({
    type: SHOWSRCARD,
    showSRCard: true
});
export const hideSRCard = () => ({
    type: HIDESRCARD,
    showSRCard: false
});


export const getServiceRequests = () => (dispatch, getState) => {
    dispatch(mapLoading());
    const { services, jurisdictions, statuses, mapFilter } = getState();
    const selectedServices = services.filter(service => service.selected);
    const selectedAreas = jurisdictions.filter(area => area.selected);
    const selectedStatuses = statuses.filter(status => status.selected);
    const query = {
        ...mapFilter,
        services: selectedServices.map(service => service.id),
        jurisdictions: selectedAreas.map(area => area.id),
        statuses: selectedStatuses.map(status => status.id),
    };

    API
        .getSR(query)
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

export const initMapData = () => dispatch => {
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
            return dispatch(receiveServices(services));
        })
        .then(() => {
            //Get Jurisdictions
            return API
                .getJurisdictions()
                .then(data => {
                    const areas = data.jurisdictions.map(jurisdiction => {
                        return {
                            name: jurisdiction.name,
                            id: jurisdiction._id,
                            selected: false
                        };
                    });
                    return dispatch(receiveJurisdictions(areas));
                });
        })
        .then(() => {
            // Get statuses
            return API
                .getStatuses()
                .then(data => {
                    const statuses = data.statuses.map(status => {
                        return {
                            name: status.name,
                            id: status._id,
                            selected: false
                        };
                    });
                    return dispatch(receiveStatuses(statuses));
                });
        })
        .then(() => {
            dispatch(getServiceRequests());
        });
};

