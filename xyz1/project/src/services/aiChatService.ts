// AI Chat Service for CuraMind Health Chatbot
// Multiple integration options for web-based AI

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  message: string;
  confidence: number;
}

// Option 1: OpenAI API Integration (Recommended)
export class OpenAIChatService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(messages: ChatMessage[], userMessage: string): Promise<AIResponse> {
    const healthPrompt = `You are CuraMind's health assistant. Answer health questions in no more than 80 words. 
    Provide helpful, evidence-based information but always remind users to consult healthcare professionals for medical advice.`;

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: healthPrompt },
            ...messages,
            { role: 'user', content: userMessage }
          ],
          max_tokens: 120,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return {
        message: data.choices[0].message.content,
        confidence: 0.9
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

// Option 2: Hugging Face Transformers.js (Runs in Browser)
export class LocalAIChatService {
  private pipeline: any;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Dynamic import to avoid build issues
      const { pipeline } = await import('@xenova/transformers');
      this.pipeline = await pipeline('text-generation', 'Xenova/gpt2');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize local AI:', error);
      throw new Error('Local AI initialization failed');
    }
  }

  async generateResponse(messages: ChatMessage[], userMessage: string): Promise<AIResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const healthContext = `Health Assistant: Answer this health question briefly and safely: ${userMessage}`;
    
    try {
      const result = await this.pipeline(healthContext, {
        max_length: 100,
        temperature: 0.7,
        do_sample: true,
      });

      return {
        message: result[0].generated_text.replace(healthContext, '').trim(),
        confidence: 0.8
      };
    } catch (error) {
      console.error('Local AI Error:', error);
      throw new Error('Failed to generate local AI response');
    }
  }
}

// Option 3: Ollama Web API (If you run Ollama locally)
export class OllamaWebService {
  private baseURL: string;

  constructor(baseURL = 'http://localhost:11434') {
    this.baseURL = baseURL;
  }

  async generateResponse(messages: ChatMessage[], userMessage: string): Promise<AIResponse> {
    const healthPrompt = `You are a helpful health assistant. Answer the question below in no more than 80 words.

Here is the conversation history: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}

Question: ${userMessage}

Answer:`;

    try {
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma2:2b',
          prompt: healthPrompt,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 120,
          }
        }),
      });

      const data = await response.json();
      return {
        message: data.response,
        confidence: 0.85
      };
    } catch (error) {
      console.error('Ollama API Error:', error);
      throw new Error('Failed to connect to Ollama');
    }
  }
}

// Option 4: Google Gemini API
export class GeminiChatService {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(messages: ChatMessage[], userMessage: string): Promise<AIResponse> {
    const healthPrompt = `You are CuraMind's health assistant. Provide helpful health information in 80 words or less. Always recommend consulting healthcare professionals.`;

    try {
      const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${healthPrompt}\n\nUser: ${userMessage}\n\nAssistant:`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 120,
            temperature: 0.7,
          }
        }),
      });

      const data = await response.json();
      return {
        message: data.candidates[0].content.parts[0].text,
        confidence: 0.9
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate Gemini response');
    }
  }
}

// Smart Health Response Patterns (Fallback)
export class SmartHealthResponses {
  private healthPatterns = {
    pain: [
      "For pain management, consider rest, ice/heat therapy, and appropriate pain relievers. Consult a healthcare provider if pain persists or worsens.",
      "Pain can have many causes. Try gentle stretching, proper posture, and stress reduction. See a doctor for persistent or severe pain.",
    ],
    diet: [
      "A balanced diet with fruits, vegetables, whole grains, and lean proteins supports good health. Stay hydrated and limit processed foods.",
      "Focus on nutrient-dense foods, portion control, and regular meal timing. Consider consulting a registered dietitian for personalized advice.",
    ],
    exercise: [
      "Aim for 150 minutes of moderate aerobic activity weekly plus strength training. Start slowly and gradually increase intensity.",
      "Regular physical activity improves cardiovascular health, mood, and energy. Choose activities you enjoy for better adherence.",
    ],
    sleep: [
      "Good sleep hygiene includes 7-9 hours nightly, consistent schedule, comfortable environment, and avoiding screens before bed.",
      "Quality sleep is essential for health. Create a relaxing bedtime routine and address any persistent sleep issues with a healthcare provider.",
    ],
    stress: [
      "Manage stress through deep breathing, meditation, regular exercise, and social support. Chronic stress can impact physical health.",
      "Stress reduction techniques include mindfulness, time management, and healthy coping strategies. Consider counseling for ongoing stress.",
    ],
  };

  generateResponse(userMessage: string): AIResponse {
    const message = userMessage.toLowerCase();
    
    for (const [category, responses] of Object.entries(this.healthPatterns)) {
      if (message.includes(category)) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return {
          message: randomResponse,
          confidence: 0.7
        };
      }
    }

    // Default health response
    return {
      message: "I understand your health question. For specific medical concerns, please consult with a healthcare professional who can provide personalized advice based on your individual situation.",
      confidence: 0.6
    };
  }
}

// Main AI Service Factory
export class AIChatServiceFactory {
  static createService(type: 'openai' | 'local' | 'ollama' | 'gemini' | 'smart', config?: any) {
    switch (type) {
      case 'openai':
        return new OpenAIChatService(config.apiKey);
      case 'local':
        return new LocalAIChatService();
      case 'ollama':
        return new OllamaWebService(config.baseURL);
      case 'gemini':
        return new GeminiChatService(config.apiKey);
      case 'smart':
      default:
        return new SmartHealthResponses();
    }
  }
}