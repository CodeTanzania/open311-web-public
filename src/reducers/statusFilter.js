
import { RECEIVE_STATUSES, TOGGLE_STATUS, RESET_STATUSES } from 'actions';

const statusFilter = (state = { statuses: [] }, action) => {
    switch (action.type) {
        case RECEIVE_STATUSES:
            return { ...state, statuses: action.statuses };
        case TOGGLE_STATUS:
            return {
                ...state, statuses: state.statuses.map(status => {
                    if (status.id === action.id) {
                        status.selected = !status.selected;
                    }
                    return status;
                })
            };
        case RESET_STATUSES:
            return {
                ...state, statuses: state.statuses.map(status => {
                    status.selected = false;
                    return status;
                })
            };
        default:
            return state;
    }
};

export default statusFilter;