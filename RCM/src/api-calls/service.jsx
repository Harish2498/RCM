import { apiRequest } from "./index.jsx"

export const GetSearchServiceData = async (payload) => apiRequest('post', 'recommendation/', payload);
export const GetLocationData = async () => apiRequest('get', 'unique-states/');

// Update GetDataByLocation to accept a state parameter
export const GetDataByLocation = async (state) => {
    const endpoint = `exact-match/?state=${state}`;
    return apiRequest('get', endpoint);
};
