import { useState, useContext } from 'react';

import { Input } from '../../form/Input';
import { Link } from 'react-router-dom';

import '../../form/Form.css';

// CONTEXT
import { Context } from '../../../context/UserContext';

export function Login() {

    function handleChange() {

    }

    return (
        <section className='form_container'>
            <h1>Login</h1>
            <form >
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>Não tem conta? <Link to="/register">Clique Aqui.</Link></p>
        </section>
    );
}