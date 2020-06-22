<template>
    <div>
        <eyesight :to="right_test"/>
    </div>
</template>

<script>
import eyesight from '@/components/eyesight_test.vue'
export default {
    data() {
        return {
                
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