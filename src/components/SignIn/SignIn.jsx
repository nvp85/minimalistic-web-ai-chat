import users from "../../assets/users.json";
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import './SignIn.css';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "demoUser@example.com", 
        password: "qwerty123"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // if there is an info in the local storage then user is logged in
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            navigate("/profile");
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        // check if there is a matching user in the json
        const storedUser = users.find(user => user.email === formData.email);
        if (!storedUser || storedUser.password !== formData.password) {
            setError("Error: invalid credentials.");
            return;
        }
        localStorage.setItem("user", JSON.stringify(storedUser));
        navigate("/");
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    function togglePassword(e) {
        e.preventDefault();
        setShowPassword(prev => !prev);
    }

    return (
        <div className="form-container">
            <h1>Sign In</h1>
            <p>Don't have an accout? Register <Link to="/register">here</Link>.</p>
            {error ? <p>{error}</p> : "" }
            <form id="login-form" className="form">
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required />
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    placeholder="Password"/>
                <button type="button" onClick={togglePassword}>
                    {showPassword ? <LuEye /> : <LuEyeOff /> }
                </button>
                <button type="submit" onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}