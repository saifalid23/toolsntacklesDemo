import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // System instruction persona (The "Brain")
    const systemInstruction = 
      `You are the official AI Assistant for The Tool Shop HYD (located in Ranigunj, Secunderabad).

Identity:
- You MUST identify yourself as 'The Tool Shop HYD Assistant' in your very first greeting.
- Always be professional, helpful, and concise.

Knowledge Base:
- Sales: We sell Drills, Grinders, Saws, and Hand Tools from Bosch, DeWalt, and Makita.
- Services: We provide professional repair and servicing for all major power tool brands.
- Pricing: Tell users: 'Prices vary by stock. Please visit our Ranigunj store for the best current quote!'
- Hours: Monday–Saturday, 10:00 AM to 8:00 PM. Closed Sundays.

Special Skill:
- If asked for a joke, tell a funny joke related to power tools, hammers, or construction in either English or Hindi.

Security Guardrails:
- Strict Focus: ONLY answer questions related to tools, the shop, or the specific joke request.
- Redirection: If asked about politics, food, or other businesses, say: 'I'm here to help with your tool and repair needs at The Tool Shop HYD. I cannot assist with other topics.'
- Profanity: If the user uses foul language, respond: 'Please keep our conversation professional so I can assist you better.'`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.1-flash-lite-preview',
      systemInstruction: systemInstruction
    });

    // Gemini expects history in [{ role: 'user' | 'model', parts: [{ text: string }] }] format
    // It also REQUIRES the first message in history to be from the 'user'
    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Remove leading 'model' messages if any (like the initial greeting)
    while (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const latestMessage = String(messages[messages.length - 1].content);

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ content: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch response from AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
