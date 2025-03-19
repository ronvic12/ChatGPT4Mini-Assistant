# AI Chatbot 🤖
Meet Assistant! A simple AI chatbot built using React + Vite and powered by ChatGPT-4. This project allows users to interact with an AI assistant in real-time.

Demo with Assistant:

## Intro of ChatBot
![Intro of ChatBot](assets/GIF/ChatBot(Intro).gif)

This is an introduction to the chatbot.

## Philippines Travel Itinerary with Assistant
![Philippines Travel Itinerary with Assistant](assets/GIF/ChatBot-Question.gif)

Here is the Philippines travel itinerary demonstration.

🚀 Features
- ✅ Responsive chat interface
- ✅ AI-powered responses using OpenAI GPT-4 API
- ✅ Built with React and Vite for fast performance
- ✅ Lightweight and easy to customize




## Chatbot with OpenAI Integration
This React hook (`useChatbot`) manages the chat messages, sends user input to OpenAI's GPT-4 model, and updates the UI with responses.

```tsx
interface Message {
    text: string;
    sender: "user" | "bot";
}
const useChatbot = () => {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    if (!API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in environment variables");
    }

    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        const newMessages: Message[] = [
            ...messages,
            {text: message, sender: "user"},
        ];

        setMessages(newMessages);

    try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4o-mini",
                    messages: [{
                        role: "user",
                        content: message,
                    }]
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-type": "application/json",
                    },
                }
            );
            const botMessage = response.data.choices[0].message.content;
            setMessages([...newMessages, {text: botMessage, sender: "bot"}]);
        } catch (error) {
            console.error("Error fetching AI response: ", error);
        }
    };

    return { messages, sendMessage };
};
```