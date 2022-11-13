import { useState } from 'react';

import './Form.css';

import { Input } from './Input';
import { Select } from './Select';

export function PetForm({ handleSubmit, petData, btnText }) {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Amarelo"]

    function onFileChange(e) {

    }

    function handleChange(e) {

    }

    function handleColor(e) {

    }

    return (
        <form className='form_container'>
            <Input 
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true} // aceitar varias img
            />
            <Input 
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome"
                value={pet.name || ''}
                handleOnChange={handleChange}
            />
            <Input 
                text="Idade do Pet"
                type="text"
                name="age"
                placeholder="Digite a idade"
                value={pet.age || ''}
                handleOnChange={handleChange}
            />
            <Input 
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso"
                value={pet.weight || ''}
                handleOnChange={handleChange}
            />
            <Select 
                text="Selecione a cor"
                name="color"
                options={colors}
                value={pet.color || ''}
                handleOnChange={handleColor}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}