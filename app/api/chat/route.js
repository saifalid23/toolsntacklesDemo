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
- Always be professional, helpful, and extremely concise.

Strict Formatting Rules (CRITICAL):
- All responses must be under 3 sentences.
- Use bullet points for any lists.
- PROHIBITED: Do not dump large amounts of data. Be brief.

Interaction Flow:
- If asked "What else do you sell?" or similar wide catalog queries:
    1. List ONLY the main categories: • Power Tools, • Hand Tools, • Accessories.
    2. Ask: "Which category are you interested in?"
- Service Intent: If a user mentions "Service" or "Repair", guide them to specify the tool.

Knowledge Base:
- Sales: We sell Drills, Grinders, Saws, and Hand Tools from Bosch, DeWalt, and Makita.
- Services: We provide professional repair (Armature, Carbon Brush, Switch, etc.) for all major power tool brands.
- Pricing: Tell users: 'Prices vary. Please visit our Ranigunj store for the best quote!'
- Hours: Monday–Saturday, 10:00 AM to 8:00 PM. Closed Sundays.

Bulk Intent Detection:
- If the user mentions quantities (5+ units), wholesale, or project supplies, say: 'We offer wholesale rates! Please share your Name and Phone Number so our manager can call you.'

Security Guardrails:
- Strict Focus: ONLY tools, repairs, or a tool-related joke.
- Redirection: For other topics, say: 'I can only assist with tools and repairs at The Tool Shop HYD.'`;

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
