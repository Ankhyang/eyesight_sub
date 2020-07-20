<template>
    <div>
        <eyesight :to="left_test" :distance="distance" :height="height"/>
    </div>
</template>

<script>
import eyesight from '@/components/eyesight_test.vue'
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            distance: '',
            height: ''
        }
    },
    components: {eyesight},
    methods:{
        ...mapMutations(['setNextFlag'])
    },
    onShow() {
        // 启用下一步按钮
        this.setNextFlag(false);
    },
    // 分享给朋友
    onShareAppMessage(t) {
      return {
        title: "康贝贝博士测视力",
        path: "/pages/index/main"
      };
    },
    // 分享到朋友圈
    onShareTimeline() {
      return {
	      title: '康贝贝博士测视力'
	    }
    },
    onLoad(options){
        this.distance = options.distance;
        this.height = options.height;
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    }
}
</script>

<style lang="less" scoped>
    div{
        height: 100%;
    }
</style>