export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const LOAD_PROFILE = 'LOAD_PROFILE';
export const GENERATE_KEY = 'GENERATE_KEY';

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

export const loadProfile = () => {
  return dispatch => {
    return fetch('/api/profile')
      .then(res => {
        if (res.status !== 200) { throw new Error('Error fetching profile'); }
        return res.json();
      })
      .then(data => {
        dispatch({
          type: LOAD_PROFILE,
          payload: data
        });
      })
      .catch(err => err)
  }
};

export const editProfile = updatedInfo => {
  return dispatch => {
    return fetch(`${proxy}/api/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInfo)
    })
      .then(res => {
        if (res.status !== 200) { throw new Error('Error editing profile'); }
        return res.json();
      })
      .then(data => {
        dispatch({
          type: EDIT_PROFILE,
          payload: updatedInfo.username
        });

        return true;
      })
      .catch(err => false);
  }
};

export const generateAPIKey = () => {
  return dispatch => {
    return fetch('/api/key', { method: 'PUT' })
      .then(res => {
        if (res.status !== 200) { throw new Error('Error generating API key'); }
        return res.json();
      }).then(data => {
        dispatch({
          type: GENERATE_KEY,
          payload: data
        });

        return true;
      })
      .catch(err => false);
  }
};