<template>
  <div class="main">
    <div class="header">
      <div class="img">
        <img class="img_logo" src="../../../static/images/logo.png" mode="widthFix" alt="康贝贝">
        <img class="img_bg" src="../../../static/images/bg.png" mode="widthFix" alt="眼睛">
      </div>
    </div>
    <div class="text">
      <p>康贝贝测视力</p>
    </div>    
    <div class="footer">
      <button class="btn" v-show="flag" open-type="getUserInfo" @getuserinfo="getPerson" :disabled="saveFlag">
        进入康贝贝～
      </button>
      <button class="btn" v-show="!flag" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :disabled="saveFlag">
        授权
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data(){
    return {
      userInfo: {},
      openId: '',
      phoneNumber: '',
      code: '',
      session_key: '',
      flag: true // 授权用户信息
    }
  },
  computed: {
    ...mapState(['saveFlag'])
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setConfig', 'setSaveFlag']),
    getPerson(event) {
      const detail = event.mp.detail;
      if(!this.saveFlag && detail.userInfo) {
        const userInfo = event.mp.detail.userInfo;
        // 禁用按钮
        this.setSaveFlag(true);
        this.setUserInfo(userInfo);
        this.userInfo = userInfo;
        // 根据code获取openid和session_key
        wx.login({
          success: res => { 
            if (res.code) {
              this.code = res.code;
              let r = this.$service.getOpenId({code: res.code})
              r.then(v => {
                // 获取到openid和session_key，user_id
                this.setConfig(v.data)
                this.openId = v.data.openid;
                this.session_key = v.data.session_key;
                // 获取缓存里面的手机号
                let phone = wx.getStorageSync('phoneNumber');
                if(phone) {
                  this.phoneNumber = phone;
                  // 保存用户信息
                  this.save_user_info();
                } else {
                  // 显示授权手机号的按钮
                  this.flag = false;
                  // 启用按钮
                  this.setSaveFlag(false);
                }
              }).catch(e => {
                // 启用按钮
                this.setSaveFlag(false);
              })
            } else {
              // 启用按钮
              this.setSaveFlag(false);
              wx.showModal({
                title: '提示',
                content: res.errMsg,
                showCancel: false
              })
            }
          },
          fail(error){
            // 启用按钮
            this.setSaveFlag(false);
            wx.showModal({
              title: '提示',
              content: error,
              showCancel: false
            })
          }
        })
      }
    },
    mounted(){
      this.flag = true;
      // 启用按钮
      this.setSaveFlag(false);
    },
    //  获取手机号码
    getPhoneNumber(e) {
      // 判断是否授权
      const target = e.target;
      // 已授权
      if(target.iv && !this.saveFlag) {
        //  禁用按钮
        this.setSaveFlag(true);
        const data = {
          iv: e.target.iv,
          session_key: this.session_key,
          encryptedData: e.target.encryptedData
        }
        let s = this.$service.getPhoneNum(data);
        s.then(res => {
          if(res.code === 200) {
            this.phoneNumber = res.data.phoneNumber;
            // 设置手机号缓存
            wx.setStorageSync('phoneNumber', res.data.phoneNumber);
            // 保存用户信息
            this.save_user_info();
          }
        }).catch(error => {
          // 启用按钮
          this.setSaveFlag(false);
          wx.showModal({
            title: '提示',
            content: error,
            showCancel: false
          })
        })
      }
    },
    save_user_info() {
      // 保存用户信息
      const d = {
        head: this.userInfo.avatarUrl,
        city: this.userInfo.city,
        country: this.userInfo.country,
        gendel: this.userInfo.gender,
        mobilePhone: this.phoneNumber,
        openId: this.openId,
        province: this.userInfo.province,
        userName: this.userInfo.nickName
      }
      let s = this.$service.save_userInfo(d);
      s.then(res => {
        this.flag = true;
        // 跳转到身高界面
        wx.navigateTo({
          url: "/pages/height/main"
        })
      }).catch(error => {
        // 启用按钮
        this.setSaveFlag(false);
        wx.showModal({
          title: '提示',
          content: error,
          showCancel: false
        })
      })
    }
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
  .header{
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img{
      width: 280rpx;
      height: 280rpx;
      position: relative;
      z-index: 1;
      .img_logo{
        position: absolute;
        top: 0;
        left: 0;
        width: 280rpx;
        height: 280rpx;
        z-index: 3;
      }
      .img_bg{
        width: 500rpx;
        height: 400rpx;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2; 
        margin-left: -345rpx;
        margin-top: -300rpx;
      }
    }
  }
  .text{
    height: 31%;
    text-align: center;
    color: #A5A5A7;
    font-size: 25rpx;
    padding-top: 70rpx;
    p{
      letter-spacing: 16rpx;
      font-family:Arial, Helvetica, sans-serif;
    }
  }
  .footer{
    height: 12%;
    width: 84%;
    height: 8%;
    overflow: hidden;
    border: 1rpx solid #7BC1F1;
    border-radius: 50rpx;
    position: absolute;
    bottom: 7%;
    display: flex;
    align-items: center;
    justify-content: center;
    -moz-box-shadow:0px 2px 3px #B8E8FF; 
    -webkit-box-shadow:0px 2px 3px #B8E8FF; 
    box-shadow:0px 2px 3px #B8E8FF;
    .btn{
      background: #fff;
      width: 100%;
      color: #00A0E9;
      vertical-align: middle;
      font-weight: normal;
      font-size: 30rpx;
      &:after{
        border: 0; 
      }
    }
  }
}
  
</style>
