<template>
  <div class="main">
    <div class="header">
      <img src="../../../static/images/logo.png" mode="widthFix" alt="康贝贝">
    </div>
    <div class="text">
      <p>康贝贝测视力</p>
    </div>    
    <div class="footer" @tap="goToBei">
        <span>进入康贝贝～</span>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    width: 86%;
    height: 7%;
    border: 2rpx solid #00A0E9;
    border-radius: 50rpx;
    position: absolute;
    bottom: 7%;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    -moz-box-shadow:0px 2px 5px #9EE0FF; 
    -webkit-box-shadow:0px 2px 5px #9EE0FF; 
    box-shadow:0px 2px 5px #9EE0FF;
    span{ 
        color: #00A0E9;
    }
  }
}
  
</style>
