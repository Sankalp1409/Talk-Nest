import React, { useState } from "react";
import { createRoomRequest, joinChatApi } from "../service/RoomService";
import toast from "react-hot-toast";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

export const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { roomId, userName, connect, setRoomId, setCurrentUser, setConnect } =
    useChatContext();

  const navigate = useNavigate("");
  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.userName !== "" && detail.roomId !== "") {
      return true;
    }
    toast.error("Invalid Input!!");
    return false;
  }
  async function joinChat() {
    if (validateForm()) {
      try {
        const response = await joinChatApi(detail.roomId);
        toast.success("Room Joined");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnect(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) toast.error(error.response.data);
        else toast.error("Error in joining room");
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomRequest(detail.roomId);
        console.log(response);
        toast.success("Room Created Successfully");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnect(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) toast.error("Room aleady exist's");
        else {
          toast.error("Error in Creating room");
        }
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{ backgroundColor: "#fcf5eb" }}
    >
      <div className="p-10 bg-white border border-black rounded-lg  sm:p-6 md:p-8  dark:border-gray-700  w-full flex flex-col gap-5 max-w-md  dark:bg-gray-900 shadow">
        <div></div>

        <h1 className="text-2xl font-semibold text-center ">
          Join Room / Create Room
        </h1>
        {/* name div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter the name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* room id div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.roomId}
            name="roomId"
            type="text"
            id="roomId"
            placeholder="Enter the room id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* button  */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={joinChat}
            className="px-3 py-2 w-full text-black bg-blue-700   rounded-full"
            style={{ backgroundColor: "#25d366" }}
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 w-full text-black  rounded-full"
            style={{ backgroundColor: "#25d366" }}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};
