// const { apiRequest } = require("./index");
import {apiRequest} from "./index.jsx"

export const GetCardData = async () => apiRequest('get', 'services/');