import { getFavorateAPI, getPostAPI } from "../../apis/user";

// pages/forum/forum.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 1,
    active: 0,
    myList: [],
    list: [],
    myStar: [],
    myFollow: [],
  },

  onChange(event: any) {
    console.log(typeof event.detail.name)
    switch (event.detail.name) {
      case 0: this.getForums();break;
      case 1: this.getMyForums();break;
      case 2: this.getMyForums();break;
      case 3: this.getMyStar();
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

  async getForums() {

    const res = await getPostAPI(this.data.userId, 1);

    if (res.data.code === 200) {
      this.setData({
        list: res.data.data.posts
      })
    }
    else {
      wx.showToast({
        title: "获取失败",
        icon: "none"
      })
    }
  },
  async getMyForums() {

    const res = await getPostAPI(this.data.userId, 1);

    if (res.data.code === 200) {
      this.setData({
        myList: res.data.data.posts
      })
    }
    else {
      wx.showToast({
        title: "获取失败",
        icon: "none"
      })
    }
  },
  async getMyFollow() {

  },
  async getMyStar() {

    const res = await getFavorateAPI(this.data.userId, 1)

    if (res.data.code === 200) {
      this.setData({
        myStar: res.data.data.posts
      })
    }
    else {
      wx.showToast({
        title: "获取失败",
        icon: "none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // 获取
    await this.getData()
    this.getForums()
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