import axios from 'axios'

const BASE_URL = process.env.REACT_APP_ENV === "prod" ? process.env.REACT_APP_PRODUCTION_API_ENDPOINT : process.env.REACT_APP_LOCAL_API_ENDPOINT

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
