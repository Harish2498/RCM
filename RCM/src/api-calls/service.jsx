import {apiRequest} from "./index.jsx"

export const GetSearchServiceData = async (payload) => apiRequest('post', 'recommendation/',payload);
export const GetLocationData = async () => apiRequest('get', 'unique-states/');
export const GetDataByLocation = async () => apiRequest('get', 'exact-match/');