import axios from "axios";

// const API_BASE_URL = "https://todolist.idsil.com/backend";
const API_BASE_URL = "http://127.0.0.1:8000/api"
// Base URL of your API

export const apiRequest = async (method, url, payload) => { //api/users/login
    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}/${url}`, // Combine base URL with the provided endpoint
            data: payload,
            // headers: {
            //     authorization: `Bearer ${localStorage.getItem("token")}`,
            // },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};