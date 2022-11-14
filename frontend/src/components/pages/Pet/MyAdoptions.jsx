import api from '../../../utils/api';

import { useState, useEffect } from 'react';

import { RoundedImage } from '../../layout/RoundedImage';

import './Dashboard.css';

export function MyAdoptions() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`pets/myadoptions`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    return (
        <section>
            <div className='petlist_header'>
                <h1>Minhas Adoções</h1>
            </div>
            <div className='petlist_container'>
                {pets.length > 0 &&
                pets.map((pet) => (
                    <div key={pet.id} className='petlist_row'>
                        <RoundedImage 
                            src={`http://localhost:5000//images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width="px75"
                        />
                        <span className="bold">{pet.name}</span>
                        <div className='contacts'>
                            <p><span className="bold">Ligue para: </span>{pet.user.phone}</p>
                            <p><span className="bold">Fale com: </span>{pet.user.name}</p>
                        </div>
                        <div className="actions">
                            {pet.available ? (
                                <p>Adoção em processo</p>
                            ) : (
                                <p>Parabéns por concluir essa adoção</p>
                            )}
                        </div>
                    </div>
                ))}
                {pets.length === 0 && (
                    <p>Ainda não há adoções de Pets.</p>
                )}
            </div>
        </section>
    )
}