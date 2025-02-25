
/**
 * 请求配置
*/
export interface RequestConfig {
  /** API路径 */
  url?: string
  /** Method类型 */
  method?: "GET" | "POST" | "OPTIONS" | "PUT" | "DELETE"
  /** 接口返回数据 */
  params?: any
  data?: any
  /** 无TOKEN触发异常捕获时，是否执行异常逻辑 */
  needToken?: boolean
  /** Header头部 */
  header?: object
  /** 返回的数据格式 */
  dataType?: string
  /** 请求报错时，是否弹出message提示（默认弹出）*/
  noShowMsg?: boolean
}

interface User {
  id: number;
  account: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  username: string;
  password?: string;
}

export interface UpdateUser {
  account: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  username: string;
  password?: string;
}

interface UserInfo extends User {
  likeCount: number;
  postCount: number;
  postIds: Array<number>;
  meetingIds: Array<number>;
}

interface RegisterData {
  email: string;
  emailCaptcha: string;
  password: string;
  phone?: string;
  phoneCaptcha?: string;
  sex?: string;
  username?: string;
}

interface Post {
  id: number;
  createTime: string;
  views: number;
  likes: number;
  favorites: number;
  label: string;
  content: string;
  author: string;
  status: string;
}

interface PublishPost {
  createTime: string;
  views: number;
  likes: number;
  favorites: number;
  label: string;
  content: string;
}

interface ReplyPost {
  postId: number;
  commentId: number;
  userId: number;
  time: string;
  parentCommentId: number;
  parentUsername: string;
  likes: number;
  views: number;
  favorites: number;
  comment: number;
}

interface ViewPost extends Post {
  authorId: number;
  userInfoVo: UserInfo;
  authorPostCount: number;
  comments: Array<ReplyPost>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalComments: number;
}

export type ReplyComment = {
  userId: number;
  time: string;
  parentCommentId: number;
  comment: string;
};

export { User, UserInfo, RegisterData, Post, PublishPost, ReplyPost, ViewPost };

export type Nav = {
  path: string;
  icon: string;
  text: string;
};

export type NavList = Array<Nav>;

export type Message = {
  id: number;
  userId: number;
  content: string;
  createTime: string;
  title: string;
  status: string;
};

export type MessageList = Array<Message>;

export interface ResponseData {
  code: number;
  data: any;
  message: string;
}
