import axios from 'axios'
import { getAuthToken } from './auth-token'

export const api = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
