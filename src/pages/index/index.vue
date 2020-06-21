<template>
  <div class="main">
    <div class="header">
      <img src="../../../static/images/logo.png" mode="widthFix" alt="康贝贝">
    </div>
    <div class="text">
      <p>康贝贝测视力</p>
    </div>    
    <div class="footer">
      <img src="../../../static/images/come_beibei.png" @tap="goToBei" alt="进入康贝贝">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    goToBei() {
      wx.navigateTo({
        url: "/pages/height/main"
      })
    }
  },
  created () {
    
  }
}
</script>

<style lang="less" scoped>
.main{
  width: 100%;
  height: inherit;
  background: #fff;
  .header{
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 270rpx;
      height: 270rpx;
    }
  }
  .text{
    height: 31%;
    text-align: center;
    color: #A5A5A7;
    font-size: 27rpx;
    p{
      letter-spacing: 15rpx;
      font-family:Arial, Helvetica, sans-serif;
    }
  }
  .footer{
    height: 12%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
}
  
</style>
