import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'API_KEY',
    dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(message) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],
        temperature:0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0

    });

    // Check if 'choices' array exists in the response
    if (response.choices && response.choices.length > 0) {
        // Access the completion from the first item in 'choices' array
        return response.choices[0].message.content;
    } else {
        throw new Error("No completion found in the response");
    }
}
