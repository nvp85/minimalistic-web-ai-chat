import OpenAI from "openai";

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