import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css'
function NavBar(){
    const location = useLocation().pathname;
    
    return (
    <div className="navbar">
        <Link to='/'
        className={`nav-btn ${location == '/' ? 'active' : 'unactive'} `}><img className='home-icon' src="home.png" alt="" /></Link>
        
        <Link to='/paylist'  
        className={`nav-btn ${location == '/paylist' ? 'active img-white' : 'unactive'} `}>
            <img src="saudic.png" width="30px" alt="" />
        </Link>

        <Link to='/purchases' 
        className={`nav-btn ${location == '/purchases' ? 'active' : 'unactive'} `}>
            <img src="purchases.png" width="30px" alt="" />
        </Link>
    </div>
    )
}

export default NavBar;