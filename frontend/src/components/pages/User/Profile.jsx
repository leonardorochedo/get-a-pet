import api from '../../../utils/api'; // import api

import { useState, useEffect } from 'react';

import './Profile.css';
import '../../form/Form.css';

import { Input } from '../../form/Input';

import useFlashMessage from '../../../hooks/useFlashMessage';

export function Profile() {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    // pegando o token via lS
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

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

    function onFileChange(e) {
        setPreview(e.target.files[0]) // preview da image
        setUser({...user, [e.target.name]: e.target.files[0]}) // setando a image no perfil
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        let msgType = 'sucess'

        const formData = new FormData()

        const userFormData = await Object.keys(user).forEach((key) => 
            formData.append(key, user[key])
        )

        // dando o update
        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data' // backend entender que esta indo uma imagem
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            let msgType = 'sucess'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className="profile_container">
                <h1>Profile</h1>
                {(user.image || preview) && (
                    <img src={
                        preview
                        ? URL.createObjectURL(preview)
                        : `http://localhost:5000//images/users/${user.image}`}
                        alt={user.name} />
                )}
            </div>
            <form onSubmit={handleSubmit} className='form_container'>
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
