<template>
    <div class="container">
        <div class="img">
            <img :src="to === 'left_test' ? '../../static/images/left_tip.png':'../../static/images/right_tip.png'" alt="遮眼">
        </div>
        <div class="tips">
            <p class="hide">{{to === 'left_test' ? '遮右眼':'遮左眼'}}</p>
            <p class="direction">根据E标开口方向，选择点击对应的方向按钮</p>
        </div>
        <div class="btn" @click="backToParent">
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
        }
    },
    data() {
        return {
            title: ''
        }
    },
    methods: {
        backToParent() {
            this.$emit('toggleShow', this.to)
        }
    },
    onLoad: function(options){
        if(this.to === 'left_test') {
            this.title = '左眼测量准备'
        } else {
            this.title = '右眼测量准备'
        }
        wx.setNavigationBarTitle({title: this.title});
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
    .img{
        width: 73%;
        height: 41%;
        margin-top: 140rpx;
        position: relative;
        &:before{
            content: '手臂伸直';
            position: absolute;
            top: 22%;
            left: 15%;
            font-size: 28rpx;
            color: #ADADAD;
        }
        img{
            width: 513rpx;
            height: 461rpx;
        }
    }
    .tips{
        height: 15%;
        margin-bottom: 12%;
        margin-top: 111.07rpx;
        .hide{
            font-weight: bold;
            text-align: center;
            padding-bottom: 20rpx;
            font-size: 36rpx;
        }
        .direction{
            font-size: 30rpx;
            color: #666;
        }
    }
    .btn{
        height: 10%;
        width: 86%;
        height: 102rpx;
        border: 2rpx solid #7BC1F1;
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