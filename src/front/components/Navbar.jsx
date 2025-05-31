import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/signup" className="btn btn-outline-secondary mx-2">Signup</Link>
                    <Link to="/login" className="btn btn-outline-primary mx-2">Login</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};
