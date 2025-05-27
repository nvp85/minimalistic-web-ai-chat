import './Profile.css';
import { Link } from 'react-router';

export default function Profile() {

    return (
        <div id="profile">
            <h1>User profile</h1>
            <p>Here the user will be able to edit their username and choose a color scheme for their chat.</p>
            <p><Link to='/api-key'>Manage API key</Link></p>
        </div>
    )
}