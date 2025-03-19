import axios from "axios";
import {useState} from "react";



interface Message{
    text: string;
    sender: "user"|"bot";
}

const useChatbot = () =>{
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    if (!API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in environment variables");
    }
    

    const [messages,setMessages] = useState<Message[]>([]);

    const sendMessage = async(message: string) => {
        const newMessages: Message[] = 
        [...messages,
            {text:message,sender:"user"},
        ];

        setMessages(newMessages);

        try{
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model:"gpt-4o-mini",
                    messages:[{
                        role:"user",
                        content:message,
                    }]
                },
                {
                    headers:{
                        Authorization:`Bearer ${API_KEY}`,
                        "Content-type": "application/json",
                    },
                }
            );
            const botMessage = response.data.choices[0].message.content;

            setMessages([...newMessages,{text:botMessage,sender:"bot"}])
        }catch(error){
            console.error("Error fetching AI response: ",error);
        }

    };
    return{messages,sendMessage}
};

export default useChatbot;