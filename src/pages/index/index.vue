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
      openId: '',
      phone: '',
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
        // false为授权电话号码
        this.flag = false;
        wx.navigateTo({
          url: "/pages/height/main"
        })
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
      console.log(e)
      // 获取手机号码
      const data = {
        code: this.code,
        iv: e.target.iv,
        session_key: this.session_key,
        encryptedData: e.target.encryptedData
      }
      let s = this.$service.getPhoneNum('/api/v1/wx/getPhone', data, 'GET');
      console.log('s', s)
      s.then(res => {
        console.log('res', res)
      }).catch(error => {
        
      })
    },
    save_user_info() {
      // 保存用户信息
      const d = {
        city: userInfo.city,
        country: userInfo.country,
        gendel: userInfo.gender,
        // mobilePhone: userInfo.,
        openId: this.openId,
        province: userInfo.province,
        // unionId: ,
        userName: userInfo.nickName,
        // userToken: ''
      }
      let s = this.$service.save_userInfo(d)
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
