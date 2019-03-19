export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOAD_CLIENTS = 'LOAD_CLIENTS';
export const LOAD_FEATURE = 'LOAD_FEATURE';
export const LOGOUT = 'LOGOUT';
export const EDIT_PROFILE = 'EDIT_PROFILE';
const proxy = ""
export const register = newClient => {
  return () => {
    return fetch(`${proxy}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient)
    })
      .then(res => {
        if (res.status !== 200) { throw new Error('Error creating account'); }
        return true;
      })
      .catch(err => false);
  };
};

export const login = client => {
  return dispatch => {
    return fetch(`${proxy}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    })
      .then(res => {
        if (res.status === 401) { throw new Error('Unauthorized'); }
        return res.json({ success: true });
      })
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: res.username
        });

        return true
      })
      .catch(err => false);
  }
};

export const getClients = () => {
  return dispatch => {
    return fetch('/api/names')
      .then(res => {
        if (res.status === 500) { throw new Error('Server Error'); }
        return res.json({ success: true });
      })
      .then(res => {
        dispatch({
          type: LOAD_CLIENTS,
          payload: res.names
        });

        return true
      })
      .catch(err => false);
  }
};

export const getFeature = () => {
  return dispatch => {
    return fetch('/api/feature')
      .then(res => {
        if (res.status === 500) { throw new Error('Server Error'); }
        return res.json({ success: true });
      })
      .then(res => {
        dispatch({
          type: LOAD_FEATURE,
          payload: res.clients
        });
        return true
      })
      .catch(err => false);
  };
}
export const logout = () => {
  return dispatch => {
    return fetch(`${proxy}api/auth/logout`, { method: 'POST' })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error logging out');
        }

        dispatch({
          type: LOGOUT
        });

        return true;
      })
      .catch(err => false);
  };
}

export const editProfile = updatedInfo => {
  return dispatch => {
    return fetch(`${proxy}/api/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInfo)
    })
      .then(res => {
        if (res.status !== 200) { throw new Error('Error editing profile'); }

        dispatch({
          type: EDIT_PROFILE,
          payload: updatedInfo.username
        });

        return true;
      })
      .catch(err => false);
  }
}
