import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../utils/api'; // get connection with API
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
    const [authenticated, setAuthenticate] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    // manipulando o token
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            // se tiver um token ja manda pro backend atraves da API
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticate(true)
        }
    }, [])

    // register user in backend / send flash messages
    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (err) {
            msgText = err.response.data.message // pegando o error message mandado da API
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType) // mandando o conteudo das flash messages
    }

    // authenticate user registered
    async function authUser(data) {
        setAuthenticate(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/') // redirect to home
    }

    function logout() {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'sucess'

        // logout geral
        setAuthenticate(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { register, authenticated, logout }
}