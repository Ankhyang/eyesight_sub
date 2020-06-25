<template>
    <!-- <div class="main">
        <div class="prepare">
            <prepare @toggleShow="toggleShow"/>
        </div> 
    </div> -->
    <div class="container">
        <div class="prepare" v-show="showPrepare">
            <prepare :to="to" @toggleShow="toggleShow"/>
        </div>
        <div class="content_main">
            <div class="e_view" @touchend="handletouchend" @touchstart="handletouchtart">
                <p :class="e_direction" :style="{fontSize: size+'rpx'}">E</p>
            </div>
            <div class="type">
                <div class="type_img img_decimal" id="decimal" :class="activeFlag ? 'active':''" @tap="setRuler">
                    <span>小数</span>
                </div>
                <div class="type_str">
                    <span class="num" v-for="(item, index) in ruler" :key="index" :class="item === eValue ? 'num_active':''">{{item}}</span>
                </div>
                <div class="type_img img_socre" id="five_mark" :class="activeFlag ? '':'active'" @tap="setRuler">
                    <span>五分</span>
                </div>
            </div>
            <div class="direction">
                <div class="common top">
                    <div class="direc_img img" id="up" @tap="choseDirection">
                        <img src="../../static/images/top.png" alt="上">
                    </div>
                </div>
                <div class="common center">
                    <div class="direc_img center_img left_img" id="left" @tap="choseDirection">
                        <img src="../../static/images/left.png" alt="左">
                    </div>
                    <div class="no_see" @tap="canotSee">
                        <p>太小了</p>
                        <p>我看不清～</p>
                    </div>
                    <div class="direc_img center_img right_img" id="right">
                        <img src="../../static/images/right.png" alt="右" @tap="choseDirection">
                    </div>
                </div>
                <div class="common bottom">
                    <div class="direc_img" id="down">
                        <img src="../../static/images/bottom.png" alt="下" @tap="choseDirection">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import prepare from '@/components/prepare'
import util from '@/utils/utils.js'
import config from '@/config/config.js'
import { mapState } from 'vuex'

export default {
    components: { prepare },
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
            str: 'E',
            directionData: [ "up", "right", "down", "left" ],
            lastX: 0,
            lastY: 0,
            eRow: 11,
            eValue: "5.0",
            direction: "",
            size: "",
            countDownStatus: !0,
            rightScore: 0,
            errorScore: 0,
            totalScore: 0,
            rowError: 0,
            rowRight: 0,
            leftEye: "",
            rightEye: "",
            testNumber: 1,
            eSizeData: '',
            time: 3,
            distance: "",
            ruler: [ "4.8", "4.9", "5.0", "5.1", "5.2" ],
            smallEyeData: {},
            bigEyeData: {},
            e60SizeData: {},
            e30SizeData: {},
            rowNumberData: {},
            rulerType: "bigEyeData",
            activeFlag: true,
            showPrepare: true,
            barTitle: '当前测量【左眼】'
        }
    },
    computed: {
        ...mapState(['userInfo']),
        // 视图区的E方向
        e_direction: function() {
            // 根据direction返回对应的class
            switch(this.direction) {
                case 'left':
                    return 'left-e';
                    break;
                case 'right':
                    return 'right-e';
                    break;
                case 'up':
                    return 'up-e';
                    break;
                case 'down':
                    return 'down-e';
                    break;
                default: 
                    return 'left-e';
                    break;
            }
        }
    },
    methods:{
        // 点击小数或者五分按钮，设置类型
        setRuler(t) {
            var e, f, s = this.eRow;
            "decimal" == t.currentTarget.id ? (e = "smallEyeData", f = true) : (e = "bigEyeData", f = false)
            this.rulerType = e;
            this.activeFlag = f;
            this.getRuler(s);
        },
        // 获取规则
        getRuler: function(t) {
            var e, a, i = [];
            0 == (t = parseInt(t)) && (t = 1);
            "smallEyeData" == this.rulerType ? (e = this.smallEyeData[t], a = this.smallEyeData) : (e = this.bigEyeData[t], a = this.bigEyeData);
            for (var r = 0; r < 5; r++) {
                var s = t;
                0 == r ? (s = t - 2, i[r] = s <= 0 ? 0 : a[s]) : 1 == r ? (s = t - 1, i[r] = s <= 0 ? 0 : a[s]) : 2 == r ? i[r] = e : 3 == r ? (s = t + 1, 
                i[r] = s > 14 ? 0 : a[s]) : (s = t + 2, i[r] = s > 14 ? 0 : a[s]);
            }
            this.eValue = e;
            this.ruler = i;
        },
        // 设置视力E
        setEyeSight(t, a) {
            var i, r, s = parseInt(this.eRow);
            if (1 == t) {
                i = this.getEValue(a), t = 2
                this.testNumber = t;
                this.leftEye = i;
                this.countDownStatus = "true";
                this.rowError = 0;
                this.rowRight = 0;
                this.rightScore = 0;
                this.errorScore = 0;
                this.totalScore = 0;
                this.showPrepare = true;
            } else {
                r = this.getEValue(a), t = 1;
                this.testNumber = t;
                this.rightEye = r;
                this.rowError = 0;
                this.rowRight = 0;
                this.rightScore = 0;
                this.errorScore = 0;
                this.totalScore = 0;
                this.uploadVision();
                var n = util.formatTime(new Date());
                this.showResult(this.leftEye, r, n, s);
            }
        },
        // 测试视力
        checkTesting(t){
            var e, a, i, r, s = this.eRow, o = this.testNumber, n = this.rowError, h = this.rowRight, u = this;
            if (t == this.direction ? (e = this.rightScore + 1, a = this.errorScore, 
            i = this.totalScore + 1) : (a = this.errorScore + 1, e = this.rightScore, 
            i = this.totalScore + 1), 1 == a && 1 == s) return s = 1, a = 0, e = 0, i = 0, 
            n = 1, u.getRuler(s), void this.setEyeSight(o, 1);
            if (a >= 1 && s <= 8) {
                if (s = parseInt(s) - 1, a = 0, e = 0, i = 0, n = 1, u.getRuler(s), 1 == h) return void this.setEyeSight(o, 1);
            } else if (a >= 2 && s > 8 && s <= 11) {
                if (s = parseInt(s) - 1, a = 0, e = 0, i = 0, n = 1, u.getRuler(s), 1 == h) return void this.setEyeSight(o, 1);
            } else if (a >= 3 && s > 11) {
                if (s = parseInt(s) - 1, a = 0, e = 0, i = 0, n = 1, u.getRuler(s), 1 == h) return void this.setEyeSight(o, 1);
            } else if (i >= this.rowNumberData[s]) {
                if (h = 1, 1 == n || 1 == h && 14 == s) return s = s, a = 0, e = 0, i = 0, n = 0, 
                h = 0, void this.setEyeSight(o, 0);
                s = parseInt(s) + 1, a = 0, e = 0, i = 0, h = 1, u.getRuler(s);
            }
            var l = this.directionData;
            r = l[Math.floor(Math.random() * l.length + 1) - 1]
            this.direction = r;
            this.size = this.eSizeData[s],
            this.eRow = s;
            this.rightScore = e;
            this.errorScore = a;
            this.totalScore = i;
            this.rowError = n;
            this.rowRight = h;
        },
        // 选择方向
        choseDirection(t) {
            var e = t.currentTarget.id;
            this.checkTesting(e);
        },
        // 获取E值
        getEValue(t) {
            var e = parseInt(this.eRow);
            return 1 == t && 1 == this.rowRight && (e -= 1), "smallEyeData" == this.rulerType ? this.smallEyeData[e] : this.bigEyeData[e];
        },
        // 上传测试结果
        uploadVision(e) {
            var a = wx.getStorageSync("userId"), i = Date.parse(new Date()) / 1e3;
            // wx.request({
            //     url: config.staticUrl + "/api/v1/save/logv",
            //     method: 'POST',
            //     data: {
            //         createDate: util.formatTime(new Date()),
            //         height: this.distance,
            //         visionLeft: this.leftEye,
            //         visionReight: this.rightEye,
            //         userId: a,
            //         userName: this.userInfo.nickName
            //     },
            //     success: function(t) {
                    
            //     }
            // });
        },
        // 看不清
        canotSee(t) {
            var e, a = this.eRow, i = this.testNumber, r = (this.rowError, this.rowRight), s = this, o = this.directionData;
            e = o[Math.floor(Math.random() * o.length + 1) - 1], a = parseInt(a) - 1, s.getRuler(a);
            if(1 != r && 0 != a) {
                this.direction = e;
                this.size = this.eSizeData[a];
                this.eRow = a;
                this.rightScore = 0;
                this.errorScore = 0;
                this.totalScore = 0;
                this.rowError = 1;
                this.rowRight = r;
                s.getRuler(a)
            } else {
                this.setEyeSight(i, 1)
            }
        },
        // 触摸视图区域之前
        handletouchtart(t) {
            this.lastX = t.touches[0].pageX;
            this.lastY = t.touches[0].pageY;
        },
        // 触摸视图区域之后
        handletouchend(t) {
            var e, a = t.changedTouches[0].pageX, i = t.changedTouches[0].pageY, r = a - this.lastX, s = i - this.lastY;
            Math.abs(r) > Math.abs(s) ? r < 0 ? e = this.directionData[3] : r > 0 && (e = this.directionData[1]) : s < 0 ? e = this.directionData[0] : s > 0 && (e = this.directionData[2]), 
            this.lastX = a, this.lastY = i, this.checkTesting(e);
        },
        // 结束后跳转到结果页面
        showResult(t, e, a, i){
            wx.navigateTo({ 
                url: `/pages/result/main?leftEye=${t}&rightEye=${e}&time=${a}&eRow=${i}`
            });
        },
        // 准备的子组件回调
        toggleShow(val) {
            if(val === 'left_test') {
                this.barTitle = '当前测试【左眼】';
                this.to = 'right_test';
            } else {
                this.barTitle = '当前测试【右眼】';
                this.to = 'left_test';
            }
            this.showPrepare = false;
        }
    },
    created() {
        wx.setNavigationBarTitle({
            title: this.barTitle
        })
    },
    mounted() {
        var a, i = this, r = i.eRow, s = "", o = i.directionData, n = util.getSmallEyeData(), 
        h = util.getBigEyeData(), u = util.getE60SizeData(), l = util.getE30SizeData(), 
        c = util.getRowNumberData(), d = wx.getStorageSync("results"),
        g = (a = 60 === this.distance ? u : l)[r];
        s = o[Math.floor(Math.random() * o.length + 1) - 1], 
        this.smallEyeData = n;
        this.bigEyeData = h ;
        this.eSizeData = a ;
        this.e60SizeData = u ;
        this.e30SizeData = l ;
        this.rowNumberData = c ;
        this.size = g ;
        this.direction = s ;
        this.eRow = r ;
        d[0] && (g = a[r = d[0].eRow], i.getRuler(d[0].eRow), this.eRow = r, this.size = g);
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
    position: relative;
    z-index: 5;
    .right-e {
        transform: rotate(0deg);
    }
    .down-e {
        transform: rotate(90deg);
    }
    .left-e {
        transform: rotate(180deg);
    }
    .up-e {
        transform: rotate(270deg);
    }
    .prepare{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
    }
    .content_main{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
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
            align-items: center;
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
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                .num{
                    font-size: 37rpx;
                    color: #00A0E9;
                    opacity: 0.6;
                    padding: 10rpx;
                }
                .num_active{
                    font-size: 48rpx;
                    opacity: 1;
                }
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
   
}


</style>