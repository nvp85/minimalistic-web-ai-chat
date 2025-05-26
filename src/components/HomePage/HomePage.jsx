import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ChatList from "../ChatList/ChatList";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import { useUser } from "../../hooks/UserProvider";
import sendMessage from '../../api/api';
import './HomePage.css';
import chatsData from '../../assets/chats.json';


export default function HomePage() {
    // dispays the side bar with the list of chats on the left side
    // and a chat starter form on the right side
    // when user starts a new chat it navigates the user to an individual chat route
    // sets the chat to the local storage

    // we should create a uuid, send the message, 
    // receive response, place it to local storage and navigate to the chat page
    const manageUser = useUser();
    const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chats")) || 
        chatsData.filter(chat => chat.userId == manageUser.storedUser.id));
    const [myApiKey, setMyApiKey] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
		const storedKey = localStorage.getItem("apiKey");
		if (storedKey) {
			setMyApiKey(storedKey);
		} else {
			navigate("/api-key");
		}
	}, []);

    async function startNewChat(userInput) {
        const chatId = crypto.randomUUID();
        const instructionMessage = {
            role: "developer",
            content: "Be succinct. Answer in 3-5 sentences."
        };
        // validate the first message
        const firstMessage = {
            role: "user",
            content: userInput
        };
        // generate a title (probably as a separate convo)
        // untitled chat for now
        const convo = [instructionMessage, firstMessage];
        const chat = {
            id: chatId,
            userId: manageUser.storedUser.id,
            title: "untitled",
            lastModified: Date.now()
        };
        // the new chat goes to local storage
        // or maybe better to store chats by the userId key?
        setChats(prev => [...prev, chat]);
        localStorage.setItem(chat.id, JSON.stringify(convo));
        navigate(`chats/${chatId}`);
        const response = await sendMessage(myApiKey, convo);
        convo.push({
            role: "assistant",
            content: response
        });
        localStorage.setItem(chat.id, JSON.stringify(convo));
    }

    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats));
    }, [chats]);

    return (
        <div className="two-column-container"> 
            <div>
                <ChatList chats={chats} />            
            </div>
            <div id="right-column">

                <ChatTextarea handleClick={startNewChat} />
            </div>
        </div>
    )
}