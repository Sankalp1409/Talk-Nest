package com.chatApplication.chat_application.entities;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message {
    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.time=LocalDateTime.now();
    }

    private String sender;
    private String content;
    private LocalDateTime time;
}
