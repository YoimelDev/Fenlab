import axios from 'axios'

interface LoginResponse {
    token: string
}

const fenlabAuthLogin = axios.create({
    baseURL: import.meta.env.FENLAB_API_URL,
    headers: {
        API_KEY: import.meta.env.FENLAB_API_KEY,
    },
})

export const fenlabLogin = async (email: string, password: string) => {
    try {
        const response = await fenlabAuthLogin.post<LoginResponse>(
            `${import.meta.env.FENLAB_LOGIN_ENDPOINT}`,
            {
                email,
                password,
            },
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}
