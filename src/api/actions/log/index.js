export const logListAction = () => ({
  method: 'GET',
  endpoint: '/api/log/list'
});

export const readLogAction = (id) => ({
  method: 'GET',
  endpoint: `/api/log/${id}`
});