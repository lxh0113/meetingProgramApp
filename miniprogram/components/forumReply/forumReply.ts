import { likeCommentAPI } from "miniprogram/apis/forum";
import { ReplyPost } from "miniprogram/types/home";

type IData = {
  postId: Number;
  actionData: {
    commentId: Number;
    isLike: Number;
    isFavorite: Number;
  },
  comments: Array<ReplyPost>
}

// components/forumReply.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    postId: 1,
    actionData: {

    },
    comments: {

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    replyLike() {
      // 点赞
      // const res = await likeCommentAPI(this.properties.postId,comments.)
    },
    replyStar() {
      // 收藏
    }

  }
})