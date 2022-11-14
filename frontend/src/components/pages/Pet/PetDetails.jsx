import api from '../../../utils/api';

import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import './PetDetails.css';

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

export function PetDetails() {

    const [pet, setPet] = useState({})
    const { setFlashMessage } = useFlashMessage()
    const { id } = useParams()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        
        api.get(`pets/${id}`)
        .then((response) => {
            setPet(response.data.pet)
        })

    }, [id])

    async function schedule() {

        let msgType = 'sucess'

        const data = await api.patch(`pets/schedule/${pet._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log(err.reponse.data)
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

    return (
        <>
            {pet.name && (
                <section className='pet_details_container'>
                    <div className='pet_details_header'>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                    </div>
                    <div className='pet_images'>
                        {pet.images.map((image, index) => (
                            <img
                            src={`http://localhost:5000//images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            key={index}
                            />
                        ))}
                    </div>
                    <div>
                        <p><span className="bold">Peso: </span>{pet.weight} kg</p>
                        <p><span className="bold">Idade: </span>{pet.age} anos</p>
                        {token ? (
                            <button onClick={schedule}>Solicitar uma Visita</button>
                        ) : (
                            <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita!</p>
                        )}
                    </div>
                </section>
            )}
        </>
    )
}