import { getMeetingDetailsAPI } from "../../apis/meeting";

// pages/map/map.ts
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addmissage: '选的位置',
    // markers	 Array	标记点
    stitle: '故宫',
    latitude: "12",
    longitude: "12",
    scale: 14,
    markers: [],
    distanceArr: [],
    meetingData: {
      "id": 0,
      "title": "",
      "creator": "",
      "createTime": "",
      "summary": "",
      "feedback": "",
      "meetingType": "",
      "status": 0,
      "startTime": "",
      "endTime": "",
      "address": "",
      "lat": 0,
      "lng": 0,
      "password": "",
      "isprivate": 0,
      "duration": 0
    }
  },
  async getInfo() {
    // 根据会议id获取经纬度等信息
    const res = await getMeetingDetailsAPI(this.data.meetingData.id)

    if (res.data.code === 200) {
      this.setData({
        meetingData: res.data.data
      })
    }
    else {
      wx.showToast({
        title: '获取失败'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res);
        //赋值经纬度
        that.setData({
          latitude: res.latitude
        })
        that.setData({
          longitude: res.longitude
        })
        // 发送给朋友、分享朋友圈
        // app.onShareAppMessage();
      }
    })
    console.log(options)
    this.setData({
      "meetingData.id": options.id
    })

    this.getInfo()
  },
  //导航
  onGuideTap: function (event) {

    wx.openLocation({
      type: 'gcj02',
      latitude: this.data.meetingData.lat,
      longitude: this.data.meetingData.lng,
      name: this.data.meetingData.address,
      scale: 28
    })
  },

})
