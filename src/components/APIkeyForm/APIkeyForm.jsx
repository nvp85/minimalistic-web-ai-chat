import { useState, useEffect } from "react";
import { isAPIkeyValid } from "../../api/api";
import Modal from "../Modal/Modal";

export default function APIkeyForm() {
    // takes users api key and saves it into the local storage
    const [apiKey, setApiKey] = useState("");
    const [isStored, setIsStored] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const storedKey = localStorage.getItem("apiKey");
        if (storedKey) {
            setApiKey(storedKey);
            setIsStored(true);
        }
    }, [])

    function setKey() {
        if (!isAPIkeyValid(apiKey)) {
            setError("Please enter a valid API key.");
            return;
        }
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
            {
                error &&
                <Modal onClose={() => setError("")} btnText='Close'>
                    <h3>Error</h3>
                    <p className='red-text'>{error}</p>
                </Modal>
            }
        </>
    )
}