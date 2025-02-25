import {request} from "../utils/request";

export const sendVerificationCodeAPI = (email: string) => {
  return request({
    url: "/email/register",
    method: "POST",
    params: {
      email,
    },
  });
};