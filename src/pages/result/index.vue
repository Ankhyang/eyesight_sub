<template>
  <div class="container">
    <div class="top">
      <div class="img">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
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
      <!-- <div style="display: flex;flex-direction: row;width: 100%;height: 100%;justify-content: center;position: absolute;">
        <img :src="shareImage" class="share-image"/>
      </div> -->
      <canvasdrawer :painting="painting" @getImage="eventGetImage"/>
    </div>
    <div class="btn_arr">
        <button class="btn" open-type="share">让朋友测一下～</button>
        <button class="btn" @click="eventDraw">保存至手机相册～</button>
    </div>
    <div class="share">
      <div class="click">
        <button class="click_here" open-type="contact">
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
            leftEye: '3.3',
            rightEye: '3.3',
            time: '2020-06-23',
            eRow: '22',
            shareImage: '',
            painting: {}
        }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    onLoad(q) {
      this.leftEye = q.leftEye;
      this.rightEye = q.rightEye;
      this.time = q.time;
      this.eRow = q.eRow;
    },
    methods: {
      eventGetImage (event) {
        wx.hideLoading();
        this.shareImage = event.target.tempFilePath;
        console.log(this.shareImage);
        // 获取用户授权信息
        wx.getSetting({
          success(res) {
            // true则已经授权
            if (res.authSetting['scope.writePhotosAlbum']) {
              this.save_photo();
            } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) { // 第一次授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  this.save_photo();
                },
                fail(){
                  wx.showToast({
                    title: '您没有授权，无法保存到相册',
                    icon: 'none'
                  })
                }
              })
            } else {
              wx.openSetting({
                success(res) {
                  if (res.authSetting['scope.writePhotosAlbum']) {
                    this.save_photo();
                  }else{
                    wx.showToast({
                        title:'您没有授权，无法保存到相册',
                        icon:'none'
                    })
                  }
                }
              })
            }
          }
        });
      },
      eventDraw () {
        wx.showLoading({
          title: '图片生成中...',
          mask: true
        })
        // let user = wx.getStorageSync('userInfo');
        let user = this.userInfo;
        console.log('user', user)
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
            // {
            //   type: 'image',
            //   url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
            //   top: 27.5,
            //   left: 29,
            //   width: 55,
            //   height: 55
            // },
            {
              type: 'text',
              content: user.nickName,
              fontSize: 18,
              color: '#00A0E9',
              textAlign: 'left',
              top: 90,
              left: 260,
              bolder: true
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
              fontSize: 35,
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
              fontSize: 35,
              color: '#00A0E9',
              textAlign: 'left',
              top: 240,
              left: 247,
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
            }
          });
        }
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
      padding: 10rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .img{
        width: 19%;
        height: 73%;
        margin-right: 20%;
        img{
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
        }
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
    // .canvas{
    //   position: absolute;
    //   z-index: 11;
    //   width: 80%;
    //   height: 60%;
    //   border: 2rpx solid red;
    // }
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