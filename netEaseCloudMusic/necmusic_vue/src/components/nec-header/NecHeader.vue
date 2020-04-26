<template>
  <div class="nec-header">
    <div class="header-content">
      <span>
        <img class="heder-icon" src="~../../assets/images/icon.png" alt />网易云音乐
      </span>
      <span class="right">vue版</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NecHeader"
};
</script>

<style scoped lang='less'>
.nec-header {
  position: fixed;
  width: 100vw;
  height: 84px;
  background-color: #d43c33;
  z-index:100;
  .header-content {
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    height: 84px;
    padding: 0 10px;
    font-family: Helvetica, sans-serif;
    font-size: 20px;
    line-height: 84px;
    color: #fff;
    img {
      width: 25px;
      height: 25px;
      transform: translateY(25%);
      margin-right: 5px;
    }
    .right {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 80px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 15px;
      background-color: #fff;
      color: #d43c33;
    }
  }
}
</style>