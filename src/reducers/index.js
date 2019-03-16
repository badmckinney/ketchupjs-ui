import {
  LOGIN
} from '../actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, { currentUser: action.payload });
    default:
      return state;
  }
};

export default reducer;