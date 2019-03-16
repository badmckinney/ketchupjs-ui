import {
  LOGIN,
  EDIT_PROFILE
} from '../actions';

const initialState = {
  currentUser: localStorage.getItem('client')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, { currentUser: action.payload });

    case EDIT_PROFILE:
      if (action.payload === state.currentUser) {
        return;
      }

      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, {
        currentUser: action.payload
      });

    default:
      return state;
  }
};

export default reducer;