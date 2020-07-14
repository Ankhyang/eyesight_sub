<template>
    <div class="container">
        <div class="bg">
            <img src="../../../static/images/index_bg.png" alt="康贝贝视力">
        </div>
        <div class="ruler">
            <div class="choose">
                <picker-view :value="value" indicatorStyle="height:34px;border:none;" @change="bindHeight" maskStyle="background: none;" style="width: 100%; height: 95%;">
                    <picker-view-column>
                        <p v-for="(item, index) in heights" 
                        :class="[
                            value[0] === index ? 'selected':'noSelected', 
                            value[0]+1 === index || value[0]-1 === index ? 'op9':'', 
                            value[0]+2 === index || value[0]-2 === index ? 'op7':'', 
                            value[0]+3 === index || value[0]-3 === index ? 'op5':'', 
                            value[0]+4 === index || value[0]-4 === index ? 'op3':'',
                            value[0]+5 === index || value[0]-5 === index ? 'op1':'',
                            value[0]+6 === index || value[0]-6 === index ? 'op1':'',
                            value[0]+7 === index || value[0]-7 === index ? 'op1':'',
                            value[0]+8 === index || value[0]-8 === index ? 'op1':'',
                            value[0]+9 === index || value[0]-9 === index ? 'op1':'',
                            value[0]+10 === index || value[0]-10 === index ? 'op1':''
                        ]" 
                        :key="index" 
                        style="line-height: 34px;background: #F6FCFF;">
                            {{item}} 
                        </p>    
                    </picker-view-column> 
                </picker-view>
            </div>
            <div class="img">
                <img src="../../../static/images/ruler2.png" alt="尺子">
            </div>
        </div>
        <div class="height">
            <p class="tell">偷偷告诉你，真实的身高视力测试才会准哦～</p>
            <div class="height_num">
                <div class="img">
                    <img src="../../../static/images/height_input.png" alt="">
                </div>
                <p class="num">{{height}}<span>CM</span></p>
            </div>
        </div>
        <div class="next" :class="opFlag ? 'borderClass':'borderSubClass'">
            <button class="btn" :class="opFlag ? 'hClss':''" :disabled="nextFlag" @click="goToTest">
                {{num_sub}} 身高正确，下一步
            </button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            value: [40],
            height: '120',
            heights: [],
            id: '',
            num_sub: 3,
            opFlag: true,
            opArr: ['op1', 'op3', 'op5', 'op7', 'op9']
        }
    },
    computed: {
        ...mapState(['nextFlag'])
    },
    methods:{
        ...mapMutations(['setNextFlag', 'setSaveFlag', 'setPreFlag']),
        bindHeight(e) {
            var a = e.mp.detail.value;
            this.value = a;
            this.height = this.heights[a[0]];
        },
        goToTest() {
            // 禁用按钮
            this.setNextFlag(true);
            var a = this.height, t;
            t = (t = (a - a / 8) / 2 - 18) <= 45 ? 30 : 60;
            wx.navigateTo({
                url: `../left_test/main?distance=${t}&height=${a}`
            })
        }
    },
    created() {
        this.heights = Array(121).fill('80').map((item, index) => {
            return item*1 + index *1
        });
        setTimeout(() => {
            this.value = [40];
        } , 0)
    },
    onShow() {
        // 启用保存按钮
        this.setSaveFlag(false);
        // 禁用下一步按钮
        this.setNextFlag(true);
        // 准备页面显示
        this.setPreFlag(true);
        // 重新设置值
        this.num_sub = 3;
        // 置灰
        this.opFlag = true;
        this.id = setInterval(()=> {
            this.num_sub -= 1
            if(this.num_sub === 0) {
                // 清空
                this.num_sub = '';
                // 取消置灰
                this.opFlag = false;
                // 启用按钮
                this.setNextFlag(false);
                // 清除定时器
                clearInterval(this.id)
            }
        }, 1000)
    },
    mounted(){
        
    }
}
</script>
    
<style lang="less" scoped>
.container{
    .borderClass{
        border: 2rpx solid #D6ECFA;
    }
    .borderSubClass{
        border: 2rpx solid #7BC1F1;
    }
    .hClss{
        opacity: 0.3;
    }
    .selected{
        color: #00A0E9;
        font-size: 56rpx;
        font-weight: bold;
        opacity: 1;
        padding: 3rpx 0;
        box-sizing: border-box;
    }
    .noSelected{
        color: #666;
        padding-left: 27rpx;
        font-size: 27rpx;
    }
    .op3{
       opacity: 0.3; 
    }
    .op5{
       opacity: 0.5; 
    }
    .op7{
       opacity: 0.7; 
    }
    .op9{
       opacity: 0.9; 
    }
    width: 100%;
    height: 100%;
    background: #F6FCFF;
    display: flex;
    justify-content: center;
    position: fixed;
    .bg{
        width: 45%;
        height: 50%;
        margin-top: 36%;
        margin-right: 16%;
        img{
            height: 604rpx;
            width: 340rpx;
        }
    }
    .ruler{
        width: 20%;
        height: 600rpx;
        position: absolute;
        z-index: 0;
        right: 4%;
        top: 12%;
        .choose{
            width: 100%;
            height: 600rpx;
            position: absolute;
            top: 0;
            z-index: 2;
        }
        .img{
            width: 32%;
            height: 600rpx;
            position: absolute;
            left: -31%;
            top:-46rpx;
            z-index: 1;
            // &:before{
            //     position: absolute;
            //     top: 327rpx;
            //     content: '';
            //     width: 35rpx;
            //     height: 8rpx;
            //     background: #00A0E9;
            //     border-top-right-radius: 6rpx;
            //     border-bottom-right-radius: 6rpx;
            // }
            img{
                width: 55rpx;
                height: 650rpx;
            }
        }
    }
    .height{
        width: 300rpx;
        height: 200rpx;
        padding: 20rpx;
        position: absolute;
        top: 10%;
        left: 2%;
        .tell{
            height: 80rpx;
            width: 300rpx;
            text-align: center;
            font-size: 25rpx;
            color: #A5A5A7;
        }
        .height_num{
            position: relative;
            width: 300rpx;
            height: 150rpx;
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
                top: 34rpx;
                left: 70rpx;
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
        width: 90%;
        height: 102rpx;
        overflow: hidden;
        border-radius: 50rpx;
        position: absolute;
        // border: 2rpx solid #7BC1F1;
        bottom: 7%;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn{
            background: #fff;
            width: 100%;
            height: 102rpx;
            line-height: 102rpx;
            color: #00A0E9;
            font-weight: normal;
            font-size: 30rpx;
            &:after{
                border: 0; 
            }
        }
    }
    
}
</style>