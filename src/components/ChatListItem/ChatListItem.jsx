import { NavLink } from 'react-router';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useState } from 'react';
import { TiTickOutline } from "react-icons/ti";


export default function ChatListItem({chat, deleteChat, rename}) {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(chat.title);

    function handleClick() {
        setEditing(true);
    }

    function handleSubmit(e) {
        e.preventdefault();
        rename(chat.id, e.target.value);
        setEditing(false);
    }

    return (<p key={chat.id} className='chat-list-item'>
        {editing 
            ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name='newTitle'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => setEditing(false)}
                    />
                    <button type='submit'><TiTickOutline size="2rem"/></button>
                </form>)
            : (
                <>
                    <NavLink to={`/chats/${chat.id}`} >{chat.title}</NavLink>
                    <button onClick={handleClick}><FiEdit3 /></button>
                    <button onClick={() => deleteChat(chat.id)} value={chat.id}><RiDeleteBinLine /></button>
                </>
            )}
        </p>)
}