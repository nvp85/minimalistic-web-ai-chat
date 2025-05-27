import { NavLink } from "react-router";
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
                <NavLink to="/"><IoHomeOutline size="2rem"/> Home</NavLink>
            </div>
            <div className="nav-links">
                <NavLink to="about">About</NavLink>
                {isAuthenticated
                    ? (<>
                        <NavLink to="chats" id="chats-link">Chats</NavLink>
                        <NavLink to="profile">Welcome, {user.storedUser.name}</NavLink>
                        <button onClick={user.removeUser} className="btn">Logout</button>
                    </>)
                    : (<>
                        <NavLink to="login">Sign In</NavLink>
                        <NavLink to="register">Sign Up</NavLink>
                    </>)
                }
            </div>
        </nav>
    )
}