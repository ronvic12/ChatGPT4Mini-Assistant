const express = require('express');
const router = express.Router();
var OpenAI = require("openai");
require('dotenv').config();

const API_KEY = process.env.OPEN_API_KEY;
if (!API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in environment variables");
}
var openai = new OpenAI({
    apiKey: API_KEY
});


router.post('/chat',async(req, res, next)=>{
    console.log("Here in router post request");
    console.log("Body request ",req.body);
    const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try{
    const response = await openai.chat.completions.create({
        messages:[{role:"user", content:message}],
        model: "gpt-4o-mini",
        store: true // lets store this as true for now, it will be helpful later
    })

    const botMessage = response.choices[0].message.content;
    res.json({ botMessage }); // Returning bot's response
  }catch(error){

    console.error("Error fetching AI response:", error);
    res.status(500).json({ error: "Error communicating with OpenAI API" });
 
  }
})


module.exports = { router };

