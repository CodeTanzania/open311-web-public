import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  SELECT_MAP_POINT,
  UNSELECT_MAP_POINT,
  SEARCH_TICKET_NUM,
  SEARCH_TICKET_NUM_RESET,
  RECEIVE_SR_SUMMARY,
} from 'actions';
import serviceRequests from './serviceRequests';
import serviceFilter from './serviceFilter';
import dateFilter from './dateFilter';
import statusFilter from './statusFilter';
import jurisdictionFilter from './jurisdictionFilter';
import mapData from './mapData';


const selectedMapPoint = (state = null, action) => {
  switch (action.type) {
    case SELECT_MAP_POINT:
      return action.selected;
    case UNSELECT_MAP_POINT:
      return null;
    default:
      return state;
  }
};

const ticketNum = (state = '', action) => {
  switch (action.type) {
    case SEARCH_TICKET_NUM:
      return action.ticketNum;
    case SEARCH_TICKET_NUM_RESET:
      return '';
    default:
      return state;
  }
};

const SRSummary = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SR_SUMMARY:
      return action.summary;
    default:
      return state;
  }
};

export default combineReducers({
  serviceRequests,
  dateFilter,
  serviceFilter,
  jurisdictionFilter,
  statusFilter,
  mapData,
  selectedMapPoint,
  ticketNum,
  SRSummary,
  router: routerReducer,
});
