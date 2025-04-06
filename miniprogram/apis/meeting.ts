import { MeetingSetting, MeetingSettings } from "miniprogram/types/home";
import { request } from "../utils/request";

export const getAllAPI = (meetingId: number) => {
  return request({
    url: "/meeting/meetingId/file",
    method: "GET",
    params: {
      meetingId,
    },
  });
};

export const getMeetingDetailsAPI=(id:number)=>{
  return request({
    url:"/meeting/"+id,
    method:"GET"
  })
}

export const uploadMeetingFileAPI = (url: string, meetingId: number) => {
  return request({
    url: "/meeting/meetingId/recording",
    method: "POST",
    params: {
      url,
      meetingId,
    },
  });
};

export const getMeetingRecordUrlAPI = (meetingId: number) => {
  return request({
    url: "/meeting/meetingId/getrecording",
    method: "GET",
    params: {
      meetingId,
    },
  });
};

export const createMeetingAPI = (data: MeetingSetting) => {
  return request({
    url: "/meeting/create",
    method: "POST",
    data,
  });
};

export const quicklyMeetingAPI = (userId: number) => {
  return request({
    url: "/meeting/quickly",
    method: "POST",
    params: {
      userId,
    },
  });
};

export const bindMeetingFileAPI = (meetingId: number, uid: string) => {
  return request({
    url: "/meeting/binding",
    method: "POST",
    params: {
      meetingId,
      uid,
    },
  });
};

export const deleteMeetingFileAPI = (meetingId: number, uid: string) => {
  return request({
    url: "/meeting/binding/delete",
    method: "DELETE",
    params: {
      meetingId,
      uid,
    },
  });
};

export const meetingRemindAPI = (
  meetingId: number,
  reminderType: number,
  data
) => {
  return request({
    url: "/meeting/remind",
    method: "POST",
    params: {
      meetingId,
      reminderType,
    },
    data,
  });
};

export const getCalendarAPI = (userId: number) => {
  return request({
    url: "/meeting/calendar",
    method: "GET",
    params: {
      userId,
    },
  });
};

export const bookMeetingAPI = (userId: number, MeetingId: number) => {
  return request({
    url: "/meeting/book",
    method: "POST",
    params: {
      userId,
      MeetingId,
    },
  });
};

export const endMeetingAPI = (meetingId: number) => {
  return request({
    url: "/meeting/end",
    method: "POST",
    params: {
      meetingId,
    },
  });
};

export const joinMeetingAPI = (userId: number, meetingId: number) => {
  return request({
    url: "/meeting/join",
    method: "POST",
    params: {
      userId,
      meetingId,
    },
  });
};

export const signMeetingAPI = (userId: number, meetingId: number) => {
  return request({
    url: "/meeting/sign",
    method: "POST",
    params: {
      userId,
      meetingId,
    },
  });
};

export const getHistoryMeetingAPI = (userId: number) => {
  return request({
    url: "/meeting/history",
    method: "GET",
    params: {
      userId,
    },
  });
};

export const getSignDetailsAPI = (meetingId: number) => {
  return request({
    url: "/meeting/getbook",
    method: "GET",
    params: {
      meetingId,
    },
  });
};

export const getMeetingResourceAPI = (meetingId: number) => {
  return request({
    url: "/meeting/getresouce",
    method: "GET",
    params: {
      meetingId,
    },
  });
};
