import OpenAI from "openai";


// TODO: check if the convo contains less tokens than the models context window size
export default async function sendMessage(key, messages) {
    const client = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 200
    });
    const response = completion.choices[0].message.content;
    return response;
}

export function isAPIkeyValid(key) {
    // found the regexp on the internet
    const OPENAI_API_KEY_REGEX = /^sk-(?:proj-)?[A-Za-z0-9_-]{20,}T3BlbkFJ[A-Za-z0-9_-]{20,}$/;
    if (OPENAI_API_KEY_REGEX.test(key)) {
        return true;
    }
    return false;
}