<template>
  <div class="push-item">
    <div class="imgBox">
      <img :src="info.picUrl" alt />
      <span class="playCount">
        <img class="count-icon" src="../../../assets/images/erji.svg" alt />
        {{info.playCount|stringCount}}
      </span>
    </div>
    <p class="infoName">{{info.name}}</p>
  </div>
</template>

<script>
export default {
  name: "HomePushItem",
  props: ["info"],
  filters: {
    stringCount(count) {
      //40010368-->4001.0万
      if (count > 100000000) {
        let _count = (count / 100000000).toString().split(".");
        return _count[1][0] === "0"
          ? _count[0] + "亿"
          : _count[0] + "." + _count[1][0] + "亿";
      } else {
        let _count = (count / 10000).toString().split(".");
        return _count[1][0] === "0"
          ? _count[0] + "万"
          : _count[0] + "." + _count[1][0] + "万";
      }
    }
  }
};
</script>

<style scoped lang='less'>
.push-item {
  margin: 5px 0;
  width: 122px;
  .imgBox {
    position: relative;
    width: 122px;
    height: 122px;
    img {
      width: 122px;
      height: 122px;
    }
    .playCount {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 12px;
      color: #fff;
      .count-icon {
        width: 13px;
        height: 13px;
        transform: translateY(10%);
      }
    }
  }
  .infoName {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 13px;
  }
}
</style>