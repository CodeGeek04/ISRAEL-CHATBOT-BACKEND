import { getChatGPTAPI } from '../src/chatgpt.js';

const api = await getChatGPTAPI();

export default async (req, res) => {
    // Check for the request method
    console.log(req);
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { text, parentMessageId } = req.body;

    try {
        const response = await api.sendMessage(text, { parentMessageId });
        res.json({
            answer: response.text,
            messageId: response.id,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        res.status(500).json({ error: errorMessage });
    }
};
