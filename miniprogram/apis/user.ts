import {request} from '../utils/request'

import type { RegisterData, UpdateUser } from "../types/home";

export const loginAPI = (account: string, password: string) => {
  return request({
    url: "/users/login",
    params: {
      account,
      password,
    },
  });
};

export const getUserInfoAPI = (account: string) => {
  return request({
    url: "/users/info",
    params: {
      account,
    },
  });
};

export const updateAPI = (emailCaptcha:string|null,data: UpdateUser) => {
  return request({
    url: "/users/update",
    method: "PUT",
    params:{
      emailCaptcha
    },
    data,
  });
};

export const registerAPI = (data: RegisterData) => {
  return request({
    url: "/users/register",
    method: "POST",
    data,
  });
};

export const updatePasswordAPI = (
  account: string,
  Password: string,
  email: string,
  emailCaptcha: string
) => {
  return request({
    url: "/users/password",
    method: "POST",
    data: {
      account,
      Password,
      email,
      emailCaptcha,
    },
  });
};

export const getPostAPI = (userId: number, page: number) => {
  return request({
    url: "/users/post",
    method: "GET",
    params: {
      userId,
      page,
    },
  });
};

export const getLikeAPI = (userId: number, page: number) => {
  return request({
    url: "/users/like",
    method: "GET",
    params: {
      userId,
      page,
    },
  });
};

export const getFavorateAPI = (userId: number, page: number) => {
  return request({
    url: "/users/favorite",
    method: "GET",
    params: {
      userId,
      page,
    },
  });
};

export const getUserFollowAPI = (userId: number, page: number) => {
  return request({
    url: "/users/attention",
    method: "GET",
    params: {
      userId,
      page,
    },
  });
};