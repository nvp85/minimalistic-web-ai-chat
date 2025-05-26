import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './ChatList.css';
import { useEffect } from 'react';
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';

export default function ChatList({currentChatId = null, deleteMessages = null }) {
    // displays the list of chats
    // handles renaming and deletion of a chat
    // chat is an object that has a title and an uuid
    // chats is an array of objects 
    const [chats, setChats, removeChats] = useSyncLocalstorage("chats");
    const displayedChats = chats.toSorted((a, b) => b.lastModified - a.lastModified);
    const navigate = useNavigate();

    function deleteChat(id) {
        // when we are deleting the current chat
        // we don't want to notify other components but to navigate to the home page
        if (currentChatId == id) {
            localStorage.setItem("chats", JSON.stringify(chats.filter(chat => chat.id != id)));
            navigate("/");
        } else {
            setChats(chats.filter(chat => chat.id != id));
        }
        // delete the chat messages
        // if it's the current chat we don't want to trigger re-rendering of the chat page
        localStorage.removeItem(id); 
    }

    function giveTitle(id, title) {
        const chat = chats.find(chat => chat.id == id);
        chat.title = title;
        chat.lastModified = Date.now();
        setChats([...chats.filter(chat => chat.id != id), chat]);
    }

    return (
        <div id="chat-list">
            <h3>Your chats</h3>
            {displayedChats.map(chat => <p key={chat.id} className='chat-list-item'>
                <Link to={`/chats/${chat.id}`} >{chat.title}</Link>
                <button ><FiEdit3 /></button>
                <button onClick={() => deleteChat(chat.id)} value={chat.id}><RiDeleteBinLine /></button>
                </p>)}
        </div>
    )
}