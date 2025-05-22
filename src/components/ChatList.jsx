import { useState } from 'react';
import { Link } from 'react-router';

export default function ChatList() {
    // displays the list of chats
    // handles renaming and deletion of a chat
    // chat is an object that has a title and an uuid
    // chats is an array of objects 
    const chats = [
        {
            title: "dummy chat 1",
            id: "1",
            lastModified: ""
        },
        {
            title: "dummy chat 2",
            id: "2",
            lastModified: ""
        },
        {
            title: "dummy chat 3",
            id: "3",
            lastModified: ""
        },
        {
            title: "dummy chat 4",
            id: "4",
            lastModified: ""
        },
        {
            title: "dummy chat 5",
            id: "5",
            lastModified: ""
        },

    ]
    return (
        <div id="chat-list">
            <h3>Your chats</h3>
            {chats.map(chat => <p key={chat.id} className='chat-list-item'>
                <Link to={`/chats/${chat.id}`} >{chat.title}</Link>
                </p>)}
        </div>
    )
}