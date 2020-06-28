<template>
    <div>
        <eyesight :to="left_test" :distance="distance" :height="height"/>
    </div>
</template>

<script>
import eyesight from '@/components/eyesight_test.vue'
export default {
    data(){
        return {
            distance: '',
            height: ''
        }
    },
    components: {eyesight},
    onLoad(options){
        this.distance = options.distance;
        this.height = options.height;
    }
}
</script>

<style lang="less" scoped>
    div{
        height: 100%;
    }
</style>