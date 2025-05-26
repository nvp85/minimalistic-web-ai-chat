import { useState, useEffect } from "react";
import OpenAI from "openai";
import Markdown from 'react-markdown';
import ChatList from "../ChatList/ChatList";
import { Link, useNavigate, useParams } from 'react-router';
import MessageBubble from "../MessageBubble/MessageBubble";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import './ChatPage.css';
import chatsData from '../../assets/chats.json';
import messagesData from '../../assets/messages.json'
import { useUser } from "../../hooks/UserProvider";
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';
import sendMessage from "../../api/api";

// displays a side bar with the chat list and an individual chat on the right
// manages the chat
export default function ChatPage() {
	const {storedUser, saveUser, removeUser} = useUser();
	const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == storedUser.id));
	const [myApiKey, setMyApiKey] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const storedKey = localStorage.getItem("apiKey");
		if (storedKey) {
			setMyApiKey(storedKey);
		} else {
			navigate("/api-key");
		}
	}, []);

	// extracts uuid of the chat and fetch its messages from the backend
	const { id } = useParams();
	if (chats) {
		const chat = chats.find(chat => chat.id == id);
		if (!chat || storedUser.id != chat.userId) {
			setError("No chat was found.");
		}
	} else {
		setError("No chats were found.");
	}


	const [messages, setMessages, removeMessages] = useSyncLocalstorage(id, messagesData[id] || []);

	async function handleSubmit(userInput) {
		if (!myApiKey) {
			navigate("/api-key");
			return;
		}
		const convo = [
			...messages,
			{
				role: "user",
				content: userInput,
			}
		];
		setMessages(convo);
		setLoading(true);
		const response = await sendMessage(myApiKey, convo);
		setMessages([
			...convo, 
			{
				role:"assistant",
				content: response
			}
		]);
		setLoading(false);
	}
	if (error) {
		return (
			<div>
				<p className="red-text">{error}</p>
			</div>
		)
	}

	return (
		<div className="two-column-container">
			<div>
				<ChatList currentChatId={id} />
				<p><Link to="/">Start new chat</Link></p>
			</div>
			<div id="chat-container">
				<div id="chatbox">
					{messages.map((message, index) => <MessageBubble message={message} key={index} />)}
					{loading
						? <p>generating response...</p>
						: null
					}
				</div>
				<div id="chat-input-box">
                    <ChatTextarea handleClick={handleSubmit} />
				</div>
			</div>
		</div>
	)
}