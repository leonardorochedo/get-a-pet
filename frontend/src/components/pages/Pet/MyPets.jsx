import api from '../../../utils/api';

import { useState, useEffect } from 'react';

import './Dashboard.css';

import { Link } from 'react-router-dom';

import { RoundedImage } from '../../layout/RoundedImage';

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

export function MyPets() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    async function removePet(id) {
        let msgType = 'sucess'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            const updatedPets = pets.filter((pet) => pet._id != id) // retornar todos os pets menos o que removi
            setPets(updatedPets)
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    async function concludeAdoption(id) {
        let msgType = 'sucess'

        const data = await api.patch(`pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

    return (
        <section>
            <div className='petlist_header'>
                <h1>MyPets</h1>
                <Link to="/pets/add">Cadastrar Pet</Link>
            </div>
            <div className='petlist_container'>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet.id} className='petlist_row'>
                            <RoundedImage 
                                src={`http://localhost:5000//images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className="bold">{pet.name}</span>
                            <div className="actions">
                                {pet.available ? (
                                    <>
                                    {pet.adopter && (
                                        <button className='conclude_btn' onClick={() => {
                                            concludeAdoption(pet._id)
                                        }}>Concluir Adoção</button>
                                    )}
                                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                                    <button onClick={() => {
                                        removePet(pet._id)
                                    }}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {pets.length == 0 && (
                    <p>Não há Pets cadastrados</p>
                )}
            </div>
        </section>
    )
}