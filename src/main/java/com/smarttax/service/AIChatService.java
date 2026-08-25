package com.smarttax.service;

import com.smarttax.entity.AIChat;
import com.smarttax.repository.AIChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class AIChatService {
    private final AIChatRepository aiChatRepository;

    public AIChat savChat(AIChat aiChat) {
        return aiChatRepository.save(aiChat);
    }
    public List<AIChat> finAllChats() {
        return aiChatRepository.findAll();
    }
}

