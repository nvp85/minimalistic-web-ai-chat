

// TODO: check if the convo contains less tokens than the models context window size
export default async function sendMessage(key=null, messages) {
    const response = await fetch('/.netlify/functions/proxy', {
        method: 'POST',
        body: JSON.stringify(messages)
      });
    if (response.statusCode == 500) {
        throw new Error(result);
    }
    const result = await response.json();
    return result;
}

export async function generateTitle(key=null, text) {
    const prompt = [
        {
            role: "developer",
            content: "Generate a title for the user's text. No more than 5 words."
        },
        {
            role: "user",
            content: text
        }
    ];
    const title = await sendMessage(key, prompt);
    return title;
}

export function isAPIkeyValid(key) {
    // found the regexp on the internet
    const OPENAI_API_KEY_REGEX = /^sk-(?:proj-)?[A-Za-z0-9_-]{20,}T3BlbkFJ[A-Za-z0-9_-]{20,}$/;
    if (OPENAI_API_KEY_REGEX.test(key)) {
        return true;
    }
    return false;
}