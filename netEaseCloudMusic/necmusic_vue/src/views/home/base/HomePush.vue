<template>
  <div class="home-push">
    <div class="home-title">
      <span>推荐歌单</span>
    </div>
    <div class="push-list">
      <home-push-item
        v-for="item in pushList"
        :key="item.id"
        :info="item"
        @click.native="goPlayList(item.id)"
      ></home-push-item>
    </div>
    <div class="home-title">
      <span>最新音乐</span>
    </div>
    <music-list
      v-for="song in newSongList"
      :key="song.id"
      :songInfo="song"
      @click.native="goPlayer(song.id)"
    ></music-list>
    <home-footer></home-footer>
  </div>
</template>

<script>
import { reqHomePush, reqHomeNewSong } from "../../../api/home";
import HomePushItem from "./HomePushItem";
import MusicList from "../../../components/music-list/MusicList";
import HomeFooter from "./HomeFooter";
export default {
  name: "HoemPush",
  data() {
    return {
      pushList: [],
      newSongList: []
    };
  },
  created() {
    this.getHomePush();
  },
  methods: {
    async getHomePush() {
      const result1 = await reqHomePush(); //获取首页推荐歌单
      this.pushList = Object.freeze(result1.result); //不需要响应式
      const result2 = await reqHomeNewSong(); //获取首页最新音乐
      let showNewSongList = result2.result.map(item => {
        return {
          id: item.id, //歌曲id,后面需要根据id请求播放
          name: item.song.name, //歌名
          desc: item.song.alias[0] || "", //歌名额外描述,可能没有
          singer: item.song.artists[0].name, //歌手名
          status: item.song.album.status //是否sq音质 0为sq
        };
      });
      this.newSongList = Object.freeze(showNewSongList); //不需要响应式
    },
    goPlayer(id) {
      //播放单曲
      this.$router.push({
        path: "/playPage",
        query: { songId: id }
      });
    },
    goPlayList(listId) {
      //打开歌单
      this.$router.push({
        path: "/songList",
        query: { listId: listId },
        params: {
          listId
        }
      });
    }
  },
  components: {
    HomePushItem,
    MusicList,
    HomeFooter
  }
};
</script>

<style scoped lang='less'>
.home-title {
  padding: 20px 0 9px 0;
  span {
    display: inline-block;
    padding-left: 5px;
    font-size: 17px;
    border-left: 2px solid red;
  }
}
.push-list {
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>