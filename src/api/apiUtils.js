import {API_STATES} from '../utils/constant';
import {BASE_URL} from './api';

export const fetchAPI = async (url, method, body, header) => {
  try {
    return await fetch(`${BASE_URL}${url}`, {
      method: method,
      headers: {
        ...header,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then(res => res.json())
      .then(result => {
        if (!result.error) {
          return {state: API_STATES.SUCCESS, data: result, error: []};
        } else {
          return {state: API_STATES.ERROR, data: result, error: result?.error};
        }
      });
  } catch (error) {
    return {state: API_STATES.ERROR, data: [], error: error};
  }
};
