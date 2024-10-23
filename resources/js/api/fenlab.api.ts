import { usePage } from '@inertiajs/vue3'
import axios from 'axios'

export const fenlabApi = axios.create({
    baseURL: import.meta.env.VITE_FENLAB_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

fenlabApi.interceptors.request.use(config => {
    const token = (usePage().props.auth as { loginToken: string }).loginToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})