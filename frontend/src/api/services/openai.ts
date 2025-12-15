import { api } from '@/lib/axios'
import type { PromptInput, PromptResponse } from './types'

export const OpenAiService = {
  ask: async (input: PromptInput): Promise<PromptResponse> => {
    const response = await api.post('/openai', input)
    return response.data
  },
}
