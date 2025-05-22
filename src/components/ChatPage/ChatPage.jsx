import { useState, useEffect } from "react";
import OpenAI from "openai";
import Markdown from 'react-markdown';
import ChatList from "../ChatList/ChatList";
import { Link } from 'react-router';
import MessageBubble from "../MessageBubble/MessageBubble";
import './ChatPage.css';

// displays a side bar with the chat list and an individual chat on the right
// manages the chat 
export default function ChatPage() {
  const myApiKey = "";
  const myModel = "gpt-4o-mini";
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // extracts uuid of the chat and fetch its messages from the backend
  // dummy messages
  const messages = [
    {
    "role": "developer",
    "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Hello!"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you?"
    },
    {
      "role": "user",
      "content": "Tell me one fun fact about cats."
    },
    {
      "role": "assistant",
      "content": "A fun fact about cats is that their nose prints are unique, just like human fingerprints. This makes each cat's nose pattern unique and helps with identification. Another fun fact is that cats can make over 100 different vocalizations, while dogs typically only have about 10."
    },

  ]

  const client = new OpenAI({apiKey: myApiKey, dangerouslyAllowBrowser: true});
  async function sendMessage(userInput) {
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
    setOutput(completion.choices[0].message.content);
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
          {messages.map(message => <MessageBubble message={message}/>)}
        {loading
        ? <p>generating response...</p>
        : <Markdown>{output}</Markdown>
        }
        </div>
        <div id="chat-input-box">
          <div id="chat-input-field">
            <textarea 
              name='userInput' 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)}>
                Ask anything...
            </textarea>
          </div>
          <button onClick={() => sendMessage(userInput)}>send a request</button>
        </div>
      </div>
    </div>
  )
}