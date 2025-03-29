import axios from "axios";
import {useState} from "react";
//import OpenAI from "openai";

interface Message{
    text: string;
    sender: "user"|"bot";
}

const useChatbot = () =>{
    
    const [messages,setMessages] = useState<Message[]>([]);

    const sendMessage = async(message: string) => {
        console.log('Hey terminal! A message from the browser');
        console.log("Sending message:", message); // Check if this is logged
        const newMessages: Message[] = 
        [...messages,
            {text:message,sender:"user"},
        ];

        setMessages(newMessages);

        try{
            const response = await axios.post("/api/chat",{message});
            const botMessage = response.data.botMessage;
            setMessages([...newMessages,{text:botMessage,sender:"bot"}])
        }catch(error){
            console.error("Error fetching AI response: ",error);
        }

    };
    return{messages,sendMessage}
};

export default useChatbot;