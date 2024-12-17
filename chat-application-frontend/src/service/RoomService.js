import { httpClient } from "../config/AxiosHelper";

export const createRoomRequest = async (roomDetail) => {
  const response = await httpClient.post(`/api/v1/rooms`, roomDetail, {
    headers: {
      "Content-Type": "plain/text",
    },
  });
  return response.data;
};

export const joinChatApi = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
  return response.data;
};

export const getMessage = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}/messages`);
  return response.data;
};
