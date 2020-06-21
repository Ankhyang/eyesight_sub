<template>
    <div class="container">
        <div class="bg">
            <img src="../../../static/images/index_bg.png" alt="康贝贝视力">
        </div>
        <div class="ruler">
            <picker-view :value="value" indicatorStyle="height: 50px;" @change="bindHeight" maskStyle="background: none;" style="width: 100%; height: 100%;">
                <picker-view-column>
                    <p v-for="(item, index) in heights" :class="value[0] === index ? 'selected':'noSelected'" :key="index" style="line-height: 50px;background: #F6FCFF;">
                        {{item}}
                    </p>
                </picker-view-column> 
            </picker-view>
        </div>
        <div class="height">
            <p>偷偷告诉你，真实的身高视力测试才会准哦～</p>
            <div class="height_num">
                <div class="img">
                    <img src="../../../static/images/height_input.png" alt="">
                </div>
                <p class="num">{{height}}<span>CM</span></p>
            </div>
        </div>
        <div class="next" @click="goToTest">
            <img src="../../../static/images/next.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: [1],
            height: '120',
            heights: []
        }
    },
    methods:{
        bindHeight(e) {
            let a = e.mp.detail.value;
            this.value = a;
            this.height = this.heights[a[0]];
        },
        goToTest() {
            let a = this.height;
            let t = ((a - a / 8) / 2 - 18) <= 45 ? 30 : 60;
            wx.navigateTo({
                url: `../test/index?distance=${t}`
            })
        }
    },
    mounted() {
        this.heights = Array(121).fill('80').map((item, index) => {
            return item*1 + index *1
        });
    }
}
</script>
    
<style lang="less" scoped>
.container{
    .selected{
        color: #00A0E9;
    }
    .noSelected{
        color: #666;
    }
    width: 100%;
    height: 100%;
    background:  #F6FCFF;
    display: flex;
    justify-content: center;
    position: fixed;
    .bg{
        width: 41%;
        height: 78%;
        margin-right: 12%;
        img{
            max-width: 100%;
            max-height: 100%;
            height: 100%;
        }
    }
    .ruler{
        width: 22%;
        height: 50%;
        position: absolute;
        right: 4%;
        top: 12%;
    }
    .height{
        width: 41%;
        height: 15%;
        padding: 20rpx;
        position: absolute;
        top: 10%;
        left: 4%;
        p{
            font-size: 26rpx;
            color: #A5A5A7;
            padding-bottom: 20rpx;
        }
        .height_num{
            height: 83%;
            .img{
                width: 80%;
                height: 75%;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .num{
                position: absolute;
                top: 68%;
                left: 25%;
                font-size: 37rpx;
                color: #00A0E9;
                span{
                    padding-left: 8rpx;
                    font-size: 21rpx;
                }
            }
        }
    }
    .next{
        width: 86%;
        height: 9%;
        position: absolute;
        bottom: 7%;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>