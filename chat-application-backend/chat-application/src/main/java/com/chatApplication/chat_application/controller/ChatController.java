package com.chatApplication.chat_application.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.chatApplication.chat_application.entities.Message;
import com.chatApplication.chat_application.entities.Room;
import com.chatApplication.chat_application.payload.MessageRequest;
import com.chatApplication.chat_application.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    @Autowired
    private RoomRepository roomRepository;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {

        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message msg = new Message();
        msg.setContent(request.getContent());
        msg.setSender(request.getSender());
        msg.setTime(LocalDateTime.now());
        if (room != null) {
            room.getMessages().add(msg);
            roomRepository.save(room);
        }
        return msg;
    }

}
