<template>
    <div class='echarts'></div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
      $_handleResizeChart() {
          this.chart.resize()
      }
  },
  mounted() {
    //请求数据 赋值数据  等一些列操作。。。
    this.chart = echarts.init(this.$el)
    //监听窗口发生变化  resize组件
    window.addEventListener('resize',this.$_handleResizeChart)
    //通过hook监听组件销毁钩子函数  并取消监听事件
    this.$once("hook:beforeDestory",() => {
        window.removeEventListener("resize",this.$_handleResizeChart)
    })
  },
//   beforeDestory() {
//       window.removeEventListener('resize',this.$_handleResizeChart)
//   }
};
</script>
<style lang='less' scoped>
</style>