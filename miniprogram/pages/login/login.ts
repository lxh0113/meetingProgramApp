import { loginAPI } from "../../apis/user"

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '', password: ''
  },

  //当前登录按钮操作
  async login() {
    // 登录操作
    console.log(this.data)
    const res = await loginAPI(this.data.account, this.data.password)

    if (res.data.code === 200) {
      wx.showToast({
        title: '登陆成功',
        icon: "success"
      })

      wx.setStorage({
        key: "user",
        data: res.data.data
      })

      setTimeout(() => {
        wx.switchTab({
          url: "/pages/index/index"
        })
      },2000)
    }
    else {
      
    }

  },
  changeAccount(e: any) {
    this.setData({
      account: e.detail.value
    })
  },
  changePassword(e: any) {
    this.setData({
      password: e.detail.value
    })
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