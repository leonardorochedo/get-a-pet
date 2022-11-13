import api from '../../utils/api';

import { useState, useEffect } from 'react';

import './Home.css';

import { Link } from 'react-router-dom';

export function Home() {

    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets')
        .then((response) => {
            setPets(response.data.pets)
        })
    }, [])

    return (
        <section>
            <div className='pet_home_header'>
                <h1>Adote um Pet</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className='pet_container'>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div className='pet_card'>
                            <div className="pet_card_image" style={{ backgroundImage: `url(http://localhost:5000//images/pets/${pet.images[0]})` }} ></div>
                            <h3>{pet.name}</h3>
                            <p><span className="bold">Peso: </span>{pet.weight}</p>
                            {pet.available ? (
                                <Link to={`pets/${pet._id}`}>Mais detalhes</Link>
                            ) : (
                                <p className='adopted_text'>Adotado</p>
                            )}
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Não há pets cadastrados ou disponíveis para a adoção no momento!</p>
                )}
            </div>
        </section>
    )
}