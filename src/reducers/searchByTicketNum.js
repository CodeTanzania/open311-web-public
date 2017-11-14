import { SEARCH_BY_TICKET_NUM, RESET_SEARCH_BY_TICKET_NUM } from 'actions';

const searchByTicketNum = (state = '', action) => {
    switch (action.type) {
        case SEARCH_BY_TICKET_NUM:
            return action.ticketNum;
        case RESET_SEARCH_BY_TICKET_NUM:
            return '';
        default:
            return state;
    }
};

export default searchByTicketNum;