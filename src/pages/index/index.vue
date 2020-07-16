<template>
  <div class="main">
    <div class="header">
      <div class="img">
        <img class="img_logo" src="../../../static/images/logo1.png" mode="widthFix" alt="康贝贝">
        <p>视力检测工具</p>
        <img class="img_bg" :style="{width: sizeStyle.w+'rpx', height: sizeStyle.h+'rpx', marginLeft: sizeStyle.ml+'rpx', marginTop: sizeStyle.mt+'rpx'}" src="../../../static/images/bg.png" alt="眼睛">
      </div>
    </div>   
    <div class="footer">
      <button class="btn" v-show="flag" open-type="getUserInfo" @getuserinfo="getPerson" :disabled="saveFlag">
        进入～
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
      flag: true, // 授权用户信息
      sizeStyle: {w:600, h: 400, ml: -475, mt: -306},
      imgSize: {
        small: {w:600, h: 400, ml: -445, mt: -325},
        middle: {w:600, h: 400, ml: -475, mt: -306},
        max: {w:600, h: 420, ml: -455, mt: -330}
      }
    }
  },
  computed: {
    ...mapState(['saveFlag'])
  },
  onShow(){
    this.flag = true;
    // 启用按钮
    this.setSaveFlag(false);
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setConfig', 'setSaveFlag', 'setNextFlag']),
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
        // 禁用下一步按钮
        this.setNextFlag(true);
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
  },
  created() {
    wx.getSystemInfo({
      success: (res) => {
        let s = res.safeArea.width;
        if(s >= 320 && s< 374) {
          this.sizeStyle = this.imgSize['small']
        } else if(s >= 375 && s< 413) {
          this.sizeStyle = this.imgSize['middle']
        } else if(s >= 414 && s< 450){
          this.sizeStyle = this.imgSize['max']
        }
      },
      fail: function () {
      }
    })
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
    height: 80%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .img{
      width: 420rpx;
      height: 420rpx;
      margin-top: 38%;
      position: relative;
      z-index: 1;
      .img_logo{
        position: absolute;
        z-index: 3;
        // top: 20rpx;
        // left: 0;
        width: 420rpx;
        height: 420rpx;
      }
      .img_bg{
        position: absolute;
        z-index: 2; 
        top: 0;
        left: 0;
      }
      p{
        position: absolute;
        bottom: 0;
      }
    }
    p{
      width: 420rpx;
      text-align: center;
      color: #A5A5A7;
      text-indent: 14rpx;
      text-align: center;
      font-size: 25rpx;
      letter-spacing: 14rpx;
      font-family:Arial, Helvetica, sans-serif;
    }
  }
  .footer{
    width: 84%;
    height: 102rpx;
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
