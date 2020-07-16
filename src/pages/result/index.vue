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
          <p class="small">{{leftEyeSub}}</p>
        </div>
      </div>
      <div class="circle">
        <div class="circle_1"></div>
        <div class="circle_2"></div>
        <div class="circle_3">
          <p class="sight">右眼视力</p>
          <p class="num">{{rightEye}}</p>
          <p class="small">{{rightEyeSub}}</p>
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
    <div class="img">
      <img src="../../../static/images/bg.png" alt="眼睛">
    </div>
    <div class="share">
      <div class="share_more">
        <img class="finger" src="../../../static/images/finger.png" alt="手指">
        <p class="more">了解更多护眼方法大全</p>
      </div>
      <img @click="showModal" class="focus" src="../../../static/images/focus.png" alt="关注">
    </div>
    <div class="tips" v-if="showTipsFlag">
      <div class="mask"></div>
      <div class="modal_div">
        <div class="close_img">
          <img @click="close" src="../../../static/images/fork.png" alt="关闭">
        </div>
        <p>在客服对话中回复数字1</p>
        <p>关注【康贝贝博士】</p>
        <button class="click_here" open-type="contact" @click="go">
          去关注
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            leftEye: '',
            leftEyeSub:'',
            rightEye: '',
            rightEyeSub:'',
            shareImage: '',
            painting: {},
            userInfo: {},
            showTipsFlag: false,
            arr: [
              {sm: '0.1', big: '4.0'},
              {sm: '0.12', big: '4.1'},
              {sm: '0.15', big: '4.2'},
              {sm: '0.2', big: '4.3'},
              {sm: '0.25', big: '4.4'},
              {sm: '0.3', big: '4.5'},
              {sm: '0.4', big: '4.6'},
              {sm: '0.5', big: '4.7'},
              {sm: '0.6', big: '4.8'},
              {sm: '0.8', big: '4.9'},
              {sm: '1.0', big: '5.0'},
              {sm: '1.2', big: '5.1'},
              {sm: '1.5', big: '5.2'},
              {sm: '2.0', big: '5.3'}
            ]
        }
    },
    computed: {
      ...mapState(['config'])
    },
    onLoad(q) {
      this.leftEye = q.leftEye;
      this.leftEyeSub = this.getEyesightSub(q.leftEye);
      this.rightEye = q.rightEye;
      this.rightEyeSub = this.getEyesightSub(q.rightEye);
      this.userInfo = wx.getStorageSync('userInfo');
    },
    methods: {
      ...mapMutations(['setPreFlag']),
      getEyesightSub(eye){
        let s, a = this.arr;
        for(var i in a) {
          let c = Object.values(a[i]);
          if(c[0]*1 === eye*1) {
            s = c[1];
            break;
          } else if(c[1]*1 === eye*1) {
            s = c[0];
            break;
          } 
        }
        return s;
      },
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
            width: 390,
            height: 720,
            clear: true,
            views: [
              {
                type: 'rect',
                background: '#F6FCFF',
                top: 0,
                left: 0,
                width: 390,
                height: 800
              },
              {
                type: 'text',
                content: '视力测量结果',
                fontSize: 21,
                color: '#00A0E9',
                textAlign: 'left',
                top: 40,
                left: 20
              },
              {
                type: 'image',
                url: user.avatarUrl,
                top: 115,
                left: 35,
                width: 55,
                height: 55
              },
              {
                type: 'image',
                url: '/static/images/white.png',
                top: 115,
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
                top: 132,
                left: 265,
                bolder: true,
                breakWord: true,
                MaxLineNumber: 2
              },
              {
                type: 'image',
                url: '/static/images/bg.png',
                top: 275,
                left: -209,
                width: 360,
                height: 270
              },
              {
                type: 'image',
                url: '/static/images/sight_view.png',
                top: 180,
                left: 15,
                width: 360,
                height: 200
              },
              {
                type: 'image',
                url: '/static/images/circle.png',
                top: 210,
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
                top: 250,
                left: 80,
              },
              {
                type: 'text',
                content: this.leftEye,
                fontSize: 34,
                color: '#00A0E9',
                textAlign: 'left',
                top: 270,
                left: 80,
              },
              {
                type: 'text',
                content: this.leftEyeSub,
                fontSize: 12,
                color: '#424242',
                textAlign: 'left',
                top: 310,
                left: 95,
              },
              {
                type: 'image',
                url: '/static/images/circle.png',
                top: 210,
                left: 213,
                width: 140,
                height: 140
              },
              {
                type: 'text',
                content: '右眼视力',
                fontSize: 12,
                color: '#9E9E9E',
                textAlign: 'left',
                top: 250,
                left: 260,
              },
              {
                type: 'text',
                content: this.rightEye,
                fontSize: 34,
                color: '#00A0E9',
                textAlign: 'left',
                top: 270,
                left: 260,
              },
              {
                type: 'text',
                content: this.rightEyeSub,
                fontSize: 12,
                color: '#424242',
                textAlign: 'left',
                top: 310,
                left: 277,
              },
              {
                type: 'image',
                url: '/static/images/qr_code1.jpeg',
                top: 460,
                left: 130,
                width: 120,
                height: 120
              },
              {
                type: 'text',
                content: '关 注 公 众 号，了 解 更 多 护 眼 方 法 大 全',
                fontSize: 12,
                color: '#9E9E9E',
                textAlign: 'left',
                top: 610,
                left: 75
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
      showModal(){
        this.showTipsFlag = true;
      },
      go(){
        this.showTipsFlag = false;
      },
      close() {
        this.showTipsFlag = false;
      }
    },
    onShareAppMessage(t) {
      return "button" === t.from && {
        title: "康贝贝测视力",
        path: "/pages/index/main"
      };
    },
    onShow() {
      // 显示准备界面
      this.setPreFlag(true);
      this.shareImage = '';
      this.painting = {};
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
        font-weight: 600;
      }
    }
    .result{
      width: 92%;
      height: 36%;
      margin: 25rpx;
      z-index: 5;
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
        height: 400rpx;
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
          .small{
            font-size: 22rpx;
            color: #424242;
          }
        }
      }
    }
    .btn_arr{
      width: 100%;
      height: 15%;
      z-index: 4;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .btn{
        width: 274rpx;
        height: 78rpx;
        border: 2rpx solid #52C8FF;
        border-radius: 50rpx;
        font-size: 27rpx;
        color: #00A0E9;
        background: transparent;
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
    .img{
      position: absolute;
      top: 43%;
      left: -36%;
      z-index: 2;
      // bottom: 234rpx;
    }
    .share{
      width: 100%;
      height: 31%;
      .share_more{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        bottom: 249rpx;
        padding-left: 27rpx;
        .finger{
          width: 47rpx;
          height: 62rpx;
          z-index: 8;
        }
        .more{
          padding-left: 10rpx;
          font-size: 25rpx;
          color: #A3A3A3;
        }
      }
      .focus{
        width: 100%;
        height: 200rpx;
        position: absolute;
        bottom: 0;
      }
    }
    .tips{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      .mask{
        width:100%;
        height:100%;
        position:fixed;
        background-color: #000;
        top:0;
        left:0;
        opacity: 0.5;
      }
      .modal_div{
        width: 67%;
        height: 350rpx;
        background: #fff;
        border-radius: 16rpx;
        z-index: 110;
        display: flex;
        flex-direction: column;
        align-items: center;
        .close_img{
          width: 60rpx;
          height: 80rpx;
          align-self: flex-end;
          img{
            width: 35rpx;
            height: 77rpx;
            padding-right: 20rpx;
          }
        }
        p{
          font-size: 30rpx;
          padding: 10rpx 0;
        }
        button{
          width: 304rpx;
          height: 86rpx;
          background: #2098EE;
          border-radius: 40rpx;
          color: #fff;
          font-size: 30rpx;
          margin-top: 36rpx;
          line-height: 86rpx;
          &:after{
            border: 0; 
          }
        }
      }
    }
    // .share{
    //   width: 92%;
    //   height: 30%;
    //   padding-top: 5%;
    //   box-sizing: border-box;
    //   .click{
    //     width: 100%;
    //     height: 15%;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: center;
    //     align-items: center;
    //     .here{
    //       font-size: 28rpx;
    //       color: #00A0E9;
    //       font-weight: bold;
    //       text-decoration: underline;
    //       letter-spacing: 4rpx;
    //     }
    //     .click_here {
    //       width: 80%;
    //       margin-top: 20rpx;
    //       background-color: #F6FCFF;
    //       display: flex;
    //       flex-direction: row;
    //       align-items: center;
    //       justify-content: center;
    //       &:after{
    //         border: 0; 
    //       }
    //       .btnImg {
    //         margin-left: 30rpx;
    //         width: 40rpx;
    //         height: 28rpx;
    //       }
    //       span{
    //         font-size: 26rpx;
    //         color: #00A0E9;
    //         font-weight: bold;
    //         text-decoration: underline;
    //       }
    //     }
    //     .img{
    //       width: 5%;
    //       height: 58%;
    //       padding-left: 4%;
    //       img{
    //         max-width: 100%;
    //         max-height: 100%;
    //       }
    //     }
    //   }
    //   .focus{
    //     width: 100%;
    //     height: 10%;
    //     text-align: center;
    //     padding: 20rpx;
    //     font-size: 24rpx;
    //     color: #C2C2C2;
    //     letter-spacing: 4rpx;
    //   }
    // }
  }
</style>