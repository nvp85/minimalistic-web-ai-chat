import './Profile.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { useUser } from '../../hooks/useUser';
import ProfileTableRow from './ProfileTableRow';

export default function Profile() {
    const { currentUser, saveUser } = useUser();
    // TODO: validate input
    function saveChanges(field, newValue) {
        saveUser({...currentUser, [field]: newValue});
    }

    return (
        <div id="profile">
            <h1>User profile</h1>
            <table>
                <tbody>
                    <ProfileTableRow field="name" value={currentUser.name} saveChanges={saveChanges}/>
                    <ProfileTableRow field= "email" value={currentUser.email}  saveChanges={saveChanges}/>
                </tbody>
            </table>
        </div>
    )
}