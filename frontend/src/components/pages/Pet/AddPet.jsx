import api from '../../../utils/api';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './AddPet.css';

//  hooks
import useFlashMessage from '../../../hooks/useFlashMessage';
import { PetForm } from '../../form/PetForm';

export function AddPet() {

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet) {
        let msgType = 'sucess'

        const formData = new FormData()

        // criando objeto
        const petFormData = await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append(`images`, pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        formData.append('pet', petFormData)

        // insert na api
        const data = await api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        // flash message
        setFlashMessage(data.message, msgType)

        if(msgType !== 'error') {
            navigate('/pets/mypets')
        }
    } 

    return (
        <section className='addpet_header'>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
                <PetForm btnText="Cadastrar Pet" handleSubmit={registerPet} />
            </div>
        </section>
    )
}