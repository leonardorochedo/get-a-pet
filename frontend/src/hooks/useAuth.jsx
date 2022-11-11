import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import api from '../utils/api'; // get connection with API
import useFlashMessage from './useFlashMessage';

export default function useAuth() {

    const {setFlashMessage} = useFlashMessage()

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
        } catch (err) {
            msgText = err.response.data.message // pegando o error message mandado da API
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType) // mandando o conteudo das flash messages
    }

    return { register }
}