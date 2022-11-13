import { useState } from 'react';

import './Form.css';

import { Input } from './Input';
import { Select } from './Select';

export function PetForm({ handleSubmit, petData, btnText }) {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Amarelo"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }

    function handleChange(e) {
        setPet({...pet, [e.target.name]: e.target.value})
    }

    function handleColor(e) {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e) {
        e.preventDefault()
        console.log(pet)
        handleSubmit(pet) // inseriando na register pet
    }

    return (
        <form className='form_container' onSubmit={submit}>
            <div className='preview_pet_images'>
                {preview.length > 0
                ? preview.map((image, index) => (
                    <img 
                    src={URL.createObjectURL(image)}
                    alt={pet.name} key={`${pet.name}+${index}`}
                    />
                )) :
                pet.images && pet.images.map((image, index) => (
                    <img 
                    src={`http://localhost:5000//images/pets${image}`}
                    alt={pet.name} key={`${pet.name}+${index}`}
                    />
                ))
                }
            </div>
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
                // value={pet.age || ''}
                handleOnChange={handleChange}
            />
            <Input 
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso"
                // value={pet.weight || ''}
                handleOnChange={handleChange}
            />
            <Select 
                text="Selecione a cor"
                name="color"
                options={colors}
                // value={pet.color || ''}
                handleOnChange={handleColor}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}