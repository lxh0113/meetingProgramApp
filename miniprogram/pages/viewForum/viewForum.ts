import { getPostByIdAPI } from "../../apis/forum";
import { ViewPost } from "miniprogram/types/home";

// pages/viewForum/viewForum.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    post:{} as ViewPost
  },
  async getPost(){
    const res = await getPostByIdAPI(this.data.id,1);
    if(res.data.code===200){
      this.setData({
        post:res.data.data
      })
    }
    else {
      wx.showToast({
        title:'获取失败',
        icon:"none"
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options:any) {
    this.data.id=options.id
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