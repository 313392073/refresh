/**
 * Vue.use(VueRouter) 、 Vue.use(ElementUI) 因为这些插件有install
 * 而axios 没有install axios 不能use
 */
export default {
    install:(Vue) => {
        Vue.prototype.$share = (option) => {
            console.log("install")
        }
    }
}

/**
 * main.js 
 * import share from './share.js'
 * App.vue
 * this.$share() //install
 */