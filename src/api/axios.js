import axios from 'axios'

const BASE_URL = 'https://api.thatsmyplane.com'

export default axios.create({
  baseUrl: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
