<template>
    <div class="song-list" v-if="Object.keys(playListInfo).length!==0">
        <top-nav/>
        <!-- header start -->
        <song-list-header
                :play-list-info="playListInfo"
        />
        <!-- header end -->
        <!-- 标签及简介 start -->
        <song-list-tags
                :tags="playListInfo.tags"
                :desc-content="playListInfo.description"
        />
        <!-- 标签及简介 end -->
        <!-- 歌曲列表 start-->
        <div class="play_list">
            <h3 class="list-title">歌曲列表</h3>
            <music-list-item
                    v-for="(song,index) in showSongList"
                    :key="song.id"
                    :index="index+1"
                    :songInfo="song"
                    @click.native="goPlayer(song.id)"
            />
        </div>
        <!-- 歌曲列表 end -->
        <!-- 精彩评论start -->
        <div class="comment-list">
            <h3 class="list-title">精彩评论</h3>
            <comment-item
                    v-for='comment in CommentList'
                    :key='comment.CommentId'
                    :comment='comment'/>
            <div class="load-more" @click='loadMore'>加载更多评论...</div>
        </div>
        <!-- 精彩评论end -->
    </div>
</template>

<script>
    import {getMusicUrl} from '../../api/music'
    import {reqGetSongList, reqGetSongListComments} from "../../api/songList";
    import TopNav from '../../components/top-nav/TopNav';//头部导航
    import MusicListItem from "../../components/music-list-item/MusicListItem";//
    import SongListHeader from "./base/SongListHeader";
    import SongListTags from "./base/SongListTags";
    import CommentItem from '../../components/comment-item/CommentItem'

    export default {
        name: "SongList",
        components: {
            MusicListItem,
            SongListTags,
            SongListHeader,
            CommentItem,
            TopNav
        },
        data() {
            return {
                listId: "",
                playListInfo: Object,
                showSongList: Array,
                CommentList: [],
                page: 1,//记录评论页数
            };
        },
        mounted() {
            this.listId = this.$route.query.listId;
            this.getSongList();
            this.getSongComments();
        },
        methods: {
            async getSongList() {
                //获取歌单
                const result = await reqGetSongList({id: this.listId});
                console.log(result)
                this.playListInfo = Object.freeze(result.playlist);
                let showSongList = result.playlist.tracks.map(item => {
                    return {
                        id: item.id, //歌曲id,后面需要根据id请求播放
                        name: item.al.name, //歌名
                        desc: "", //歌名额外描述,可能没有
                        singer: item.ar[0].name, //歌手名
                        status: 1 //是否sq音质 0为sq
                    };
                });
                this.showSongList = Object.freeze(showSongList); //不需要响应式
            },
            async getSongComments() {
                //获取歌单评论
                const result = await reqGetSongListComments({id: this.listId, offset: this.page * 20});
                console.log(result);
                let commentList = result.comments.map(item => {
                    return {
                        userName: item.user.nickname,//用户名
                        userId: item.user.userId,
                        userType: item.user.userType,
                        vipType: item.user.vipType,
                        userPic: item.user.avatarUrl,//用户头像
                        CommentId: item.commentId,//评论id
                        content: item.content,//评论内容
                        count: item.likedCount,//点赞数
                        liked: item.liked,//是否点了赞
                        time: item.time,//点赞时间
                        beReplied: item.beReplied || ''//回复评论,是回复加个@beReplied[0].user.nickname
                    }
                })
                this.CommentList.push(...Object.freeze(commentList));
            },
            loadMore() {
                this.page++;
                this.getSongComments()
            },
            async goPlayer(id) {
                this.$store.commit('changeSong', id);//切歌
            }
        }
    };
</script>

<style scoped lang='less'>
    .song-list {
        padding-top: 40px;
        /*歌曲列表*/

        .play_list {
            width: 100vw;
            overflow: hidden;

            .list-title {
                line-height: 23px;
                padding: 0 10px;
                font-size: 12px;
                background: #eeeff0;
                color: #666666;
            }
        }

        /*精彩评论*/

        .comment-list {
            .list-title {
                line-height: 23px;
                padding: 0 10px;
                font-size: 12px;
                background: #eeeff0;
                color: #666666;
            }

            .load-more {
                height: 55px;
                line-height: 55px;
                text-align: center;
            }
        }
    }
</style>
