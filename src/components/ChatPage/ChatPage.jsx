import { useState, useEffect, useRef } from "react";
import ChatList from "../ChatList/ChatList";
import { Link, useNavigate, useParams, useLocation } from 'react-router';
import MessageBubble from "../MessageBubble/MessageBubble";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import './ChatPage.css';
import chatsData from '../../assets/chats.json';
import messagesData from '../../assets/messages.json'
import { useUser } from "../../hooks/UserProvider";
import useSyncLocalstorage from '../../hooks/useSyncLocalstorage';
import sendMessage from "../../api/api";
import { PiSpinnerGap } from "react-icons/pi";
import Modal from '../Modal/Modal';
import NotFound from "../NotFound";

// displays a side bar with the chat list and an individual chat on the right
// manages the chat
export default function ChatPage() {
	const { storedUser } = useUser();
	const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == storedUser.id));
	const [myApiKey, setMyApiKey] = useState("");
	const location = useLocation();
	const [loading, setLoading] = useState(location.state ? location.state.generating : false);
	const [error, setError] = useState("");
	const chatBottom = useRef();
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
	const [messages, setMessages, removeMessages] = useSyncLocalstorage(id, messagesData[id] || []);
	try {
		const chat = chats.find(chat => chat.id == id);
		if (!chat || storedUser.id != chat.userId) {
			throw new Error("No chat was found.");
		}
	} catch {
		return <NotFound />
	}

	if (messages.at(-1).role === "assistant" && loading) {
		setLoading(false);
	}

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
		try {
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
		} catch {
			setError("Something went wrong. Response wasn't generated.");
		} finally {
			setLoading(false);
		}		
	}
	// scroll to the bottom of the chat
	useEffect(() => {
		chatBottom.current.scrollIntoView({behavior: 'smooth'});
	}, [loading]);

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
						&& <p>generating response <PiSpinnerGap className="spinner"/></p>}
					{
						error && 
						<Modal onClose={() => setError("")} btnText='Close'>
							<h3>Error</h3>
							<p className='red-text'>{error}</p>
						</Modal>
					}
					<div ref={chatBottom} />
				</div>
				<div id="chat-input-box">
                    <ChatTextarea handleClick={handleSubmit} />
				</div>
			</div>
		</div>
	)
}