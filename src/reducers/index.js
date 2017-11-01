import { combineReducers } from 'redux';
import serviceRequest from './serviceRequests';
import services from './services';

export default combineReducers({
    serviceRequest,
    services
});