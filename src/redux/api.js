import axios from "axios";

const baseURL = "http://localhost:4000";

export const apiCall = async (method, url, data, headers) =>
    axios({
        method,
        url: baseURL + url,
        data,
        headers,
    });
