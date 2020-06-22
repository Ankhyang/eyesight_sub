<template>
    <div class="container">
        <div class="e_view">
            {{str}}
        </div>
        <div class="type">
            <div class="type_img img_decimal">
                <span>小数</span>
            </div>
            <div class="type_str">{{type}}</div>
            <div class="type_img img_socre active">
                <span>五分</span>
            </div>
        </div>
        <div class="direction">
            <div class="common top">
                <div class="direc_img img">
                    <img src="../../static/images/top.png" alt="上">
                </div>
            </div>
            <div class="common center">
                <div class="direc_img center_img left_img">
                    <img src="../../static/images/left.png" alt="左">
                </div>
                <div class="no_see">
                    <p>太小了</p>
                    <p>我看不清～</p>
                </div>
                <div class="direc_img center_img right_img">
                    <img src="../../static/images/right.png" alt="右">
                </div>
            </div>
            <div class="common bottom">
                <div class="direc_img">
                    <img src="../../static/images/bottom.png" alt="下">
                </div>
            </div>
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
            str: 'E',
            type: '68'
        }
    },
    methods:{
        // 跳转到right

        // 结束后跳转到结果页面
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
    .e_view{
        width: 92%;
        height: 33%;
        margin: 25rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        -moz-box-shadow: 4rpx 5rpx 16rpx #D1F0FF;
        -webkit-box-shadow: 4rpx 5rpx 16rpx #D1F0FF;
        box-shadow: 4rpx 5rpx 16rpx #D1F0FF;
    }
    .type{
        display: flex;
        width: 100%;
        height: 17%;
        padding: 34rpx;
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-between;
        .type_img{
            width: 120rpx;
            height: 100rpx;
            color: #9C9C9C;
            border: 2rpx solid #9C9C9C;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .type_str{
            display: flex;
            align-items: center;
        }
        .active{
            color: #00A0E9;
            border: 2rpx solid #00A0E9;
        }
        .img_decimal{
            border-top-left-radius: 100rpx;
            border-bottom-left-radius: 100rpx;
        }
        .img_socre{
            border-top-right-radius: 100rpx;
            border-bottom-right-radius: 100rpx;
        }
    }
    .direction{
        width: 100%;
        height: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .common{
            height: 28%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .center{
            height: 40%;
        }
        .direc_img{
            width: 23%;
            height: 96%;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .center{
            width: 100%;
            flex-direction: row;
            .center_img{
                width: 20%;
                height: 70%;
            }
            .left_img{
                margin-right: 7%;
            }
            .right_img{
                margin-left: 7%;
            }
            .no_see{
                width: 28%;
                height: 60%;
                background: #fff;
                box-sizing: border-box;
                font-size: 26rpx;
                border: 2rpx solid #00A0E9;
                border-radius: 24rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                &:before{
                    content: '点击E字开口方向';
                    font-size: 21rpx;
                    color: #9C9C9C;
                    position: absolute;
                    top: -30%;
                }
            }
        }
    }
}
</style>