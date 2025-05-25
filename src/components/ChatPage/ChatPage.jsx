import { useState, useEffect } from "react";
import OpenAI from "openai";
import Markdown from 'react-markdown';
import ChatList from "../ChatList/ChatList";
import { Link, useNavigate, useParams } from 'react-router';
import MessageBubble from "../MessageBubble/MessageBubble";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import './ChatPage.css';
import chats from '../../assets/chats.json';
import messagesData from '../../assets/messages.json'
import { useUser } from "../../hooks/UserProvider";

// displays a side bar with the chat list and an individual chat on the right
// manages the chat
export default function ChatPage() {
	const {storedUser, saveUser, removeUser} = useUser();
	const [myApiKey, setMyApiKey] = useState("");
	const myModel = "gpt-4o-mini";
	const [loading, setLoading] = useState(false);
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

	const chat = chats.find(chat => chat.id == id);
	if (!chat || storedUser.id != chat.userId) {
		return (<p className="error">Error: No chat was found</p>)
	}

	const [messages, setMessages] = useState(messagesData[id] || []);

	useEffect(() => {
		const storedMessages = JSON.parse(localStorage.getItem(id));
		if (storedMessages) {
			setMessages(storedMessages);
		} 
	}, []);

	// if we have another tab with the app open and it changes the localStorage messages
	// it will be not noticed by the first tab
	useEffect(() => {
		localStorage.setItem(id, JSON.stringify(messages));
	}, [messages])

	const client = new OpenAI({ apiKey: myApiKey, dangerouslyAllowBrowser: true });
	async function sendMessage(userInput) {
		if (!myApiKey) {
			navigate("/api-key");
			return;
		}
		if (!userInput) {
			alert("input is empty");
			return;
		}
		setMessages(prev => [
			...prev, 
			{
				role: "user",
				content: userInput
			}
		]);

		setLoading(true);
		const completion = await client.chat.completions.create({
			model: myModel,
			messages: [
				...messages,
				{
					role: "user",
					content: userInput,
				},
			],
			max_tokens: 200
		});
		setMessages(prev => [
			...prev, 
			{
				role:"assistant",
				content: completion.choices[0].message.content
			}
		]);
		setLoading(false);
	}

	return (
		<div className="two-column-container">
			<div>
				<ChatList />
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
                    <ChatTextarea handleClick={sendMessage} />
				</div>
			</div>
		</div>
	)
}