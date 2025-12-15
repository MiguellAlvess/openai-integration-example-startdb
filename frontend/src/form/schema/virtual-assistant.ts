import z from 'zod'

export const addAskSchema = z.object({
  message: z.string().trim().min(1, {
    message: 'Envie uma pergunta pra nossa inteligência artificial!',
  }),
})

export type AddAskSchema = z.infer<typeof addAskSchema>
