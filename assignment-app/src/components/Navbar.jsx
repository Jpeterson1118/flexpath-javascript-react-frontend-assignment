import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation().pathname;
    return (
        <nav className='navbar '>
            <ul className='d-flex my-3'>
                <Link to="/" className={location === "/" ? "nav-link active mx-2" : "nav-link mx-2"} aria-current={location === "/" ? true : false}>User Behavior Data</Link>

                <Link to="/search" className={location === "/search" ? "nav-link active mx-2" : " nav-link mx-2"} aria-current={location === "/search" ? true : false}>Search Through Dataset</Link>
            </ul>
        </nav>
    )
}

export default Navbar;