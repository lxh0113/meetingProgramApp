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
  status: number;
}

export interface AdminPost extends Post {
  avatar: string;
  comments: number;
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

export type CurrentConversation = {
  id: number;
  title: string;
  search_enabled: boolean;
};

export type Conversation = {
  id: number;
  title: string;
  updated_at: string;
  search_enabled: boolean;
};

export type ConversationList = Array<Conversation>;

export type SearchItem = {
  title: string;
  link: string;
  snippet: string;
};

export type SearchItemList = Array<SearchItem>;

export type AIMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  metadata: object;
};

export type AIMessageList = Array<AIMessage>;

export type MeetingSettings = {
  id?: number;
  username?: string;
  // 关闭音频
  startWithAudioMuted?: boolean;
  startWithVideoMuted?: boolean;
};

export type RankPost = {
  postId: number;
  lable: string;
  attentionCount: number;
  userInfo: UserInfo;
};

export type AgentMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AgentMessageList = Array<AgentMessage>;

export type MeetingSetting = {
  title: string;
  userId: number;
  startTime: string;
  meetingType: 0 | 1;
  address: string | null;
  lat: number | null;
  lng: number | null;
  password: string;
  isprivate: number;
  duration: number;
};

export type BadWord = {
  id: number;
  word: string;
};

export type BadWordList = Array<BadWord>;

export type Meeting = {
  id: number;
  title: string;
  creator: string;
  url: string;
  createTime: string;
  // 0 未开始 1 正在进行 2 已结束
  status: 0 | 1 | 2;
  users: number;
};

export type MeetingList = Array<Meeting>;

export type Schedule = {
  meetingId: number;
  url: string;
  usercount: number;
  title: string;
  startTime: string;
  duration: number;
  status: number;
};

export type ScheduleList = Array<Schedule>;

export type Knowledge = {
  startTime: string;
  text: string;
};

export type KnowledgeList = Array<Knowledge>;
