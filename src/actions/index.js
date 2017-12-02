import API from 'API';

export const FETCH_MAP_DATA = 'fetch_map_data';
export const FETCH_MAP_DATA_COMPLETE = 'fetch_map_data_complete';
export const SELECT_MAP_POINT = 'select_map_point';
export const UNSELECT_MAP_POINT = 'unselect_map_point';
export const RECEIVE_SERVICEREQUESTS = 'service_request_receive';
export const RECEIVE_SERVICES = 'services_receive';
export const RECEIVE_STATUSES = 'statuses_receive';
export const RESET_STATUSES = 'statuses_reset';
export const RECEIVE_JURISDICTIONS = 'jurisdictions_receive';
export const RESET_JURISDICTIONS = 'jurisdictions_reset';
export const TOGGLE_SERVICE = 'toggle_service';
export const TOGGLE_JURISDICTION = 'toggle_jurisdiction';
export const TOGGLE_STATUS = 'toggle_status';
export const MAP_DATE_FILTER_CHANGE = 'map_date_change';
export const SEARCH_TICKET_NUM = 'search_ticket_number';
export const SEARCH_TICKET_NUM_RESET = 'search_ticket_number_reset';
export const RECEIVE_SR_SUMMARY = 'receive_service_request_summary';
import moment from 'moment';
import { MAP_DATA_RELOAD, MAP_DATA_SEARCH_BY_TICKETNO } from 'utils/constants';

const receiveServiceRequests = (serviceRequests) => ({ type: RECEIVE_SERVICEREQUESTS, serviceRequests });

const receiveServices = (services) => ({ type: RECEIVE_SERVICES, services });

const receiveJurisdictions = jurisdictions => ({ type: RECEIVE_JURISDICTIONS, jurisdictions });

const resetJurisdictions = () => ({ type: RESET_JURISDICTIONS });

const receiveStatuses = statuses => ({ type: RECEIVE_STATUSES, statuses });

const resetStatuses = () => ({ type: RESET_STATUSES });

const fetchMapData = (title = MAP_DATA_RELOAD) => ({
    type: FETCH_MAP_DATA,
    loading: true,
    title
});

const receiveSRSummary = (summary) => ({ type: RECEIVE_SR_SUMMARY, summary });

export const fetchMapDataComplete = (dataFound = true) => ({
    type: FETCH_MAP_DATA_COMPLETE,
    loading: false,
    dataFound
});

const searchTicketNum = (ticketNum) => ({
    type: SEARCH_TICKET_NUM,
    ticketNum
});

export const resetSearchTicketNum = () => ({ type: SEARCH_TICKET_NUM_RESET });

// Action to select or unselect service among filters
export const toggleService = (id) => ({ type: TOGGLE_SERVICE, id });
// Action to select or unselect area among filters
export const toggleJurisdiction = (id) => ({ type: TOGGLE_JURISDICTION, id });
// Action to select or unselect status among filters
export const toggleStatus = (id) => ({ type: TOGGLE_STATUS, id });

export const dateFilterChange = (startDate, endDate) => ({ type: MAP_DATE_FILTER_CHANGE, startDate, endDate });

export const selectMapPoint = (serviceRequest) => ({ type: SELECT_MAP_POINT, selected: serviceRequest });
export const unselectMapPoint = () => ({ type: UNSELECT_MAP_POINT });

export const reloadSRSummary = () => (dispatch, getState) => {
    const { startDate, endDate } = getState().dateFilter;
    API
        .getSRSummary(startDate, endDate)
        .then(data => {
            dispatch(receiveSRSummary(data));
        });
};

export const getServiceRequests = () => (dispatch, getState) => {
    dispatch(fetchMapData());
    const { serviceFilter, jurisdictionFilter, statusFilter, dateFilter } = getState();
    const selectedServices = serviceFilter
        .services
        .filter(service => service.selected);
    const selectedAreas = jurisdictionFilter
        .jurisdictions
        .filter(area => area.selected);
    const selectedStatuses = statusFilter
        .statuses
        .filter(status => status.selected);
    const query = {
        ...dateFilter,
        services: selectedServices.map(service => service.id),
        jurisdictions: selectedAreas.map(area => area.id),
        statuses: selectedStatuses.map(status => status.id)
    };

    API
        .getSR(query)
        .then(data => {
            const serviceRequests = data.servicerequests;
            dispatch(receiveServiceRequests(serviceRequests));
            dispatch(fetchMapDataComplete());
        })
        .catch(() => {
            dispatch(receiveServiceRequests([]));
            dispatch(fetchMapDataComplete());
        });
};

export const searchSRByTicketNo = (ticketNum) => (dispatch) => {
    dispatch(fetchMapData(MAP_DATA_SEARCH_BY_TICKETNO));
    dispatch(searchTicketNum(ticketNum));
    API
        .findSRByTicketNum(ticketNum)
        .then(data => {
            if (!data.servicerequests.length) {
                dispatch(fetchMapDataComplete(false));
            } else {
                const serviceRequest = data.servicerequests[0];
                const endDate = moment(serviceRequest.createdAt).add(1, 'months');
                const startDate = moment(serviceRequest.createdAt).subtract(2, 'months');
                //change date filter to include the found issue
                dispatch(dateFilterChange(startDate, endDate));
                //reset jurisdictions
                dispatch(resetJurisdictions());
                // reset statuses if set
                dispatch(resetStatuses());
                // load all SR's
                dispatch(getServiceRequests());
                //select found SR
                dispatch(selectMapPoint(serviceRequest));
            }
        });
};

export const fetchServices = () => (dispatch) => {
    API
        .getServices()
        .then(data => {
            const services = data
                .services
                .map(service => {
                    return { code: service.code, name: service.name, id: service._id, selected: true };
                });
            return dispatch(receiveServices(services));
        });
};

export const initMapData = () => dispatch => {
    dispatch(fetchMapData());
    API
        .getServices()
        .then(data => {
            const services = data
                .services
                .map(service => {
                    return { code: service.code, name: service.name, id: service._id, selected: true };
                });
            return dispatch(receiveServices(services));
        })
        .then(() => {
            //Get Jurisdictions
            return API
                .getJurisdictions()
                .then(data => {
                    const areas = data
                        .jurisdictions
                        .map(jurisdiction => {
                            return { name: jurisdiction.name, id: jurisdiction._id, selected: false };
                        });
                    return dispatch(receiveJurisdictions(areas));
                });
        })
        .then(() => {
            // Get statuses
            return API
                .getStatuses()
                .then(data => {
                    const statuses = data
                        .statuses
                        .map(status => {
                            return { name: status.name, id: status._id, selected: false };
                        });
                    return dispatch(receiveStatuses(statuses));
                });
        })
        .then(() => {
            dispatch(getServiceRequests());
        });
};
