import { RECEIVE_SERVICES, TOGGLE_SERVICE } from 'actions';


const services = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SERVICES:
            return action.services;
        case TOGGLE_SERVICE:
            return state.map(service => {
                if (service.id === action.id) {
                    service.selected = !service.selected;
                }
                return service;
            });
        default:
            return state;
    }
};

export default services;