import request from './request'

//获取首页推荐歌单6条
export const reqHomePush = ()=>request('/personalized',{limit:6});

//获取首页最新音乐
export const reqHomeNewSong = ()=>request('/personalized/newsong');

//获取首页热歌榜
export const reqHotSongList = (data)=>request('/top/list',data);

//获取搜索框下的热搜列表
export const reqHotSearch = ()=>request('/search/hot');

//获取搜索框搜索建议
export const reqSearchSuggest = (keywords)=>request('/search/suggest',{keywords});

//关键词搜歌 可以是歌名
export const reqSearchSongs = (keywords)=>request('/search',keywords);

