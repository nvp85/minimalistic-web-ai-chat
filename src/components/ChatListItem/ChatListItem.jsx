import { NavLink } from 'react-router';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useState, useEffect, useRef } from 'react';
import { TiTickOutline } from "react-icons/ti";


export default function ChatListItem({chat, deleteChat, rename}) {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(chat.title);
    const editImput = useRef();

    function handleClick() {
        setEditing(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        rename(chat.id, newTitle);
        setEditing(false);
    }

    function handleBlur() {
        setTimeout(() => setEditing(false), 200);
    }

    useEffect(() => {
        if (editing && editImput.current) {
            editImput.current.focus();
        }
    }, [editing])

    return (<div className='chat-list-item'>
        {editing 
            ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name='newTitle'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleBlur}
                        ref={editImput}
                        maxLength="50"
                    />
                    <button type="submit"><TiTickOutline size="2rem"/></button>
                </form>)
            : (
                <>
                    <NavLink to={`/chats/${chat.id}`} >{chat.title}</NavLink>
                    <button onClick={handleClick}><FiEdit3 /></button>
                    <button onClick={() => deleteChat(chat.id)} value={chat.id}><RiDeleteBinLine /></button>
                </>
            )}
        </div>)
}