import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <Link className='logo' to='/'>MacacoFlix</Link>
            <Link className='favoritos button' to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}

export default Header;