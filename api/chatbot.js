import { getChatGPTAPI } from '../src/chatgpt.js';

const api = await getChatGPTAPI();

export default async (req, res) => {
    // Check for the request method
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your frontend domain
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    console.log(req.body);

    try{
        const { text, parentMessageId } = req.body;
        if (!parentMessageId) {
            const response = await api.sendMessage(text);
            res.json({
                answer: response.text,
                messageId: response.id,
            });
            console.log(`[server]: ${text} -> ${response.text}`);
        } else{
            const response = await api.sendMessage(text, { parentMessageId });
            res.json({
                answer: response.text,
                messageId: response.id,
            });
            console.log(`[server]: ${text} -> ${response.text}`);
        }
    }
    catch (error) {
        console.error("error: ", error);
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        res.status(500).json({ error: errorMessage });
    }
};
