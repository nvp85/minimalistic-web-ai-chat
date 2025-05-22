import { Link } from "react-router";
import './Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <div className="nav-links">
                <Link to="/">Logo / Home</Link>
            </div>
            <div className="nav-links">
                <Link to="api-key">API key</Link>
                <Link to="about">About</Link>
                <Link to="profile">Profile</Link>
                <Link to="register">Sign Up</Link>
                <Link to="login">Sign In</Link>
            </div>
        </nav>
    )
}