import { createClient } from 'react-fetching-library';
import { requestHostInterceptor, requestAuthInterceptor } from './interceptors';

const client = createClient({
  requestInterceptors: [
    requestHostInterceptor(process.env.REACT_APP_API_BASE_URL),
    requestAuthInterceptor()
  ]
});

export default client;