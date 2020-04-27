import request from './request'

//获取音乐url   可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
export const getMusicUrl = (info)=>request('/song/url',info);