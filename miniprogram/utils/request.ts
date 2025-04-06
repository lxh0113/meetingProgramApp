import { RequestConfig, ResponseData } from "miniprogram/types/home"

export function urlParams(param: {
  [key: string]: any
}): string {


  // 需要是一个对象并进行封装
  let keys: string[] = Object.keys(param);
  
    return keys.reduce((s, a) => {
      return s += a + '=' + param[a] + '&'
    }, '?').slice(0, -1)
  
}

export const baseUrl = 'http://129.204.152.171:8081'

export const request = (parmas: RequestConfig) => {
  // 返回一个promise对象
  return new Promise<ResponseData>((resolve, reject) => {
    const baseUrl = 'http://129.204.152.171:8081'
    wx.request({
      url: baseUrl + parmas.url + (parmas.params ? urlParams(parmas.params) : ''), //仅为示例，并非真实的接口地址
      method: parmas.method || "GET",
      data: parmas.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // 请求成功，就将成功的数据返回出去
        console.log(res)
        resolve(res)
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      },
    })
  })
}