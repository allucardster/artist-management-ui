export const requestHostInterceptor = host => client => async action => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
  };
}

export const requestAuthInterceptor = host => client => async action => {
  const { headers = {}, endpoint } = action

  if ('/api/login_check' === endpoint) {
    return {
      ...action
    }
  }

  const token = sessionStorage.getItem('token') || null;

  if (token) {
    Object.assign(headers, { 'Authorization': `Bearer ${token}` });
  }

  return {
    ...action,
    headers
  }
}