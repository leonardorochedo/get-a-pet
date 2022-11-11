import { useState, useContext } from 'react';

import { Input } from "../../form/Input";

import { Link } from 'react-router-dom';

import '../../form/Form.css';

// CONTEXT
import { Context } from '../../../context/UserContext';

export function Register() {

    const [user, setUser] = useState({})
    // desestruturando a funcao register de context
    const { register } = useContext(Context)

    function handleChange(e) {
        // insere no usestate com o name e o value do input
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        // enviar usuario para o banco pelo context
        register(user)
    }

    return (
        <section className="form_container">
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já tem conta? <Link to="/login">Clique Aqui.</Link></p>
        </section>
    );
}