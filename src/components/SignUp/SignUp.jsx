import { Link } from 'react-router';


export default function SignUp() {

    // validate the form
    // when a user is created - just save it into the local storage
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            <p>Already have an accout? Sign in <Link to="/login">here</Link>.</p>
            <form id="register-form" className="form">
                <input type="name" placeholder="Name (optional)"/>
                <input type="email" required placeholder="Email"/>
                <input type="password" required placeholder="Password"/>
                <input type="password" required placeholder="Repeat password"/>
                <button onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}