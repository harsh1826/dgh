import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const router = express.Router();

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// --- Load and Parse the Knowledge Base ---
const knowledgeBase = new Map<string, string>();
try {
  const filePath = path.join(process.cwd(), 'Health Chatbot Knowledge Base.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const topics = fileContent.split('---').filter(section => section.trim() !== '');

  for (const topic of topics) {
    const lines = topic.trim().split('\n');
    const titleLine = lines.find(line => line.startsWith('### 🧠'));
    if (titleLine) {
      const title = titleLine.replace('### 🧠', '').trim().toUpperCase();
      const content = lines.slice(1).join('\n').trim();
      knowledgeBase.set(title, content);
    }
  }
  console.log(`✅ Knowledge base loaded successfully with ${knowledgeBase.size} topics.`);
} catch (error) {
  console.error("❌ Could not load knowledge-base.txt. The chatbot will use general knowledge only.");
}

// --- A Simple Search Function ---
function searchKnowledgeBase(query: string): string | null {
  const queryUpper = query.toUpperCase();
  const greetings = ['HELLO', 'HI'];
  if (greetings.some(greeting => queryUpper.startsWith(greeting))) {
    return null;
  }
  for (const [title, content] of knowledgeBase.entries()) {
    if (queryUpper.includes(title)) {
      return content;
    }
  }
  return null;
}

// --- The Main Chat Endpoint ---
router.post('/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const contextFromKB = searchKnowledgeBase(message);
  let systemPrompt = '';

  if (contextFromKB) {
    console.log(`💡 Found context for "${message}" in knowledge base.`);
    // --- THIS PROMPT HAS BEEN MODIFIED ---
    systemPrompt = `
      You are a helpful health information assistant.
      The following is trusted information from a knowledge base. Use this as the primary source for your answer.
      You can enhance this information with your general knowledge to provide a more complete and helpful response.
      Maintain an empathetic tone and format your answer using markdown (headings, bold text, and bullet points).

      --- TRUSTED CONTEXT ---
      ${contextFromKB}
      --- END CONTEXT ---
    `;
  } else {
    console.log(`No context found for "${message}". Using general knowledge.`);
    systemPrompt = `
      You are a friendly and helpful assistant. For greetings like "hi" or "hello", respond warmly. For other questions, provide a concise answer using markdown where appropriate.
    `;
  }

  try {
    const completion = await openrouter.chat.completions.create({
      model: 'mistralai/mistral-b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });
    const botResponse = completion.choices[0]?.message?.content ?? "Sorry, I couldn't get a response.";
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error with OpenRouter API:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

export default router;