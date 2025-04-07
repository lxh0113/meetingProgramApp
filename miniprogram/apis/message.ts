import { request } from "../utils/request";
export const getAllMessageListAPI = (userId: number) => {
  return request({
    url: "/message",
    method: "GET",
    params: {
      userId,
    },
  });
};

export const getMessagesAPI = (userId: number, pageNum: number) => {
  return request({
    url: "/message/getmsg",
    method: "GET",
    params: {
      userId,
      pageNum,
    },
  });
};

export const addToDoAPI = (
  userId: number,
  messageId: number,
  createTime: string,
  title: string,
  content: string
) => {
  return request({
    url: "/message/addtodo",
    method: "POST",
    data: {
      userId,
      messageId,
      createTime,
      title,
      content,
    },
  });
};

export const getMessageInfoAPI = (messageId: number) => {
  return request({
    url: "/message/info/" + messageId,
    method: "GET",
  });
};

export const getMessageToDoInfoAPI = (messageToDoId: number) => {
  return request({
    url: "/message/todo/" + messageToDoId,
    method: "GET",
  });
};

export const getToDosByYearMonthAPI = (userId: number, year: number, month: number) => {
  return request({
    url: "/message/todos",
    method: "GET",
    params: {
      userId,
      year,
      month,
    },
  });
};
