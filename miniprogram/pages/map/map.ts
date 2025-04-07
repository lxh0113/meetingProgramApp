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
    latitude: 1,
    longitude: 2,
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
    console.log(res)
    if (res.data.code === 200) {
      this.setData({
        meetingData: res.data.data[0]
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
          "longitude": res.longitude
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
  onGuideTap: function () {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => this._doNavigation(),
            fail: () => wx.showToast({ title: '需要位置权限', icon: 'none' })
          });
        } else {
          this._doNavigation();
        }
      }
    });
  },
  _doNavigation: function () {
    console.log(this.data.meetingData)
    wx.openLocation({
      latitude: this.data.meetingData.lat,
      longitude: this.data.meetingData.lng,
      name: this.data.meetingData.address,
      scale: 18
    });
  }
})
