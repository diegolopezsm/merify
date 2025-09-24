import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
  // apiKey: process.env.GOOGLE_API_KEY,
  apiKey: "AIzaSyC5k783TZj1S08_FAJS9__cHjwLhm8a4kA",
});

export const askAgent = async (
  prompt: string,
  onChunk: (chunk: string) => void
) => {
  console.log("prompt", prompt);
  const response = await genai.models.generateContentStream({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  for await (const chunk of response) {
    onChunk(chunk.text || "");
  }
};

export const slackSummaryPrompt = `Eres un asistente que resume conversaciones de Slack.
Instrucciones:
- Lee la lista de mensajes en orden cronológico por timestamp.
- Haz un resumen preciso y claro de los puntos importantes.
- Omite saludos, felicitaciones, reacciones, mensajes de “join/leave” o irrelevantes.
- Destaca solo recordatorios, fechas, tareas, decisiones o información clave.
- Si hay varios mensajes relacionados, unifícalos en una sola idea.

Formato de salida:
Un listado en viñetas, cada viñeta = un hecho importante, ordenados cronológicamente por timestamp, con la siguiente estructura:
- timestamp(yyyy-mm-dd hh:mm:ss)- [mensaje]
`;
