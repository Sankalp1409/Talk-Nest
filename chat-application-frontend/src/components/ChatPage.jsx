import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessage } from "../service/RoomService";
import { timeAgo } from "../config/Helper";
import "../styles/ChatPage.css";
import myImage from "../assets/chatBackground.jpg";
export const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connect,
    setRoomId,
    setCurrentUser,
    setConnect,
  } = useChatContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (connect == false) navigate("/");
  }, [roomId, currentUser, connect]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scroll({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    async function loadMessage() {
      try {
        const msg = await getMessage(roomId);
        console.log(msg);
        setMessage(msg);
      } catch (error) {}
    }
    if (connect) loadMessage();
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);

      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        // console.log("Hello");
        // toast.success("connecteds");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          // console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessage((prev) => [...prev, newMessage]);
        });
      });
    };
    if (connect) connectWebSocket();
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient != null && connect && input.trim() !== "") {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  const handleLogout = () => {
    stompClient.disconnect();
    setConnect(false);
    toast.success("Disconnected...");
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSending) {
      setIsSending(true);
      sendMessage();
      setTimeout(() => setIsSending(false), 300); // Debounce duration
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#fcf5eb" }}
    >
      <div
        className="w-full py-5 shadow flex justify-around items-center"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <div>
          <h1 className="font-bold text-black text-2xl">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        <div>
          <h1 className="font-bold text-black text-2xl">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button
            style={{ backgroundColor: "#25d366" }}
            onClick={handleLogout}
            type="submit"
            className=" text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Leave Room
          </button>
        </div>
      </div>

      <div
        id="main"
        ref={chatRef}
        className="flex-1 px-10 w-2/3 mx-auto overflow-y-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/d8/bd/62/d8bd62a677cf8eee9d72b37b52714500.jpg")`,
          // backgroundColor: "#fcf5eb",
        }}
      >
        {message.map((msg, index) => {
          console.log("Hello");
          return (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="p-2 max-w-xs rounded m-2"
                style={{
                  backgroundColor:
                    msg.sender === currentUser ? "#d9fdd3" : "#ffffff",
                }}
              >
                <div className="flex flex-row gap-2">
                  <img
                    className="h-10 w-10"
                    src="https://avatar.iran.liara.run/public"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-black">{msg.sender}</p>
                    <p>{msg.content}</p>
                    <p className="text-xs text-right">{timeAgo(msg.time)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="w-2/3 mx-auto h-16 pt-1 pb-2 flex items-center bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/d8/bd/62/d8bd62a677cf8eee9d72b37b52714500.jpg")`,
          // backgroundColor: "#fcf5eb",
        }}
      >
        <div className=" flex items-center border-black h-full w-3/4 mx-auto">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  "
            style={{ backgroundColor: "#ffffff" }}
          />
          <div className=" m-2 flex gap-1">
            {/* <button className=" h-10 w-10  flex   justify-center items-center rounded-full">
              {" "}
              <MdAttachFile size={20} />
            </button> */}
            <button
              onClick={sendMessage}
              className=" h-10 w-10  flex   justify-center items-center rounded-full"
              style={{ backgroundColor: "#25d366" }}
            >
              <MdSend size={20} color={"white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
