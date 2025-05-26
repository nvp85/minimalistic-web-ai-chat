import { useState } from 'react';
import { Link } from 'react-router';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './ChatList.css';

export default function ChatList(props) {
    // displays the list of chats
    // handles renaming and deletion of a chat
    // chat is an object that has a title and an uuid
    // chats is an array of objects 
    const chats = props.chats;
    return (
        <div id="chat-list">
            <h3>Your chats</h3>
            {chats.map(chat => <p key={chat.id} className='chat-list-item'>
                <Link to={`/chats/${chat.id}`} >{chat.title}</Link>
                <FiEdit3 />
                <RiDeleteBinLine />
                </p>)}
        </div>
    )
}