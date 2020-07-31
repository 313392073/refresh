<template>
    <div>{{item.title}}</div>
</template>
<script>
/**
 * 在路由组件上暴露一个自定义静态函数  asyncData
 * 注意  由于此函数会在组件实例化之前调用  所以无法使用this
 * 需要将store 和路由信息作为参数传递进去
 */
export default {
    asyncData({store,route}) {
        //触发action后 会返回Promise
        return store.dispatch('fetchItem',route.params.id)
    },
    computed:{
        item() {
            return this.$store.state.items[this.$route.params.id]
        }
    }
};
</script>
<style lang='less' scoped>
</style>