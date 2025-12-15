import { useState } from 'react'
import type { PromptResponse } from './api/services/types'
import Header from './components/header'
import AskInput from './components/ask-input'

const VirtualAssistantPage = () => {
  const [messages, setMessages] = useState<string[]>([])

  const handleNewMessage = (
    userMessage: string,
    aiResponse: PromptResponse
  ) => {
    setMessages((prev) => [...prev, userMessage, aiResponse.message])
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => {
          const isUser = index % 2 === 0

          return (
            <div
              key={index}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-auto">
        <AskInput onNewMessage={handleNewMessage} />
      </div>
    </div>
  )
}

export default VirtualAssistantPage
