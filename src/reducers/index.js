import {
  LOGIN,
  LOAD_CLIENTS,
  LOAD_FEATURE,
  LOGOUT,
  EDIT_PROFILE
} from '../actions';

const initialState = {
  currentUser: localStorage.getItem('client'),
  clientNames: [],
  feature: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, { currentUser: action.payload });
    case LOAD_CLIENTS:
      return Object.assign({}, state, { clientNames: [...action.payload] });
    case LOAD_FEATURE:
      return Object.assign({}, state, { feature: [...action.payload] });
    case LOGOUT:
      localStorage.removeItem('client');
      return Object.assign({}, state, {
        currentUser: '',
        profile: {}
      });
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