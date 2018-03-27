import { FETCH_MAP_DATA, FETCH_MAP_DATA_COMPLETE } from 'actions';

const mapData = (state = { loading: false, dataFound: true }, action) => {
  switch (action.type) {
    case FETCH_MAP_DATA:
      return {
        ...state,
        loading: action.loading,
        title: action.title,
      };
    case FETCH_MAP_DATA_COMPLETE:
      return {
        ...state,
        loading: action.loading,
        dataFound: action.dataFound,
      };
    default:
      return state;
  }
};

export default mapData;
