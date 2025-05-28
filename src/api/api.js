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