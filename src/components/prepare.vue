<template>
    <div class="container">
        <div class="img">
            <img :src="to === 'left_test' ? '../../static/images/left_tip.png':'../../static/images/right_tip.png'" alt="遮眼">
        </div>
        <div class="tips">
            <p class="hide">{{to === 'left_test' ? '遮右眼':'遮左眼'}}</p>
            <p class="direction">根据E标开口方向，选择点击对应的方向按钮</p>
        </div>
        <div class="btn" @click="goToTest">
            <span>已准备好，开始测量</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: 'left_test'
        },
        distance: {
            type: Number,
            default: 30
        }
    },
    data() {
        return {
            tips: ''
        }
    },
    methods: {
        goToTest() {
            if(this.to === 'left_test') {
                wx.navigateTo({
                    url: `/pages/left_test/main?type=${this.to}&distance=${this.distance}`
                })
            } else {
                wx.navigateTo({
                    url: `/pages/right_test/main?type=${this.to}&distance=${this.distance}`
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
page{
    height: 100%;
    font-family:Arial, Helvetica, sans-serif;
}
.container{
    width: 100%;
    height: 100%;
    background: #F6FCFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img{
        width: 59%;
        height: 49%;
        margin-top: 12%;
        position: relative;
        &:before{
            content: '手臂伸直';
            position: absolute;
            top: 22%;
            left: 15%;
            font-size: 27rpx;
            color: #ADADAD;
        }
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .tips{
        height: 15%;
        margin-bottom: 12%;
        .hide{
            font-weight: bold;
            text-align: center;
            padding-bottom: 20rpx;
        }
        .direction{
            font-size: 26rpx;
            color: #666;
        }
    }
    .btn{
        height: 10%;
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
        span{ 
            color: #00A0E9;
        }
    }
}
</style>