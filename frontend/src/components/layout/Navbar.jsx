import { useContext } from 'react';

import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.png';

import './Navbar.css';

// CONTEXT
import { Context } from '../../context/UserContext';

export function Navbar() {
    // variavel que diz se o usuario esta autenticado via token
    const {authenticated, logout} = useContext(Context)

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <li><Link to="/pets/myadoptions">Minhas Adoçoes</Link></li>
                        <li><Link to="/pets/mypets">Meus Pets</Link></li>
                        <li><Link to="/user/profile">Perfil</Link></li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )}
                
            </ul>
        </nav>
    );
}