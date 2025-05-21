import { useState, useEffect } from "react";
import OpenAI from "openai";
import Markdown from 'react-markdown';
import ChatList from "./ChatList";
import fs from 'fs';

// displays a side bar with the chat list and an individual chat on the right
// manages the chat 
export default function ChatPage() {
  
  const myApiKey = "";
  
  const myModel = "gpt-4o-mini";
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const client = new OpenAI({apiKey: myApiKey, dangerouslyAllowBrowser: true});
  async function sendMessage(userInput) {
    setLoading(true);
    const completion = await client.chat.completions.create({
      model: myModel,
      messages: [
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
    <>
      <ChatList />
      <p>Messages go here</p>
      <div id="chat">
      <textarea name='userInput' value={userInput} onChange={(e) => setUserInput(e.target.value)}></textarea>
      <button onClick={() => sendMessage(userInput)}>send a request</button>
      {loading
      ? <p>generating response...</p>
      : <Markdown>{output}</Markdown>
      }
      </div>
    </>
  )
}