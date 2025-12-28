import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

import './Navbar.css'

const Navbar = () => {
    const {user, logout} = useAuth();

    return(
        <nav id="navbar">
            <h2>
                <Link to="/">Party Service</Link>
            </h2>



            <ul>
                {!user ? (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/">Minhas Festas</Link>
                    </li>
                    <li>
                        <Link to="/party/new">Criar festa</Link>
                    </li>
                    <li>
                        <button onClick={logout} className="logout-btn">Sair</button>
                    </li>  
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
