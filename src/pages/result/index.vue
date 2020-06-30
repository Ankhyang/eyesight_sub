<template>
  <div class="container">
    <div class="top">
      <img :src="userInfo.avatarUrl" alt="">
      <span>{{userInfo.nickName}}</span>
    </div>
    <div class="result">
      <div class="circle">
        <div class="circle_1"></div>
        <div class="circle_2"></div>
        <div class="circle_3">
          <p class="sight">左眼视力</p>
          <p class="num">{{leftEye}}</p>
        </div>
      </div>
      <div class="circle">
        <div class="circle_1"></div>
        <div class="circle_2"></div>
        <div class="circle_3">
          <p class="sight">右眼视力</p>
          <p class="num">{{rightEye}}</p>
        </div>
      </div>
    </div>
    <div class="canvas">
      <canvasdrawer :painting="painting" @getImage="eventGetImage"/>
    </div>
    <div class="btn_arr">
        <button class="btn" open-type="share">让朋友测一下～</button>
        <button class="btn" @click="eventDraw">保存至手机相册～</button>
    </div>
    <div class="share">
      <div class="click">
        <button class="click_here" open-type="contact" @contact="reply">
          <span>点击这里</span>
          <img class="btnImg" src="../../../static/images/click_here.png" alt="点击这里">
        </button>
      </div>
      <p class="focus">关注公众号“了解护眼方法大全”</p> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            leftEye: '',
            rightEye: '',
            shareImage: '',
            painting: {},
            resultStatus: !1,
            results: [],
            userInfo: {}
        }
    },
    computed: {
      ...mapState(['config'])
    },
    onLoad(q) {
      // var e = this, s = wx.getStorageSync("results") || [];
      // s.length > 1 && s.pop(), s.length >= 4 && (this.resultStatus = !0), 
      // s.unshift(q), wx.setStorageSync("results", s), this.leftEye = q.leftEye,
      // this.rightEye = q.rightEye, this.results = s;
      this.leftEye = q.leftEye;
      this.rightEye = q.rightEye;
      this.userInfo = wx.getStorageSync('userInfo');
      console.log('userInfo', this.userInfo)
    },
    methods: {
      eventGetImage (event) {
        wx.hideLoading();
        this.shareImage = event.target.tempFilePath;
        this.save_photo();
      },
      eventDraw () {
        if(this.shareImage === '') { // 不存在图片才去获取地址
          wx.showLoading({
            title: '图片生成中...',
            mask: true
          })
          let user = this.userInfo;
          this.painting = {
            width: 375,
            height: 555,
            clear: true,
            views: [
              {
                type: 'rect',
                background: '#F6FCFF',
                top: 0,
                left: 0,
                width: 375,
                height: 555
              },
              {
                type: 'text',
                content: '视力测量结果',
                fontSize: 20,
                color: '#00A0E9',
                textAlign: 'left',
                top: 20,
                left: 20
              },
              {
                type: 'image',
                url: user.avatarUrl,
                top: 70,
                left: 35,
                width: 55,
                height: 55
              },
              {
                type: 'image',
                url: '/static/images/white.png',
                top: 70,
                left: 35,
                width: 55,
                height: 55
              },
              {
                type: 'text',
                content: user.nickName,
                fontSize: 18,
                color: '#00A0E9',
                textAlign: 'left',
                top: 90,
                left: 260,
                bolder: true,
                breakWord: true,
                MaxLineNumber: 2
              },
              {
                type: 'image',
                url: '/static/images/sight_view.png',
                top: 150,
                left: 9,
                width: 360,
                height: 200
              },
              {
                type: 'image',
                url: '/static/images/circle.png',
                top: 180,
                left: 33,
                width: 140,
                height: 140
              },
              {
                type: 'text',
                content: '左眼视力',
                fontSize: 12,
                color: '#9E9E9E',
                textAlign: 'left',
                top: 220,
                left: 80,
              },
              {
                type: 'text',
                content: this.leftEye,
                fontSize: 34,
                color: '#00A0E9',
                textAlign: 'left',
                top: 240,
                left: 80,
              },
              {
                type: 'image',
                url: '/static/images/circle.png',
                top: 180,
                left: 203,
                width: 140,
                height: 140
              },
              {
                type: 'text',
                content: '右眼视力',
                fontSize: 12,
                color: '#9E9E9E',
                textAlign: 'left',
                top: 220,
                left: 250,
              },
              {
                type: 'text',
                content: this.rightEye,
                fontSize: 34,
                color: '#00A0E9',
                textAlign: 'left',
                top: 240,
                left: 250,
              },
              {
                type: 'image',
                url: '/static/images/qr_code.png',
                top: 380,
                left: 130,
                width: 120,
                height: 120
              },
              {
                type: 'text',
                content: '关注公众号，了解护眼方法大全',
                fontSize: 13,
                color: '#9E9E9E',
                textAlign: 'left',
                top: 520,
                left: 95,
                bolder: true
              }
            ]
          }
        } else { // 已经存在地址，则自动保存
          this.save_photo();
        }
      },
      save_photo() {
        if(this.shareImage) {
          wx.saveImageToPhotosAlbum({
            filePath: this.shareImage,
            success (res) {
              wx.showToast({
                title: '保存图片成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail(res){
              if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                      },
                      complete(finishData) {
                      }
                    })
                  }
                })
              }
            }
          });
        }
      },
      reply(e) {
        
        
      }
    },
    onShareAppMessage(t) {
      return "button" === t.from && {
        title: "康贝贝测视力",
        path: "/pages/index/main"
      };
    }
}
</script>

<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    background: #F6FCFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
      width: 100%;
      height: 18%;
      padding: 60rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      img{
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
      }
      span{
        font-size: 38rpx;
        color: #00A0E9;
      }
    }
    .result{
      width: 92%;
      height: 36%;
      margin: 25rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: #fff;
      border-radius: 24rpx;
      -moz-box-shadow: 4rpx 5rpx 16rpx #6BCEFF;
      -webkit-box-shadow: 4rpx 5rpx 16rpx #6BCEFF;
      box-shadow: 4rpx 5rpx 16rpx #6BCEFF;
      .circle{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        .circle_1{
          width: 250rpx;
          height: 250rpx;
          background: #00A0E9;
          border-radius: 50%;
          position: absolute;
          top: 80rpx;
          left: 50rpx;
        }
        .circle_2{
          width: 230rpx;
          height: 230rpx;
          background: #DFDFDF;
          border-radius: 50%;
          position: absolute;
          left: 60rpx;
          top: 90rpx;
        }
        .circle_3{
          width: 210rpx;
          height: 210rpx;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          left: 70rpx;
          top: 100rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .sight{
            font-size: 24rpx;
            color: #B5B5B5;
          }
          .num{
            font-size: 72rpx;
            color: #00A0E9;
          }
        }
      }
    }
    .btn_arr{
      width: 100%;
      height: 15%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .btn{
        width: 40%;
        height: 45%;
        border: 2rpx solid #00A0E9;
        border-radius: 50rpx;
        font-size: 30rpx;
        color: #00A0E9;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        -moz-box-shadow: 4rpx 5rpx 12rpx #9EDFFF;
        -webkit-box-shadow: 4rpx 5rpx 12rpx #9EDFFF;
        box-shadow: 4rpx 5rpx 12rpx #9EDFFF;
        &:after{
          border-color:transparent;
        }
      }
      .btn_save{
        margin-right: 6%;
      }
    }
    // .share-image {
    //   width: 900rpx;
    //   height: 800rpx;
    //   margin: 0 75rpx;
    //   border: 2rpx solid black;
    //   position: absolute;
    //   z-index: 222;
    // }
    .share{
      width: 92%;
      height: 30%;
      padding-top: 5%;
      box-sizing: border-box;
      .click{
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .here{
          font-size: 28rpx;
          color: #00A0E9;
          font-weight: bold;
          text-decoration: underline;
          letter-spacing: 4rpx;
        }
        .click_here {
          width: 80%;
          margin-top: 20rpx;
          background-color: #F6FCFF;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          &:after{
            border: 0; 
          }
          .btnImg {
            margin-left: 30rpx;
            width: 40rpx;
            height: 28rpx;
          }
          span{
            font-size: 26rpx;
            color: #00A0E9;
            font-weight: bold;
            text-decoration: underline;
          }
        }
        .img{
          width: 5%;
          height: 58%;
          padding-left: 4%;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
      .focus{
        width: 100%;
        height: 10%;
        text-align: center;
        padding: 20rpx;
        font-size: 24rpx;
        color: #C2C2C2;
        letter-spacing: 4rpx;
      }
    }
  }
</style>