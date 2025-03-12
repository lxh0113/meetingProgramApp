import { MessageList } from "../../types/home";
import { getAllMessageListAPI } from "../../apis/message";
const dayjs = require("./dayjs");

// pages/message/message.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formatter(day: any) {
      // console.log(day.date)

      let number =0;
      number = this.data?.todoList?.filter(
        (item) =>
          dayjs(item.createTime).format("YYYY-MM-DD") === dayjs(day.date).format("YYYY-MM-DD") && item.status === "0"
      ).length;

      if (number) day.topInfo = number + "代办"
      return day;
    },
    show: false,
    userId: 1,
    messageList: [
      {
        id: 1,
        userId: 1,
        content: '',
        createTime: '',
        title: '',
        status: ''
      }
    ],
    pageData: {},
    todoList: [
      {
        id: 1,
        userId: 1,
        content: '',
        createTime: '',
        title: '',
        status: ''
      }
    ]
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
        "messageList": res.data.data.messagelist,
        "todoList": res.data.data.messageToDoList
      })
    } else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    };
  },
  toViewForum(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getData()
    this.getMessage()
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