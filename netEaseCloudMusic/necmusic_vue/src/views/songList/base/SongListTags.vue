<template>
     <div class="header-desc">
      <div class="tags">
        标签：
        <span class="tag" v-for="tag in tags" :key="tag">{{tag}}</span>
      </div>
      <div class="desc-content">
        <p>简介：{{descContent}}</p>
      </div>
    </div>
</template>

<script>

export default {
    name:'SongListTags',
    props:['tags','descContent'],
    data(){
        return {
            
        }
    },
    methods:{
        
    },
}

</script>

<style scoped lang='less'>
      /*标签,简介*/
  .header-desc {
    box-sizing: border-box;
    width: 100vw;
    height: 117px;
    padding: 10px 10px 10px 15px;
    font-size: 14px;
    color: #666666;
    line-height: 1.4;
    .tags {
      height: 22px;
      width: 100%;
      margin-bottom: 10px;
      .tag {
        display: inline-block;
        font-size: 12px;
        border: 1px solid #eee;
        border-radius: 10px;
        margin-right: 10px;
        padding: 1px 8px;
      }
    }
  }
</style>