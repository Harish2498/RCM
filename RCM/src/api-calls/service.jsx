import {apiRequest} from "./index.jsx"

export const GetSearchServiceData = async (payload) => apiRequest('post', 'recommendations/',payload);