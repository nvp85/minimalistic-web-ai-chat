import { useState } from "react";
import './ChatTextarea.css';


export default function ChatTextarea(props) {
    const handleClick = props.handleClick;
    const [userInput, setUserInput] = useState("");

    return (
        <div className="input-container">
            <textarea
                id="chat-textarea"
                name='userInput'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask anything...">
            </textarea>
            <button onClick={() => handleClick(userInput)}>Send</button>
        </div>
    )
}