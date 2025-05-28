import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router';
import './ChatList.css';
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';
import chatsData from '../../assets/chats.json';
import { useUser } from '../../hooks/UserProvider';
import ChatListItem from '../ChatListItem/ChatListItem';
import Modal from '../Modal/Modal';


export default function ChatList({ currentChatId = null }) {
    // displays the list of chats
    // handles renaming and deletion of a chat
    // chat is an object that has a title, id, userId, and lastModified properties
    // chats is an array of objects 
    const { storedUser } = useUser();
    const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == storedUser.id));
    const displayedChats = chats.toSorted((a, b) => b.lastModified - a.lastModified);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // this chat is for the modal dialog context
    const [currChat, setCurrChat] = useState(null);
    const [error, setError] = useState("");

    function deleteChat(id) { 
        try {
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
        } catch {
            setError("Fail to delete the chat.");
        } finally {
            setIsModalOpen(false);
        }
    }

    function rename(id, title) {
        try {
            const chat = chats.find(chat => chat.id == id);
            chat.title = title;
            chat.lastModified = Date.now();
            setChats([...chats.filter(chat => chat.id != id), chat]); 
        } catch {
            setError("Fail to rename the chat.");
        }
    }

    function confirmDelete(chat) {
        setCurrChat(chat);
        setIsModalOpen(true);
    }

    function closeErrorModal() {
        setError("");
        setCurrChat(null);
    }

    return (
        <div id="chat-list">
            <h3>Your chats</h3>
            <ul>
                {displayedChats.map(chat => <ChatListItem chat={chat} key={chat.id} deleteChat={confirmDelete} rename={rename} />)}
            </ul>
            {currChat && isModalOpen &&
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h3>Do you want to delete this chat?</h3>
                    <p>{currChat.title}</p>
                    <button onClick={() => deleteChat(currChat.id)} className='delete-btn btn'>Delete</button>
                </Modal>
            }
            {
                error && 
                <Modal onClose={closeErrorModal} btnText='Close'>
                    <h3>Error</h3>
                    <p className='red-text'>{error}</p>
                </Modal>
            }
        </div>
    )
}