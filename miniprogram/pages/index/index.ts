// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()
// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

import { bookMeetingAPI, createMeetingAPI, getCalendarAPI, joinMeetingAPI } from "../../apis/meeting"

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addFormData: {
      id: 1,
      username: "",
      startWithAudioMuted: false,
      startWithVideoMuted: false,
    },
    bookData: {
      title: "",
      userId: 1,
      startTime: "",
      // 0线下 1线上
      meetingType: 0,
      address: "",
      lat: 1,
      lng: 1,
      password: "",
      // 0公有 1私有
      isprivate: 1,
      duration: 1,
    },
    schedules: [],
    joinDialogVisible: false,
    bookDialogVisible: false,
  },
  showJoinDialogVisible() {
    this.setData({
      joinDialogVisible: true
    })
  },
  showBookDialogVisible() {
    this.setData({
      bookDialogVisible: true
    })
  },
  //确认加入会议
  async confirmJoin() {
    // 发送请求
    const res = await joinMeetingAPI(this.data.bookData.userId, this.data.addFormData.id)

    if (res.data.code === 200) {
      wx.showToast({
        title: "加入会议成功",
        icon: 'success'
      })

      console.log(res.data.data)

      setTimeout(() => {
        wx.navigateTo({
          url: "https://www.tccwzfy.cloud/" + res.data.data
        })
      }, 2000)
    }
    else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    }
  },
  // 确认预定会议
  async confirmBook() {
    const res = await createMeetingAPI(this.data.bookData)

    if (res.data.code === 200) {
      wx.showToast({
        title: "预定会议成功",
        icon: 'success'
      })
    }
    else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    }
  },
  async getSchedules() {
    const res = await getCalendarAPI(this.data.bookData.userId)

    if (res.data.code === 200) {
      this.setData({
        schedules: res.data.data
      })
    }
    else {
      wx.showToast({
        title: res.data.message,
        icon: "none"
      })
    }
  },
  onChange(e) {
    console.log(e)

    this.setData({
      [e.target.dataset.str]: e.detail
    })
    if (this.data.bookData.meetingType === 0) {
      this.getLocation()
    }
  },
  getLocation() {
    //获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          "bookData.lng": res.longitude
        })
        this.setData({
          "bookData.lat": res.latitude
        })
        console.log(res)
      }, fail: (err) => {
        console.log('获取失败', err.errMsg)
      }
    })
  },

  toCompass() {
    wx.navigateTo({
      url: "/pages/compass/compass"
    })
  },

  async getData() {
    wx.getStorage({
      key: "user",
      success: (res) => {

        this.setData({
          "bookData.userId": res.data.id
        })
      }
    })
  },
  async getAddress() {

    let that = this

    wx.request({
      //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
      url: `https://apis.map.qq.com/ws/place/v1/search?page_index=1&page_size=20&keyword=${this.data.bookData.address}&boundary=nearby(${this.data.bookData.lat},${this.data.bookData.lng},1000,1)&key=QSCBZ-V5PWH-X4GDF-WXMZU-YWICE-EYBTU`,
      success(res) {
        console.log(res)
        // var result = res.data
        let pois = res.data.data
        if (pois.length) {
          that.setData({
            "bookData.lat": pois[0].location.lat,
            "bookData.lng": pois[0].location.lng,
            "bookData.address": pois[0].title
          })
        }
        // for (var i = 0; i < pois.length; i++) {
        //   var title = pois[i].title
        //   var lat = pois[i].location.lat
        //   var lng = pois[i].location.lng
        //   console.log(title + "," + lat + "," + lng)

        // }
      }
    })
  },
  initAddress() {
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined  表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false  表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true  表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
        }
        else {
          //调用wx.getLocation的API
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initAddress()
    this.getLocation()
    this.getData()
    this.getSchedules()
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