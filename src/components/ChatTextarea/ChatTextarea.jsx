import { useState } from "react";
import './ChatTextarea.css';


export default function ChatTextarea(props) {
    const handleClick = props.handleClick;
    const [userInput, setUserInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        handleClick(userInput);
        setUserInput("");
    }
    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <textarea
                id="chat-textarea"
                name='userInput'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask anything..."
                maxLength="1000"
                required>
            </textarea>
            <button type="submit">Send</button>
        </form>
    )
}