/**
 * 混入就是写一个公共的文件或者对象 结构和各组件的写法一样 export default {} 内的东西都可以写 
 *  data、methods、mounted等等 然后再需要的地方mixins:[MinXin]就可以了
 */

 export default {
    data() {
        return {
            applyNum:0
        }
    },
    methods:{
        addNum() {
            this.applyNum++
        }
    }
 }

 /**
  * 使用
  * 单页引入 order.vue 中引入
  * import MinXin from '@/mixins/mixins.js'
  * export default {
  *     mixins:[MinXin],
  * }
  * 
  * 全局引入
  * 在main.js中引入
  * import MinXin from '@/mixins/minxins.js'
  * Vue.minxin(MinXin)
  */