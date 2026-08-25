package com.smarttax.controller;

import com.smarttax.entity.AIChat;
import com.smarttax.service.AIChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai-chat")

public class AIChatController {

    private final AIChatService aiChatService;

    @PostMapping
    public AIChat saveChat(@RequestBody AIChat aiChat) {
        return  aiChatService.savChat(aiChat);
    }
    @GetMapping
    public List<AIChat> findAllChats() {
        return aiChatService.finAllChats();
    }


}
