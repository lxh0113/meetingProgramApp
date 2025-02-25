import {request} from "../utils/request";

export const getAllAPI=()=>{
    return request({
        url:"/home",
        method:"GET"
    })
}