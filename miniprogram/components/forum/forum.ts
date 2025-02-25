// components/forum/forum.ts

import type { Post } from "../../types/home";
import { urlParams } from "../../utils/request"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    list:Array<Post>
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toForum(event:any){
      console.log(event);
      
      wx.navigateTo({
        url:'/pages/viewForum/viewForum'+urlParams({
          id:event.currentTarget.dataset.id
        }),
      })
    }
  }
})