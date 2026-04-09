import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchKB } from '@/lib/knowledgeBase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple in-memory cache for common queries
const queryCache = {
  'where are you located?': 'We are located in Ranigunj, Secunderabad.',
  'what are your timings?': 'Monday to Saturday, 10:00 AM to 8:00 PM. Closed Sundays.',
  'do you provide repair services?': 'Yes, we provide professional repair for all major power tool brands, including armature replacement and carbon brush changes.',
};

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const latestMessage = String(messages[messages.length - 1].content).trim();
    const normalizedQuery = latestMessage.toLowerCase().replace(/[?]/g, '');

    // Step 1: Check In-Memory Cache
    if (queryCache[normalizedQuery]) {
      return new Response(JSON.stringify({ content: queryCache[normalizedQuery] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Check Knowledge Base (KB Lookup)
    const kbResult = searchKB(latestMessage);
    if (kbResult) {
      return new Response(JSON.stringify({ content: kbResult }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step 3: Call Gemini with Slimmed Prompt & Streaming
    const systemInstruction = 
      `You are the official AI Assistant for The Tool Shop HYD. 
      Identify yourself as 'The Tool Shop HYD Assistant' in your first greeting.
      Be concise (max 2-3 sentences). 
      Use bullet points for lists. 
      Limit your domain to tools, repairs, and shop-related info.
      
      KB CONTEXT: Use the knowledge base snippet if provided below. If not, use your general knowledge but redirect to the Ranigunj store for specifics.
      - Shop: Ranigunj, Secunderabad.
      - Hours: Mon-Sat 10AM-8PM.
      - Services: Armature, Carbon Brush, Switch, Gearbox, etc.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash', // Using a standard stable model
      systemInstruction: systemInstruction
    });

    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    while (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(latestMessage);

    // Create a ReadableStream for streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch response from AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
