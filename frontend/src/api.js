import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

const apiRequest = axios.create({
  baseURL: BASE_URL
})

export default apiRequest