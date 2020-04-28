<template>
  <div class="comment-item" v-if="Object.keys(comment).length!==0">
    <div class="comment-left">
      <img :src="comment.userPic" class="head-pic" alt />
    </div>
    <div class="comment-right">
      <div class="right-top">
        <div class="user">
          <div class="name">{{comment.userName}}</div>
          <div class="time">{{comment.time|stringTime}}</div>
        </div>
        <span class="count"><span>{{comment.count}}</span>   <span class='count-icon'></span></span>
      </div>
      <div class="right-bottom">
        <p>
            <span v-if='Object.keys(comment.beReplied).length!==0'>
                回复
                <span class='rep-name'>@{{comment.beReplied[0].user.nickname}}：</span>
                </span>
                {{comment.content}}
            </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: ["comment"],
  data() {
    return {};
  },
  filters:{
      stringTime(time){
          let date = new Date(JSON.parse(time)).toLocaleDateString();
          return date.replace('/','年').replace('/','月')+'日';
      }
  },
  methods: {}
};
</script>

<style scoped lang='less'>
.comment-item {
  position: relative;
  width: 100vw;
  padding: 10px;
  overflow: hidden;
  .comment-left {
    float: left;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    .head-pic {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .comment-right {
    padding-left: 10px;
    overflow: hidden;
    .right-top{
        display:flex;
        justify-content: space-between;
        .user{
            .name{
                line-height:20px;
                font-size:14px;
                color:#666666;
            }
            .time{
                font-size:12px;
                color:#999;
            }
        }
        .count{
            color:#666666;
            font-size:12px;
            .count-icon{
                display:inline-block;
                margin-left:5px;
                width:12px;
                height:12px;
                background: url('../../assets/images/count.png');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: 0 0;
            }
        }
    }
    .right-bottom p{
        margin-top:10px;
        color:#333;
        vertical-align: middle;
        font: 14px/1.5 Helvetica,sans-serif,STHeiTi;
        border-bottom:.5px solid #eee;
        .rep-name{
            color:#507DAF;
        }
    }
  }
}
</style>