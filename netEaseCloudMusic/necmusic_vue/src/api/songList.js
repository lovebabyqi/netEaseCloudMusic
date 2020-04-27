//歌单
import request from './request';

//根据歌单id获取歌单
export const reqGetSongList = (info)=>request('/playlist/detail',info);

//获取歌单评论 
export const reqGetSongListComments = (info)=>request('/comment/playlist',info)