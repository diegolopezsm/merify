import {
  CreateMLCEngine,
  MLCEngine,
  type InitProgressReport,
} from '@mlc-ai/web-llm';

export const models = {
  '579_MB': 'SmolLM2-360M-Instruct-q4f32_1-MLC',
  '719_MB': 'SmolLM2-7B-Instruct-q4f32_1-MLC',
  '1.1_GB': 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
  '1.8_GB': 'gemma-2-2b-it-q4f16_1-MLC',
  '5_GB': 'Llama-3.1-8B-Instruct-q4f32_1-MLC-1k',
};

let model: MLCEngine;

export const createLlmEngine = async (
  // eslint-disable-next-line no-unused-vars
  loadCallback?: (progress: InitProgressReport) => void
) => {
  model = await CreateMLCEngine(models['5_GB'], {
    initProgressCallback: progress => {
      loadCallback?.(progress);
    },
  });
  return model;
};

export const getLlmEngine = async () => {
  return await createLlmEngine();
};

export const aksLlmEngine = async (
  prompt: string,
  // eslint-disable-next-line no-unused-vars
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const model = await getLlmEngine();
  if (!model) return '';
  let message = '';
  const response = await model.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream: true,
  });
  for await (const chunk of response) {
    message += chunk.choices[0]?.delta?.content || '';
    onChunk?.(message);
  }
  return message;
};
