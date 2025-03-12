import { attentionPostAPI, favoriteCommentAPI, favoritePostAPI, getActionsAPI, getPostByIdAPI, likeCommentAPI, likePostAPI } from "../../apis/forum";
import { ViewPost } from "miniprogram/types/home";

// pages/viewForum/viewForum.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    userId: 1,
    post: {} as ViewPost,
    activeData: {
      isView: 1,
      isLike: 0,
      isStar: 0,
      isAttention: 0,
    },
    actionData: [
      {
        commentId: 1,
        isLike: 0,
        isFavorite: 0,
      }
    ]
  },
  async getPost() {
    const res = await getPostByIdAPI(this.data.id, 1);
    console.log(res.data)
    if (res.data.code === 200) {
      this.setData({
        post: res.data.data
      })
    }
    else {
      wx.showToast({
        title: '获取失败',
        icon: "none"
      })
    }

  },
  async getData() {
    wx.getStorage({
      key: "user",
      success: (res) => {
        console.log(res.data)
        this.setData({
          userId: res.data.id
        })
      }
    })
  },
  async getAction() {
    const res = await getActionsAPI(this.data.id, this.data.userId);

    if (res.data.code === 200) {
      this.setData({
        activeData: {
          isView: 1,
          isLike: res.data.data.userActionVo.isLike,
          isStar: res.data.data.userActionVo.isFavorite,
          isAttention: res.data.data.isAttention
        }
      })
      this.setData({
        actionData: res.data.data.commentsActionVoArray
      })

    } else wx.showToast({
      title: "获取失败",
      icon: "none"
    })
  },
  async toAttention() {
    // 关注
    const res = await attentionPostAPI(this.data.id, this.data.userId);

    if (res.data.code === 200) {
      if (this.data.activeData.isAttention === 0) {
        this.setData({
          "activeData.isAttention": 1
        })

      } else {
        this.setData({
          "activeData.isAttention": 0
        })
      }

      wx.showToast({
        title: "关注成功",
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: "取消关注成功",
        icon: 'none'
      })
    }

  },
  async toLike() {
    // 点赞
    const res = await likePostAPI(this.data.id, this.data.userId);
    if (res.data.code === 200) {

      if (this.data.activeData.isLike === 0) {
        this.setData({
          "activeData.isLike": 1,
          "post.like": this.data.post.likes + 1
        })

      } else {
        this.setData({
          "activeData.isLike": 0,
          "post.like": this.data.post.likes - 1
        })
      }
      wx.showToast({
        title: res.data.message,
        icon: 'success'
      })

    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
    };
  },
  async toStar() {
    // 收藏
    const res = await favoritePostAPI(this.data.id, this.data.userId);

    if (res.data.code === 200) {

      if (this.data.activeData.isStar === 0) {
        this.setData({
          "activeData.isStar": 1,
          "post.favorites": this.data.post.favorites + 1
        })

      } else {
        this.setData({
          "activeData.isStar": 0,
          "post.favorites": this.data.post.favorites - 1
        })
      }
      wx.showToast({
        title: res.data.message,
        icon: 'success'
      })

    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
    };
  },
  // 回帖的点赞和收藏
  async commentLike(event: any) {
    // 回帖点赞
    let pos = event.currentTarget.dataset.index;
    const res = await likeCommentAPI(
      this.data.id,
      this.data.post.comments[pos].commentId,
      this.data.userId
    );

    if (res.data.code === 200) {
      wx.showToast({
        title: res.data.message,
        icon: "success"
      })
      let str1 = "actionData[" + pos + '].isLike'
      let str2 = "post.comments[" + pos + "].likes"

      if (this.data.actionData[pos].isLike === 0) {
        this.setData({
          [str1]: 1,
          [str2]: this.data.post.comments[pos].likes + 1
        })
      }
      else {
        this.setData({
          [str1]: 0,
          [str2]: this.data.post.comments[pos].likes - 1
        })
      }

    } else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    };
  },
  async commentStar(event: any) {
    // 回帖收藏
    let pos = event.currentTarget.dataset.index;
    const res = await favoriteCommentAPI(
      this.data.id,
      this.data.post.comments[pos].commentId,
      this.data.userId
    );

    if (res.data.code === 200) {
      wx.showToast({
        title: res.data.message,
        icon: "success"
      })
      let str1 = "actionData[" + pos + '].isFavorite'
      let str2 = "post.comments[" + pos + "].favorites"

      if (this.data.actionData[pos].isFavorite === 0) {
        this.setData({
          [str1]: 1,
          [str2]: this.data.post.comments[pos].favorites + 1
        })
      }
      else {
        this.setData({
          [str1]: 0,
          [str2]: this.data.post.comments[pos].favorites - 1
        })
      }

    } else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    };

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    this.getData()
    this.data.id = options.id
    this.getPost()
    this.getAction()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})