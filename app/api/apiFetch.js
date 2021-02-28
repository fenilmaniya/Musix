import { BASE_URL } from '../config/urls';
import {encodeParamsForUrl} from '../utils/urlUtils';

export const apiCall = async (
  route,
  params
) => {

  try {
    const res = await fetch(route, params);
    if (res.ok && res.status==200) {
      const json=await res.json();
      return json;
    }

    return undefined;

  } catch (e) {
    console.log('error while api call : ', e);
  } finally {
    console.log('call complete : ', route);
  }
}

export const apiGet = async(
  params,
) => apiCall(
  `${BASE_URL}?${encodeParamsForUrl(params)}`,
  {
    method: 'get'
  }
)