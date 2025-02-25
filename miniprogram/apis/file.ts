import {request} from "../utils/request";

export const fileUploadAPI=(data:any)=>{
    return request({
        url:"/oss/avatar",
        method:"POST",
        data
    })
}