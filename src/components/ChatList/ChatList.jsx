import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './ChatList.css';
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';
import chatsData from '../../assets/chats.json';
import { useUser } from '../../hooks/UserProvider';
import ChatListItem from '../ChatListItem/ChatListItem';

export default function ChatList({currentChatId = null }) {
    // displays the list of chats
    // handles renaming and deletion of a chat
    // chat is an object that has a title, id, userId, and lastModified properties
    // chats is an array of objects 
    const {storedUser, saveUser, removeUser} = useUser();
    const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == storedUser.id));
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

    function rename(id, title) {
        const chat = chats.find(chat => chat.id == id);
        chat.title = title;
        chat.lastModified = Date.now();
        setChats([...chats.filter(chat => chat.id != id), chat]);
    }

    return (
        <div id="chat-list">
            <h3>Your chats</h3>
            {displayedChats.map(chat => <ChatListItem chat={chat} key={chat.id} deleteChat={deleteChat} rename={rename}/>)}
        </div>
    )
}