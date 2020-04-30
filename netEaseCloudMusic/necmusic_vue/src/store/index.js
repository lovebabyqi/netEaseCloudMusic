import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMini:true,//初始显示miniPlayer
    isPlaying:false,//播放状态,默认false,要让audio加载好才能控制play,pause
    playingSongId:''
  },
  mutations: {
    changePlayer(state,{status}){  //切换播放页显示
      switch (status) {
        case 0:
          state.showMini = false;
          break;
        case 1:
          state.showMini = true;
          break;
        default:
          break;
      }
    },
    changeStatus(state,{status}){  //控制播放暂停
      switch (status) {
        case 0:
          state.isPlaying = false;
          break;
        case 1:
          state.isPlaying = true;
          break;
        default:
          state.isPlaying = !state.isPlaying;
      }
    },
    changeSong(state,songId){ //切歌
      state.playingSongId = songId
    }
  },
  actions: {
  },
  modules: {
  }
})
