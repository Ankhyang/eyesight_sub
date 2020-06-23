<template>
  <div class="container">
    <div class="top">
      <div class="img">
        <img src="../../../static/images/portrait.png" alt="">
      </div>
      <span>陈小贝</span>
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
    <div class="btn_arr">
        <button class="btn" open-type="share">让朋友测一下～</button>
        <button class="btn" @click="savePhoto">保存至手机相册～</button>
    </div>
    <div class="share">
      <div class="click">
        <p class="here">点击这里</p>
        <div class="img">
          <img src="../../../static/images/click_here.png" alt="点击这里">
        </div>
      </div>
      <p class="focus">关注公众号“了解护眼方法大全”</p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            leftEye: '3.3',
            rightEye: '3.3',
            time: '2020-06-23',
            eRow: '22',
            savedImgUrl: ''
        }
    },
    onLoad(q) {
      this.leftEye = q.leftEye;
      this.rightEye = q.rightEye;
      this.time = q.time;
      this.eRow = q.eRow;
    },
    methods: {
      savePhoto() {
        
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
    .share{
      height: 30%;
      padding-top: 21%;
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
        .img{
          width: 5%;
          height: 91%;
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
        padding: 10rpx;
        font-size: 24rpx;
        color: #C2C2C2;
        letter-spacing: 4rpx;
      }
    }
  }
</style>