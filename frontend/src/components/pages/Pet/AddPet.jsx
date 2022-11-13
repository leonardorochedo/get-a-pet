import api from '../../../utils/api';

import { useState } from 'react';

import { Navigate } from 'react-router-dom';

import './AddPet.css';

//  hooks
import useFlashMessage from '../../../hooks/useFlashMessage';
import { PetForm } from '../../form/PetForm';

export function AddPet() {

    return (
        <section className='addpet_header'>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
                <PetForm btnText="Cadastrar Pet" />
            </div>
        </section>
    )
}