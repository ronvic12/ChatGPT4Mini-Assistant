import * as React from 'react'
import { LuBot, LuSendHorizontal } from 'react-icons/lu';
import useChatbot from '../hooks/useChatbot';
import Markdown from 'react-markdown';
import useChatScroll from '../hooks/useChatScroll';

interface IChatComponentProps{}

const ChatComponent: React.FunctionComponent<IChatComponentProps> = () => {
    const [input,setInput] = React.useState("");
    const {messages,sendMessage} = useChatbot();
    const ref = useChatScroll(messages);
    const handleSend = () =>{

        if(input.trim()){
            sendMessage(input);
            setInput("");
        }
    };
  //   React.useEffect(() => {
  //     console.log("Messages updated:", messages); // Log the messages after each update
  // }, [messages]); // This will run whenever the messages array changes


    return (
        <div className="flex flex-col h-[80vh] bg-white">
        <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2">
          React + OpenAI Chatbot <LuBot size={25} />
        </h2>
      {/* Chat content should take up available space */}
        <div ref = {ref} className="flex-1 overflow-y-auto p-4 space-y-2"> 
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
                "p-3 rounded-lg max-w-lg " +
                (msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800")    }
          >
              <Markdown>{msg.text}</Markdown>       
          </div>
        ))}

        </div>

        {/* Input field for user messages */}
        <div className="flex items-center p-4 bg-gray-50">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Your message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="p-2">
            <LuSendHorizontal size={25} />
          </button>
        </div>
      </div>

    
    );
}

export default ChatComponent;