import { Loader2Icon, SendHorizonal } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useAskVirtualAssistantForm } from '@/form/hook/virtual-assistant'
import type { PromptResponse } from '@/api/services/types'
import SugestionsButtons from './sugestions-buttons'

type ChatInputProps = {
  onNewMessage: (userMessage: string, aiResponse: PromptResponse) => void
}

const AskInput = ({ onNewMessage }: ChatInputProps) => {
  const { form, handleSubmit } = useAskVirtualAssistantForm({
    onSuccess: (userMessage, response) => {
      toast.success('Mensagem enviada para o assistente')
      onNewMessage(userMessage, response)
      form.reset()
    },
    onError: () => {
      toast.error('Erro ao enviar mensagem para o assistente')
    },
  })

  const handleSuggestionClick = (message: string) => {
    form.setValue('message', message, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.handleSubmit(handleSubmit)()
  }

  return (
    <div className="space-y-2 border-t bg-background px-4 py-3">
      <SugestionsButtons onSelect={handleSuggestionClick} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Faça uma pergunta sobre sustentabilidade e reciclagem..."
                    className="h-12 w-full px-4 text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="icon"
            className="h-12 w-12"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2Icon className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizonal className="h-5 w-5" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AskInput
