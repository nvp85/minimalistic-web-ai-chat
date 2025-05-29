import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ChatList from "../ChatList/ChatList";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import { useUser } from '../../hooks/useUser';
import sendMessage from '../../api/api';
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';
import './HomePage.css';
import chatsData from '../../assets/chats.json';
import Modal from '../Modal/Modal';


export default function HomePage() {
    // dispays the side bar with the list of chats on the left side
    // and a chat starter form on the right side
    // when user starts a new chat it navigates the user to an individual chat route
    const manageUser = useUser();
    const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == manageUser.currentUser.id)); 
    const [myApiKey, setMyApiKey] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
		const storedKey = localStorage.getItem("apiKey");
		if (storedKey) {
			setMyApiKey(storedKey);
		} 
	}, []);

    async function startNewChat(userInput) {
        if (!myApiKey) {
            setError("Can't send a message. Please set an API key.");
            return;
        }
        const chatId = crypto.randomUUID();
        const instructionMessage = {
            role: "developer",
            content: "Be succinct. Answer in 3-5 sentences."
        };
        // TODO: validate the first message
        const firstMessage = {
            role: "user",
            content: userInput
        };
        // TODO: generate a title (probably as a separate convo)
        // untitled chat for now
        const convo = [instructionMessage, firstMessage];
        const chat = {
            id: chatId,
            userId: manageUser.currentUser.id,
            title: "untitled",
            lastModified: Date.now()
        };
        // the new chat goes to local storage
        setChats([...chats, chat]);

        // sets the value before navigating - it will be available on the chat page
        // and it will subscribe to its changes
        localStorage.setItem(chat.id, JSON.stringify(convo));
        navigate(`chats/${chatId}`, {state: {generating: true}});

        // TODO: what if the response is not successful?
        const response = await sendMessage(myApiKey, convo);
        convo.push({
            role: "assistant",
            content: response
        });
        localStorage.setItem(chat.id, JSON.stringify(convo));
        // has to dispatch the event to notify the chat page about the new messages
        window.dispatchEvent(new StorageEvent('storage', {key: chatId, newValue: JSON.stringify(convo)}));
    }

    return (
        <div className="two-column-container"> 
            <div>
                <ChatList chats={chats} />            
            </div>
            <div id="right-column">
                <ChatTextarea handleClick={startNewChat} />
                {
                    error && 
                    <Modal onClose={() => setError("")} btnText='Close'>
                        <h3>Error</h3>
                        <p className='red-text'>{error}</p>
                        {!myApiKey && error.includes("API") && <p><Link to="/api-key">Set API key</Link></p>}
                    </Modal>
				}
            </div>
        </div>
    )
}