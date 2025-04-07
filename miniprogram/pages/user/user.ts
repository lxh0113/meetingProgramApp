
import { getUserInfoAPI, updateAPI } from "../../apis/user";

// pages/user/user.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    userInfo: {
      "account": "string",
      "username": "string",
      "sex": "string",
      "email": "string",
      "phone": "string",
      "avatar": "string",
      "password": "string"
    }
  },
  async getData() {
    wx.getStorage({
      key: "user",
      success: (res) => {

        this.setData({
          account: res.data.account
        })

        this.getUserInfo()
      }
    })
  },
  async getUserInfo() {

    const res = await getUserInfoAPI(this.data.account)

    if (res.data.code === 200) {
      this.setData({
        userInfo: res.data.data
      })
    }
    else {
      wx.showToast({
        title: "获取失败",
        icon: "none"
      })
    }
  },
  async changeUserInfo() {
    const res = await updateAPI(null, this.data.userInfo)

    if (res.data.code === 200) {
      wx.showToast({
        'title': "修改成功"
      })
    }
    else {
      wx.showToast({
        title: "修改失败"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getData()

    // await this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {


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