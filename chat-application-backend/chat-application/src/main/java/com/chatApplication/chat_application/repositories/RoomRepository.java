package com.chatApplication.chat_application.repositories;

import com.chatApplication.chat_application.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room,String> {

//    get room using roomId;
    Room findByRoomId(String roomId);

}
