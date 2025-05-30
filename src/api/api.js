

// TODO: check if the convo contains less tokens than the models context window size
export default async function sendMessage(messages) {
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

export async function generateTitle(text) {
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
    const title = await sendMessage(prompt);
    return title;
}
