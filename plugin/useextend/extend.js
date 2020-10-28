/**
 * vue.extend 返回一个子类构造函数  也就是预设部分选项的vue实例构造器
 */
<div id="mount-point"></div>
 var Profile = Vue.extend({
     template: '<p>{{firstname}}{{lastName}} aka {{alias}}</p>',
     data:function() {
         return {
             firstname:'ww',
             lastName:'ss',
             alias:'he'
         }
     }
 })
 //创建Profile 实例  并挂载到一个元素上
 new Profile().$mount('#mount-point')