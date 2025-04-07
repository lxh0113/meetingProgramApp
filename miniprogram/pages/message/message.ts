
import { getAllMessageListAPI, getToDosByYearMonthAPI } from "../../apis/message";
const dayjs = require("./dayjs");

// pages/message/message.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userId: 1,
    messageList: [],
    pageData: {},
    date: new Date().getTime(),
    minDate: new Date(2025, 2, 1).getTime(),
    maxDate: new Date(2025, 7, 31).getTime(),
    todoList: [],
    formatter(day: any) {
      let list = [{
        "id": 29,
        "userId": 1,
        "title": "122",
        "content": "111",
        "status": "0",
        "createTime": "2025-04-24 12:00:00"
      },
      {
        "id": 28,
        "userId": 1,
        "title": "111",
        "content": "222",
        "status": "0",
        "createTime": "2025-04-16 12:00:00"
      },
      {
        "id": 26,
        "userId": 1,
        "title": "待办",
        "content": "新增",
        "status": "0",
        "createTime": "2025-04-11 20:21:17"
      },
      {
        "id": 24,
        "userId": 1,
        "title": "111",
        "content": "222",
        "status": "1",
        "createTime": "2025-04-09 12:00:00"
      },
      {
        "id": 25,
        "userId": 1,
        "title": "待办",
        "content": "新增",
        "status": "1",
        "createTime": "2025-04-09 12:00:00"
      },
      {
        "id": 22,
        "userId": 1,
        "title": "无标题",
        "content": "待办事项",
        "status": "1",
        "createTime": "2025-04-01 21:01:39"
      }]
      let number = 0;
      number = list.filter(
        (item) =>
          dayjs(item.createTime).format("YYYY-MM-DD") === dayjs(day.date).format("YYYY-MM-DD") && item.status === "0"
      ).length || 0;

      // console.log(dayjs(day.date).format("YYYY-MM-DD"), number)

      if (number) day.bottomInfo = number + "代办"
      return day;
    },
  },

  controlShow() {
    this.setData({
      "show": !this.data.show
    })
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
  lookToDo(event: any) {
    // console.log(event.currentTarget.detail.id)
  },
  async getMessage() {
    const res = await getAllMessageListAPI(this.data.userId);
    console.log(res.data.data)
    if (res.data.code === 200) {
      this.setData({
        "messageList": res.data.data.messagelist
      })
    } else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    };
  },
  async getTodo() {
    const res = await getToDosByYearMonthAPI(this.data.userId, new Date().getFullYear(), new Date().getMonth() + 1)

    if (res.data.code === 200) {
      // console.log()
      this.data.todoList = res.data.data.messageToDoList

    }
    else {
      wx.showToast({
        title: "获取出错了"
      })
    }
  },
  toViewForum() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getData()
    await this.getMessage()
    await this.getTodo()

  
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