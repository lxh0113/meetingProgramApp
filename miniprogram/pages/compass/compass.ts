import { getCalendarAPI, getMeetingDetailsAPI, getMeetingResourceAPI } from "../../apis/meeting"

// pages/compass/compass.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 1,
    meetingsList: [],
    show: false,
    resourceList: []
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  async getMeetings() {
    const res = await getCalendarAPI(this.data.userId)

    if (res.data.code === 200) {
      this.setData({
        meetingsList: res.data.data
      })
    }
    else {
      wx.showToast({
        title: '获取数据失败'
      })
    }
  },
  async getResource(event) {

    console.log(event.currentTarget.dataset.id)

    const res = await getMeetingResourceAPI(event.currentTarget.dataset.id)

    if (res.data.code === 200) {
      this.setData({
        resourceList: res.data.data
      })



      if (this.data.resourceList.length !== 0) this.setData({
        show: true
      })
      else {
        wx.showToast({
          title: "该会议无文件", icon: 'none'
        })
      }
    }
    else {
      wx.showToast({
        title: "获取资料失败", icon: 'none'
      })
    }
  },
  async getData() {
    wx.getStorage({
      key: "user",
      success: (res) => {

        this.setData({
          "userId": res.data.id
        })
      }
    })
  },
  getFilePathName(path) {
    let pos1 = path.lastIndexOf('/');
    let pos2 = path.lastIndexOf('\\');
    let position = Math.max(pos1, pos2);
    if (position < 0)
      return path;
    else
      return path.substring(position + 1);
  },
  // 点击事件
  openFile(event) { // item为当前点击的事物对象

    let url = event.currentTarget.dataset.url

    let file = decodeURIComponent(url); // 解码(注意:涉及到文件名中有中文需要转码)
    file = this.getFilePathName(file); // 将文件路径过滤，格式为【文件名+.后缀名】
    // 加载状态
    wx.showLoading({
      title: '文件打开中',
      mask: true
    });
    // 预览网络文档
    wx.downloadFile({
      url: url, // 文件的本身url
      filePath: wx.env.USER_DATA_PATH + '/' + file, // 本地自定义的文件名
      success: function (res) {
        let filePath = res.filePath; // 微信临时文件路径(这里要使用自定义的名字文件名,否则打开的文件名是乱码)
        wx.openDocument({
          filePath: filePath,
          showMenu: true,  // 是否显示右上角菜单按钮 默认为false(看自身需求，可要可不要。后期涉及到右上角分享功能)
          success: function () {
            wx.showToast({
              title: "打开成功"
            })
            wx.hideLoading()
          },
          fail: function (error) {
            wx.showToast({
              title: '打开文件失败', icon: 'none'
            })
            wx.hideLoading()
            console.log(error.errMsg)
          }
        });
      },
      fail: function (error) {
        wx.showToast({
          title: "下载文件失败", icon: 'none'
        })

        console.log(error.errMsg)
      }
    });
  },
  async getIsGuide(event) {
    let id = event.currentTarget.dataset.id

    console.log(id)

    const res = await getMeetingDetailsAPI(id)

    if (res.data.code === 200) {
      return res.data.data.meetingType === "0" ? true : false
    }
    else {
      return false
    }

    // return false


  },
  toMap(event) {
    let id = event.currentTarget.dataset.id

    console.log(id)

    wx.navigateTo({
      url: '/pages/map/map' + '?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getData()
    this.getMeetings()
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