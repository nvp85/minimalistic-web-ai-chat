import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav>
            <p>Naviagation bar goes here</p>
            <Link to="/"> Home |</Link>
            <Link to="chats/1"> Chat page |</Link>
            <Link to="register"> Sign Up |</Link>
            <Link to="login"> Sign In </Link>
        </nav>
    )
}