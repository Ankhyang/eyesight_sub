<template>
  <div class="main">
    <div class="header">
      <img src="../../../static/images/logo.png" mode="widthFix" alt="康贝贝">
    </div>
    <div class="text">
      <p>康贝贝测视力</p>
    </div>    
    <div class="footer">
      <button class="btn" open-type="getUserInfo" @getuserinfo="getPerson">
        进入康贝贝～
      </button>
    </div>
  </div>
</template>

<script>
import config from '@/config/config.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getPerson(event) {
      const userInfo = event.mp.detail.userInfo;
      console.log(userInfo);
      if(userInfo) {
        this.setUserInfo(userInfo);
        // this.login();
        wx.navigateTo({
          url: "/pages/height/main"
        })
      }
    },
    login() {
      wx.login({
        success (res) {
          console.log('res',res)
          if (res.code) {
            //发起网络请求
            // wx.request({
            //   url: config.staticUrl + '/api/v1/wx/login',
            //   data: {
            //     code: res.code
            //   },
            //   success: function(e) {
            //     // 得到sessionID
            //     console.log(e);
            //   }
            // })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail(error){
          console.log('error',error);
        }
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
    .btn{
      width: 90%;
      height: 80%;
      line-height: 200%;
      background: #fff;
      color: #00A0E9;
      vertical-align: middle;
      &:after{
        border: 0; 
      }
    }
  }
}
  
</style>
