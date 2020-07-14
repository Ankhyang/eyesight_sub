<template>
    <div class="container">
        <div class="prepare" v-show="preFlag">
            <prepare :to="to" @toggleShow="toggleShow"/>
        </div>
        <div class="content_main" v-show="!preFlag">
            <div class="e_view">
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
                    <div class="img" id="up" @tap="choseDirection">
                        <img src="../../static/images/top.png" alt="上">
                    </div>
                </div>
                <div class="common center">
                    <div class="center_img left_img" id="left" @tap="choseDirection">
                        <img src="../../static/images/left.png" alt="左">
                    </div>
                    <div class="no_see" @tap="canotSee">
                        <p>太小了</p>
                        <p>我看不清～</p>
                    </div>
                    <div class="center_img right_img" id="right" @tap="choseDirection">
                        <img src="../../static/images/right.png" alt="右">
                    </div>
                </div>
                <div class="common bottom">
                    <div class="img" id="down" @tap="choseDirection">
                        <img src="../../static/images/bottom.png" alt="下">
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
import { mapState, mapMutations } from 'vuex'

export default {
    components: { prepare },
    props: ['to', 'distance', 'height'],
    data() {
        return {
            str: 'E',
            directionData: [ "up", "right", "down", "left"],
            lastX: 0,
            lastY: 0,
            eRow: 5,
            eValue: "4.4",
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
            distance: "",
            ruler: [ "4.2", "4.3", "4.4", "4.5", "4.6"],
            smallEyeData: {},
            bigEyeData: {},
            e60SizeData: {},
            e30SizeData: {},
            rowNumberData: {},
            rulerType: "bigEyeData",
            activeFlag: false,
            barTitle: '左眼测量准备'
        }
    },
    computed: {
        ...mapState(['userInfo', 'config', 'preFlag']),
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
        ...mapMutations(['setPreFlag']),
        // 点击小数或者五分按钮，设置类型
        setRuler(t) {
            var e, f, r = this, s = this.eRow;
            "decimal" == t.currentTarget.id ? (e = "smallEyeData", f = true) : (e = "bigEyeData", f = false),
            this.rulerType = e,
            this.activeFlag = f;
            r.getRuler(s);
        },
        // 获取规则
        getRuler: function(t) { 
            var e, a, i = [];
            0 == (t = parseInt(t)) && (t = 1),
            "smallEyeData" == this.rulerType ? (e = this.smallEyeData[t], a = this.smallEyeData) : (e = this.bigEyeData[t], a = this.bigEyeData);
            for (var r = 0; r < 5; r++) {
                var s = t;
                // 0 == r ? (s = t - 2, i[r] = s <= 0 ? 0 : a[s]) : 1 == r ? (s = t - 1, i[r] = s <= 0 ? 0 : a[s]) : 2 == r ? i[r] = e : 3 == r ? (s = t + 1, 
                // i[r] = s > 14 ? 0 : a[s]) : (s = t + 2, i[r] = s > 14 ? 0 : a[s]);
                if(r === 0) {
                    s = t-2;
                    i[r] = s <= 0 ? '' : a[s]
                } else if(r === 1) {
                    s = t-1;
                    i[r] = s<= 0 ? '': a[s];
                } else if(r === 2) {
                    i[r] = e; 
                } else if(r === 3) {
                    s = t + 1;
                    i[r] = s > 14 ? '' : a[s];
                } else if(r === 4) {
                    s = t + 2;
                    i[r] = s > 14 ? '' : a[s]
                }
            }
            this.eValue = e;
            this.ruler = i;
        },
        // 设置视力E
        setEyeSight(t, a) {
            var i, r, s = parseInt(this.eRow);
            if (1 == t) {
                i = this.getEValue(a), t = 2
                this.testNumber = t,
                this.leftEye = i,
                this.countDownStatus = "true",
                this.rowError = 0,
                this.rowRight = 0,
                this.rightScore = 0,
                this.errorScore = 0,
                this.totalScore = 0
                wx.setNavigationBarTitle({
                    title: '右眼测量准备'
                });
                // 切换为右眼测试
                this.to = "right_test";
                // this.showPrepare = true;
                this.setPreFlag(true);
            } else {
                r = this.getEValue(a), t = 1;
                this.testNumber = t,
                this.rightEye = r,
                this.rowError = 0,
                this.rowRight = 0,
                this.rightScore = 0,
                this.errorScore = 0,
                this.totalScore = 0;
                this.uploadVision();
                this.showResult(this.leftEye, r);
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
            r = l[Math.floor(Math.random() * l.length + 1) - 1],
            this.direction = r,
            this.size = this.eSizeData[s],
            this.eRow = s,
            this.rightScore = e,
            this.errorScore = a,
            this.totalScore = i,
            this.rowError = n,
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
            var i = Date.parse(new Date()) / 1e3;
            const data = {
                openid: this.config.openid,
                visionLeft: this.leftEye,
                visionReight: this.rightEye,
                height: this.height,
                userId: this.config.user_id,
                userName: this.userInfo.nickName
            }
            let s = this.$service.save_sight_info(data);
            s.then(res => {
                console.log('上传视力信息成功');
            }).catch(error => {
                console.log('上传视力信息失败');
            })
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
                s.getRuler(a);
            } else {
                this.setEyeSight(i, 1)
            }
        },
        // 触摸视图区域之前
        // handletouchtart(t) {
        //     this.lastX = t.touches[0].pageX;
        //     this.lastY = t.touches[0].pageY;
        // },
        // // 触摸视图区域之后
        // handletouchend(t) {
        //     var e, a = t.changedTouches[0].pageX, i = t.changedTouches[0].pageY, r = a - this.lastX, s = i - this.lastY;
        //     Math.abs(r) > Math.abs(s) ? r < 0 ? e = this.directionData[3] : r > 0 && (e = this.directionData[1]) : s < 0 ? e = this.directionData[0] : s > 0 && (e = this.directionData[2]), 
        //     this.lastX = a, this.lastY = i, this.checkTesting(e);
        // },
        // 结束后跳转到结果页面
        showResult(t, e, a, i){
            wx.navigateTo({ 
                url: `/pages/result/main?leftEye=${t}&rightEye=${e}`
            });
        },
        // 准备的子组件回调
        toggleShow(val) {
            if(val === 'left_test') {
                this.barTitle = '当前测量【左眼】';
                this.to = 'right_test';
            } else {
                let u = util.getE60SizeData(), l = util.getE30SizeData();
                this.barTitle = '当前测量【右眼】';
                this.to = 'left_test';
                this.eRow = 5;
                this.size = (60 === this.distance ? u : l)[this.eRow];
                if(this.rulerType === 'smallEyeData') {
                    this.ruler = ['0.6', '0.8', '1.0', '1.2', '1.5']
                    this.eValue = "1.0";
                    this.setRuler({
                        currentTarget: {
                            id: 'decimal'
                        }
                    }); 
                } else {
                    this.ruler = [ "4.2", "4.3", "4.4", "4.5", "4.6"]
                    this.eValue = "4.4";
                    this.setRuler({
                        currentTarget: {
                            id: 'five_mark'
                        }
                    }); 
                }
            }
            wx.setNavigationBarTitle({
                title: this.barTitle
            });
            // 隐藏界面
            this.setPreFlag(false);
        }
    },
    created() {
        wx.setNavigationBarTitle({
            title: this.barTitle
        });
    },
    onLoad() {
        var a, i = this, r = i.eRow, s = "", o = i.directionData, n = util.getSmallEyeData(), 
        h = util.getBigEyeData(), u = util.getE60SizeData(), l = util.getE30SizeData(), 
        c = util.getRowNumberData(), d = wx.getStorageSync("results"),
        g = (a = 60 === this.distance ? u : l)[r];
        s = o[Math.floor(Math.random() * o.length + 1) - 1], 
        this.smallEyeData = n,
        this.bigEyeData = h,
        this.eSizeData = a,
        this.e60SizeData = u,
        this.e30SizeData = l,
        this.rowNumberData = c,
        this.size = g,
        this.direction = s,
        this.eRow = r,
        d && d[0] && (g = a[r = d[0].eRow], i.getRuler(d[0].eRow), this.eRow = r, this.size = g);
    },
    onShow(){
        this.to = 'left_test'
        this.barTitle = '左眼测量准备';
        this.rulerType = "bigEyeData";
        this.activeFlag = false;
        this.eRow = 5;
        this.eValue = "4.4";
        this.countDownStatus =!0,
        this.rightScore = 0,
        this.errorScore = 0,
        this.totalScore = 0,
        this.rowError = 0,
        this.rowRight = 0,
        this.leftEye = "",
        this.rightEye = "",
        this.testNumber = 1,
        this.ruler = [ "4.2", "4.3", "4.4", "4.5", "4.6"];
        wx.setNavigationBarTitle({
            title: this.barTitle
        });
        var a, i = this, r = i.eRow, s = "", o = i.directionData, n = util.getSmallEyeData(), 
        h = util.getBigEyeData(), u = util.getE60SizeData(), l = util.getE30SizeData(), 
        c = util.getRowNumberData(), d = wx.getStorageSync("results"),
        g = (a = 60 === this.distance ? u : l)[r];
        s = o[Math.floor(Math.random() * o.length + 1) - 1], 
        this.smallEyeData = n,
        this.bigEyeData = h,
        this.eSizeData = a,
        this.e60SizeData = u,
        this.e30SizeData = l,
        this.rowNumberData = c,
        this.size = g,
        this.direction = s,
        this.eRow = r,
        d && d[0] && (g = a[r = d[0].eRow], i.getRuler(d[0].eRow), this.eRow = r, this.size = g);
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
            margin: 25rpx auto;
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
            padding: 17rpx;
            box-sizing: border-box;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .type_img{
                width: 116rpx;
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
                    opacity: 0.4;
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
            width: 80%;
            margin: 0 auto;
            height: 560rpx;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .common{
                height: 155rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .center{
                height: 212rpx;
            }
            img{
                width: 144rpx;
                height: 144rpx;
            }
            .center{
                width: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .no_see{
                    width: 199rpx;
                    height: 125rpx;
                    background: #fff;
                    box-sizing: border-box;
                    font-size: 27rpx;
                    border: 2rpx solid #00A0E9;
                    box-sizing: border-box;
                    border-radius: 20rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    &:before{
                        content: '点击E字开口方向';
                        font-size: 23rpx;
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