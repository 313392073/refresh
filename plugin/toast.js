import Alert from './toast.vue'
var Toast = {} //定义插件对象
Toast.install = function(Vue,options) { //vue的install方法 用于定义vue插件
    //如果toast还在 则不再执行
    if(document.getElementsByClassName("alertBox").length){
        return
    }
    let toastTpl = Vue.extend(Alert) //创建Vue构造器
    //el 提供一个在页面上已存在的DOM 元素作为Vue实例的挂在目标 可以是css选择器 也可以是HTMLElement实例
    // 在实例挂在之后  则可以通过$vm.$el访问
    // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则 需要显示调用vm.$mount() 手动开启编译
    //提供的元素只能作为挂载点 所有的挂在元素会被vue生成dom替换 因此不能挂在顶级元素上（html 或者body）
    // let $vm = new toastTpl({
    //     el:document.createElement("div")
    // })

    let $vm = new toastTpl() //实例化vue实例
    //此处使用$mount 来手动开启编译 用$el 来访问元素 并插入到body中
    let tpl = $vm.$mount().$el
    document.body.appendChild(tpl)
    //在Vue的原型上添加实例方法 以全局调用
    Vue.prototype.$toast = {
        show(options) { //控制toast显示的方法
            if(typeof options === 'string') { //对参数进行判断
                $vm.text = options
            }else if(typeof options === 'object') {
                Object.assign($vm,options) //合并参数与实例
            }
            $vm.show = true //显示toast(防止每次弹窗创建一次新的定时器)
            setTimeout(() => {
                $vm.show = false
            },$vm.time) //消失时间
        },
        hide() { //控制toast隐藏的方法
            $vm.show = false
        }
    }
}
export default Toast