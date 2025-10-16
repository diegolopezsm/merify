import { CreateMLCEngine, type InitProgressReport } from '@mlc-ai/web-llm';

export const models = {
  '579_MB': 'SmolLM2-360M-Instruct-q4f32_1-MLC',
  '719_MB': 'SmolLM2-7B-Instruct-q4f32_1-MLC',
  '1.8_GB': 'gemma-2-2b-it-q4f16_1-MLC',
  '1.1_GB': 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
};

export const createLlmEngine = async (
  loadCallback: (progress: InitProgressReport) => void
) => {
  const model = await CreateMLCEngine('Llama-3.1-8B-Instruct-q4f32_1-MLC-1k', {
    initProgressCallback: progress => {
      loadCallback(progress);
    },
  });
  return model;
};
