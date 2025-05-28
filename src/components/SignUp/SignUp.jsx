import { Link } from 'react-router';
import './SignUp.css';
import { useState } from "react";
import { useNavigate } from 'react-router';
import users from "../../assets/users.json";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useUser } from "../../hooks/UserProvider";


export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const manageUser = useUser();

    function isPasswordValid(password) {
        let errors = [];
        if (password.length < 8) {
            errors.push("Password should be at least 8 characters long.");
        };
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}":;'<>?,./]).*$/.test(password)) {
            errors.push("Password should include at least one uppercase and one lowercase letter, at least one number, and at least one special character.");
        };
        if (/^(?=.*\s).*$/.test(password)) {
            errors.push("Password should not contain whitespaces.");
        };
        return errors.length > 0 ? {ok: false, errors: errors} : {ok: true, errors: []} ;
    }

    // validate the form
    // when a user is created - just save it into the local storage
    function handleSubmit(e) {
        e.preventDefault();
        const errors = [];
        if (!formData.email || !formData.password) {
            errors.push("Please enter valid email and password.");
        }
        errors.push(...isPasswordValid(formData.password)["errors"]);
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        // try to create an acc
        try {
            const duplicate = users.find(user => user.email === formData.email);
            if (duplicate) {
                setFormErrors(["Error: invalid credentials."]);
                return;
            }
            const user = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }
            manageUser.saveUser(user);
            navigate("/");
        } catch (err) {
            setFormErrors(["Error: Fail to create an account."]);
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            <p>Already have an accout? Sign in <Link to="/login">here</Link>.</p>
            {formErrors.map(err => <p className="red-text" key={err}>{err}</p>)}
            <form id="register-form" className="form">
                <input 
                    type="name" 
                    placeholder="Name (optional)"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required/>
                <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required/>
                <button type="button" className="eye-btn" onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <LuEye /> : <LuEyeOff /> }
                </button>
                <button onClick={handleSubmit} id="signup-btn" className='btn'>submit</button>
            </form>
        </div>
    )
}