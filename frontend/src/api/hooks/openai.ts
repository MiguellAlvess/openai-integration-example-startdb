import { useMutation } from '@tanstack/react-query'
import { OpenAiService } from '../services/openai'
import type { PromptInput } from '../services/types'

export const useAsk = () => {
  return useMutation({
    mutationKey: ['ask'],
    mutationFn: async (variables: PromptInput) => {
      return OpenAiService.ask(variables)
    },
  })
}
