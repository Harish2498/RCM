import {apiRequest} from "./index.jsx"

export const GetSearchServiceData = async (payload) => apiRequest('post', 'recommendations/',payload);
export const GetLocationData = async () => apiRequest('get', 'unique-states/');