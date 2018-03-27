import { RECEIVE_JURISDICTIONS, TOGGLE_JURISDICTION, RESET_JURISDICTIONS } from 'actions';

const jurisdictionFilter = (state = { jurisdictions: [] }, action) => {
  switch (action.type) {
    case RECEIVE_JURISDICTIONS:
      return { ...state, jurisdictions: action.jurisdictions };
    case TOGGLE_JURISDICTION:
      return {
        ...state,
        jurisdictions: state.jurisdictions.map((jurisdiction) => {
          if (jurisdiction.id === action.id) {
            return { ...jurisdiction, selected: !jurisdiction.selected };
          }
          return jurisdiction;
        }),
      };
    case RESET_JURISDICTIONS:
      return {
        ...state,
        jurisdictions: state.jurisdictions
          .map(jurisdiction => ({ ...jurisdiction, selected: false })),
      };
    default:
      return state;
  }
};

export default jurisdictionFilter;
