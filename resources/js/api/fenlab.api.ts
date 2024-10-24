import axios from 'axios'

export const fenlabApi = axios.create({
    baseURL: route('api'),
    headers: {
        API_KEY: import.meta.env.VITE_API_KEY || '',
    },
})

