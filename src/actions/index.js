export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const EDIT_PROFILE = 'EDIT_PROFILE';

export const register = newClient => {
  return () => {
    return fetch('/api/auth/register', {
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
    return fetch('/api/auth/login', {
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
    return fetch('/api/auth/logout', { method: 'POST' })
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
    return fetch('/api/profile', {
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
};