import { baseUrl } from "../../utils/request";

// pages/ai/ai.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isLoading: false,
    messageList: [
      {
        role: "user",
        content: "你好",
      },
      {
        role: "assistant",
        content: "你好我是你的ai小助手",
      },
    ],
    agentId: "5575a296-d0af-4f7a-8ad8-2131830fb97c",
    header: {
      appKey: "hengnao5oxJTc2JEKIwUaBCmDeZ",
      sign: "",
    }
  },
  onChange(event: any) {
    // event.detail 为当前输入的值

    this.setData({
      value: event.detail
    })
  },
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  agentExcute() {
    this.setData({
      isLoading: true
    })
    wx.request({
      url: "https://www.das-ai.com/open/api/v2/agent/execute",
      method: "POST",
      header: {
        ...this.data.header
      },
      data: {
        sid: this.generateUUID(),
        id: this.data.agentId,
        input: this.data.value,
        stream: false
      },
      success: (res) => {
        this.setData({
          isLoading: false
        })
        
        // 假设服务器返回的数据是一个字符串
        const fullText = res.data.data.session.messages[res.data.data.session.messages.length - 1].content;

        // // 将字符串按每5个字分割成数组
        // const chunkSize = 5; // 每5个字一组
        // let chunks = [];
        // for (let i = 0; i < fullText.length; i += chunkSize) {
        //   chunks.push(fullText.slice(i, i + chunkSize));
        // }

        // let index = 0;

        // console.log(chunks)

        let str = 'messageList[' + (this.data.messageList.length - 1) + '].content';
        this.setData({
          [str]: fullText
        });
        // this.data.messageList[this.data.messageList.length - 1].content +  fullText

        // 使用 setInterval 逐步更新 UI
        // const intervalId = setInterval(() => {
        //   if (index < chunks.length) {
        //     let str = 'messageList[' + (this.data.messageList.length - 1) + '].content';
        //     this.setData({
        //       [str]: this.data.messageList[this.data.messageList.length - 1].content + chunks[index]
        //     });
        //     index++;
        //   } else {
        //     clearInterval(intervalId); // 停止定时器
        //     this.setData({
        //       isLoading: false
        //     });
        //   }
        // }, 1000); // 每 100 毫秒更新一次
      }
    })
  },
  sendMessage() {

    this.setData({
      "messageList": [...this.data.messageList, {
        role: 'user',
        content: this.data.value
      }, {
        role: "assistant",
        content: ""
      }]
    })
    this.setData({
      isLoading: true
    })
    this.agentExcute()
  },
  setSign() {
    wx.request({
      url: baseUrl + "/chat",
      method: "POST",
      success: (res) => {
        this.setData(
          {
            "header.sign": res.data!.data
          }
        )
        console.log(this.data.header.sign)
      }
    }
    )
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
    this.setSign()
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