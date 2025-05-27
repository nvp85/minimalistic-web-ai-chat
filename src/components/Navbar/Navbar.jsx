import { NavLink } from "react-router";
import './Navbar.css'
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/UserProvider";
import { IoHomeOutline } from "react-icons/io5";
import Hamburger from 'hamburger-react';

// TODO: conditional rendering: if logged in then "logout" button
export default function Navbar() {
    const user = useUser();
    const isAuthenticated = user.storedUser ? true : false;
    const [ isMenuOpen, setIsMenuOpen ] = useState();


    return (
        <nav>
            <div className="nav-links">
                <NavLink to="/"><IoHomeOutline size="2rem"/> Home</NavLink>
            </div>
            <div className="nav-links" id="desktop-nav">
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
            <div id="mobil-nav">
                <Hamburger toggled={isMenuOpen} size={20} toggle={setIsMenuOpen} />
                { isMenuOpen &&
                <div className="nav-links" id="hamburger-menu">
                    <NavLink to="about">About</NavLink>
                    {isAuthenticated
                        ? (<>
                            <NavLink to="chats" id="chats-link">Chats</NavLink>
                            <NavLink to="profile">Profile</NavLink>
                            <button onClick={user.removeUser} className="btn">Logout</button>
                        </>)
                        : (<>
                            <NavLink to="login">Sign In</NavLink>
                            <NavLink to="register">Sign Up</NavLink>
                        </>)
                    }
                </div>}
            </div>
        </nav>
    )
}