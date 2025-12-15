package br.com.db.openai_integration.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.db.openai_integration.dto.OpenAiRequest;
import br.com.db.openai_integration.dto.OpenAiResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/virtual-assistant")
@RequiredArgsConstructor
public class OpenAiController {

    private final ChatClient chatClient;
    private static final String CHAT_MEMORY_SESSION_KEY = "chatMemory";

    @PostMapping
    public OpenAiResponse handleChatPrompt(
            @RequestBody OpenAiRequest request,
            HttpSession session) {
        ChatMemory chatMemory = (ChatMemory) session.getAttribute(CHAT_MEMORY_SESSION_KEY);
        if (chatMemory == null) {
            chatMemory = MessageWindowChatMemory.builder().build();
            session.setAttribute(CHAT_MEMORY_SESSION_KEY, chatMemory);
        }
        String userMessage = request.getMessage();
        String aiResponse = chatClient
                .prompt()
                .user(userMessage)
                .advisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .call()
                .content();
        return new OpenAiResponse(aiResponse);
    }
}
