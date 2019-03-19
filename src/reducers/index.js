import {
  LOGIN,
  LOAD_CLIENTS,
  LOAD_FEATURE,
  LOGOUT,
  LOAD_PROFILE,
  EDIT_PROFILE,
  GENERATE_KEY
} from '../actions';

const initialState = {
  currentUser: localStorage.getItem('client'),
  clientNames: [],
  feature: [],
  profile: {
    name: "",
    username: "",
    key: "",
    public: true
  }
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
    case LOAD_PROFILE:
      if (action.payload === state.profile) {
        return;
      }

      return Object.assign({}, state, { profile: action.payload });
    case EDIT_PROFILE:
      if (action.payload === state.currentUser) {
        return;
      }
      localStorage.setItem('client', action.payload);
      return Object.assign({}, state, {
        currentUser: action.payload
      });
    case GENERATE_KEY:
      return Object.assign({}, state, { profile: action.payload });
    default:
      return state;
  }
};

export default reducer;