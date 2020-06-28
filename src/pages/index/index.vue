<template>
  <div class="main">
    <div class="header">
      <img src="../../../static/images/logo.png" mode="widthFix" alt="康贝贝">
    </div>
    <div class="text">
      <p>康贝贝测视力</p>
    </div>    
    <div class="footer">
      <button class="btn" v-show="flag" open-type="getUserInfo" @getuserinfo="getPerson">
        授权
      </button>
      <button class="btn" v-show="!flag" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        进入康贝贝～
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
  methods: {
    ...mapMutations(['setUserInfo', 'setConfig']),
    getPerson(event) {
      const userInfo = event.mp.detail.userInfo;
      if(userInfo) {
        this.setUserInfo(userInfo);
        this.userInfo = userInfo;
        // false为授权电话号码
        this.flag = false;
        // 根据code获取openid和session_key
        wx.login({
          success: res => { 
            if (res.code) {
              this.code = res.code;
              let r = this.$service.getOpenId({code: res.code})
              r.then(v => {
                // 获取到openid和session_key
                this.setConfig(v.data)
                this.openId = v.data.openid;
                this.session_key = v.data.session_key;
              }).catch(e => {
                
              })
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
    //  获取手机号码
    getPhoneNumber(e) {
      console.log('获取手机号码来了。。。。')
      const data = {
        iv: e.target.iv,
        session_key: this.session_key,
        encryptedData: e.target.encryptedData
      }
      console.log('data', data)
      let s = this.$service.getPhoneNum(data);
      s.then(res => {
        console.log('res', res)
        if(res.code === 200) {
          this.phoneNumber = res.data.phoneNumber;
          // 保存用户信息
          this.save_user_info();
          // 跳转到身高界面
          wx.navigateTo({
            url: "/pages/height/main"
          })
        }
      }).catch(error => {
        
      })
    },
    save_user_info() {
      console.log('保存用户信息来了。。。。')
      // 保存用户信息
      const d = {
        head: this.userInfo.avatarUrl,
        city: this.userInfo.city,
        country: this.userInfo.country,
        gendel: this.userInfo.gender,
        mobilePhone: this.phoneNumber,
        openId: this.openId,
        province: this.userInfo.province,
        // unionId: ,
        // userToken: '',
        userName: this.userInfo.nickName
      }
      let s = this.$service.save_userInfo(d);
      s.then(res => {
        console.log('保存用户信息成功')
      }).catch(error => {
        console.log('保存用户信息失败')
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
  justify-content: center;
  .header{
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 200rpx;
      height: 200rpx;
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
    overflow: hidden;
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
      background: #fff;
      width: 100%;
      color: #00A0E9;
      vertical-align: middle;
      &:after{
        border: 0; 
      }
    }
  }
}
  
</style>
