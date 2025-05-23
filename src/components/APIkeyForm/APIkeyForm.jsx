import { useState, useEffect } from "react";

export default function APIkeyForm() {
    // takes users api key and saves it into the local storage
    const [apiKey, setApiKey] = useState(null);
    const [ isStored, setIsStored ] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem("apiKey");
        if (storedKey) {
            setApiKey(storedKey);
            setIsStored(true);
        }
    }, [])
    
    function setKey() {
        localStorage.setItem("apiKey", apiKey);
        setIsStored(true);
    }

    return (
        <>
            <h1>Set your API key</h1>
            {isStored
            ? <p>API key is set.</p>
            : <div>
                <input type="password" 
                    name="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button onClick={setKey}>Set</button>
            </div>
            }
        </>
    )
}