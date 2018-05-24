import { RECEIVE_TRASH_POINTS } from 'actions';

const trashPoints = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TRASH_POINTS:
      return action.trashpoints;
    default:
      return state;
  }
};

export default trashPoints;
