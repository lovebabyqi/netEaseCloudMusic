import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = ()=>import(/*webpackChunkName:'home'*/'../views/home/Home.vue')
const SongList = ()=>import(/*webpackChunkName:'songList'*/'../views/songList/SongList.vue');
const PlayPage = ()=>import(/*webpackChunkName:'playPage'*/'../views/playPage/PlayPage.vue');
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{index:0}
  },
  {
    path: '/songList',
    name: 'SongList',
    component: SongList,
    meta:{index:1}
  }
]

const router = new VueRouter({
  routes
})

export default router
