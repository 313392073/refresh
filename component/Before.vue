<template>
    <div class='post'>
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <div v-if="error" class="error">
            {{error}}
        </div>
        <div v-if="post" class="content">
            <h2>{{post.title}}</h2>
            <p>{{post.body}}</p>
        </div>
    </div>
</template>
<script>
//导航完成前 获取数据 beforeRouteEnter 守卫中获取数据  当数据获取成功以后只能调用next方法
export default {
  data() {
    return {
        post:null,
        error:null
    };
  },
  beforeRouteEnter(to,from,next) {
      getPost(to.params.id,(err,post) => {
          next(vm => vm.setData(err,post))
      })
  },
  //路由改变前 组件就已经渲染完了
  beforeRouteUpdate(to,from,next) {
      this.post = null
      getPost(to.params.id,(err,post) => {
          this.setData(err,post)
          next()
      })
  },
  methods:{
      setData(err,post) {
          if(err) {
              this.error = err.toString()
          }else{
              this.post = post
          }
      }
  }
};
</script>