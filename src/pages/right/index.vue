<template>
    <div>
        <prepare :to="right_test" :distance="distance"/>
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

<style>

</style>