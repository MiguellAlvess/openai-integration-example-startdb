import { useAsk } from '@/api/hooks/openai'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addAskSchema, type AddAskSchema } from '../schema/virtual-assistant'
import type { PromptResponse } from '@/api/services/types'

type AddPromptFormParams = {
  onSuccess?: (userMessage: string, response: PromptResponse) => void
  onError?: () => void
}

export const useAskVirtualAssistantForm = ({
  onSuccess,
  onError,
}: AddPromptFormParams) => {
  const { mutateAsync: addAsk } = useAsk()

  const form = useForm<AddAskSchema>({
    resolver: zodResolver(addAskSchema),
    defaultValues: {
      message: '',
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data: AddAskSchema) => {
    try {
      const userMessage = data.message
      const response = await addAsk(data)
      onSuccess?.(userMessage, response)
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, handleSubmit }
}
