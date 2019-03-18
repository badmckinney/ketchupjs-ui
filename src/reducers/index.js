import {
  LOGIN,
  LOAD_CLIENTS
} from '../actions';

const initialState = {
  currentUser: localStorage.getItem('client'),
  clients: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, { currentUser: action.payload });
    case LOAD_CLIENTS:
      return Object.assign({}, state, { clients: [...action.payload] });
    default:
      return state;
  }
};

export default reducer;