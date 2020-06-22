<template>
    <div>
        <eyesight :to="left_test" :distance="distance"/>
    </div>
</template>

<script>
import eyesight from '@/components/eyesight_test.vue'
export default {
    props: {
        distance: {
            type: Number,
            default: 30
        }
    },
    components: {eyesight}
}
</script>

<style lang="less" scoped>
    div{
        height: 100%;
    }
</style>