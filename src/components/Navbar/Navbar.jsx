import { Link } from "react-router";
import './Navbar.css'
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/UserProvider";
import { IoHomeOutline } from "react-icons/io5";

// TODO: conditional rendering: if logged in then "logout" button
export default function Navbar() {
    const user = useUser();
    const isAuthenticated = user.storedUser ? true : false;

    return (
        <nav>
            <div className="nav-links">
                <Link to="/"><IoHomeOutline size="2rem"/> Home</Link>
            </div>
            <div className="nav-links">
                <Link to="about">About</Link>
                {isAuthenticated
                    ? (<>
                        <Link to="api-key">API key</Link>
                        <Link to="profile">Welcome, {user.storedUser.name}</Link>
                        <button onClick={user.removeUser}>Logout</button>
                    </>)
                    : (<>
                        <Link to="login">Sign In</Link>
                        <Link to="register">Sign Up</Link>
                    </>)
                }
            </div>
        </nav>
    )
}