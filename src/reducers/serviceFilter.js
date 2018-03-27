import { RECEIVE_SERVICES, TOGGLE_SERVICE, RESET_SERVICES } from 'actions';


const serviceFilter = (state = { services: [] }, action) => {
  switch (action.type) {
    case RECEIVE_SERVICES:
      return { ...state, services: action.services };
    case TOGGLE_SERVICE:
      return {
        ...state,
        services: state.services.map((service) => {
          if (service.id === action.id) {
            return { ...service, selected: !service.selected };
          }
          return service;
        }),
      };
    case RESET_SERVICES:
      return {
        ...state,
        services: state.services.map(service => ({ ...service, selected: false })),
      };
    default:
      return state;
  }
};

export default serviceFilter;
