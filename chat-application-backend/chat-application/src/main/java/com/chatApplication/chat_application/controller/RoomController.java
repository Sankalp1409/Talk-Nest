package com.chatApplication.chat_application.controller;

import com.chatApplication.chat_application.entities.Message;
import com.chatApplication.chat_application.entities.Room;
import com.chatApplication.chat_application.repositories.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // create room

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        if (roomRepository.findByRoomId(roomId) == null) {
            Room room = new Room();
            room.setRoomId(roomId);
            roomRepository.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(room);
        } else {
            return ResponseEntity.badRequest().body("Room Already exist..");
        }
    }
    // get room

    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null)
            return ResponseEntity.badRequest().body("Room not found!!");
        else
            return ResponseEntity.ok(room);
    }
    // get messages from room

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null)
            return ResponseEntity.badRequest().build();
        else {
            List<Message> messages = room.getMessages();
            return ResponseEntity.ok(messages);
        }
    }

}
