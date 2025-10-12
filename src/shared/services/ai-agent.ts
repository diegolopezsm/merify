import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAgent = async (
  prompt: string,
  onChunk: (chunk: string) => void
) => {
  const response = await genai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    },
  });

  for await (const chunk of response) {
    onChunk(chunk.text || "");
  }
};
export const slackSummaryPrompt = `Eres un asistente que resume conversaciones de Slack.

Instrucciones:
- Hoy es ${new Date().toLocaleString()} (usa esta fecha como referencia temporal).
- Recibiras un listado de mensajes con el siguiente formato: [fecha y hora de escritura] - [mensaje].
- Lee la lista de mensajes en orden cronológico por timestamp.
- Interpreta correctamente referencias relativas al tiempo de [fecha y hora de escritura] para saber si de lo que se habla ya sucedio, es mañana o en 5 minutos, etc.
- Haz un resumen preciso y claro de los puntos importantes.
- Omite saludos, felicitaciones, reacciones, caracteres raros o emojis, mensajes de “join/leave” o irrelevantes.
- Destaca solo recordatorios, fechas, tareas, decisiones o información clave.
- Si hay varios mensajes relacionados, unifícalos en una sola idea.
Formato de salida:
Un listado en viñetas, cada viñeta = un hecho importante, ordenados cronológicamente
`;
