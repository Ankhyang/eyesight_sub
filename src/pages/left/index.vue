<template>
    <div>
        <prepare :to="left_test" :distance="distance"/>
    </div>
</template>

<script>
import prepare from '@/components/prepare.vue'
export default {
    props: {
        distance: {
            type: Number,
            default: 30
        }
    },
    components: {prepare}
}
</script>

<style lang="less" scoped>
    div{
        height: 100%;
    }
</style>