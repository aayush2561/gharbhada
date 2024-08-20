const axios = require('axios');
require('dotenv').config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  console.error('HUGGINGFACE_API_KEY is not defined');
  process.exit(1);
}

function generateRoomRentalPrompt(userPrompt) {
  return `
    You are an expert in room rentals and property management. 
    Provide answers and advice from the perspective of a room rental site owner. 
    Here is the user's question: "${userPrompt}"
  `;
}

async function getRoomRentalAdvice(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  const roomRentalPrompt = generateRoomRentalPrompt(prompt);

  const response = await axios.post(process.env.HUGGINGFACE_API
    ,
    { inputs: roomRentalPrompt },
    {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const responseData = response.data[0]?.generated_text || '';
  const cleanedResponse = responseData
    .replace(new RegExp(`^${escapeRegExp(roomRentalPrompt)}`, 'm'), '')
    .trim();
    
  res.json({ text: cleanedResponse });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { getRoomRentalAdvice };
