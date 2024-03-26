import {apiRequest} from "./index.jsx"

export const GetComparisionData = async () => apiRequest('get', 'top_ten_revenue_earners/');
export const GetGenAiData = async () => apiRequest('get', 'data-analysis/');