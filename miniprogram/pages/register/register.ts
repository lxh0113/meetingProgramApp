
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginData: {
      account: '', password: ''
    },
    title: '欢迎使用！', //填写logo或者app名称，也可以用：欢迎回来，看您需求
    second: 60, //默认60秒
    showText: true, //判断短信是否发送
    phone: '', //手机号码
    yzm: '' //验证码
  },

  //当前登录按钮操作
  login() {
    
  },
  //获取短信验证码
  getCode() {
    
    
  },
  //等三方微信登录
  wxLogin() {
    wx.showToast({ title: '微信登录', icon: 'none' });
  },
  //第三方支付宝登录
  zfbLogin() {
    wx.showToast({ title: '支付宝登录', icon: 'none' });
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