import Navbar from "./Navbar"

const Header = () => {
    return <div className="w-100 text-light fs-5 bg-dark-subtle pb-5 z-3">
        <header className="w-100 z-3 position-fixed top-0 mb-5 bg-dark border-bottom border-3 border-success border-opacity-25 border-dark-subtle shadow">
            <Navbar />
        </header>
    </div>
}

export default Header