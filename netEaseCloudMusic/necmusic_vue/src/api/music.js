import request from './request'

//获取音乐url   可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
export const reqGetMusicUrl = (info)=>request('/song/url',info);

//获取歌词  根据音乐id获取歌词
export const reqGetLyric = (info)=>request('/lyric',info);

//获取歌曲详情  传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
export const reqSongDetail = (info)=>request('/song/detail',info)