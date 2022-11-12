import api from '../../../utils/api'; // import api

import { useState, useEffect } from 'react';

import './Profile.css';
import '../../form/Form.css';

import { Input } from '../../form/Input';

export function Profile() {

    const [user, setUser] = useState({})
    // pegando o token via lS
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        // dando um get na api que retorna as informacoes do user via token
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data) // setando as info do back no user
        })

    }, [])

    function onFileChange() {

    }

    function handleChange() {

    }

    return (
        <section className='form_container'>
            <div className="profile_container">
                <h1>Profile</h1>
                <p>Preview Image</p>
            </div>
            <form>
                <Input 
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input 
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input 
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input 
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Confirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )
}
