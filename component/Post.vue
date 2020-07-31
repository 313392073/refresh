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
//导航完成以后 获取数据
export default {
  components: {},
  data() {
    return {
        loading:false,
        post:null,
        error:null
    };
  },
  watch:{
      //如果路由有变化  就会执行该方法
    "$route":"fetchData"
  },
  methods: {
      fetchData() {
          this.error = this.post = null
          this.loading = true
          getPost(this.$route.params.id,(err,post) => {
              this.loading = false
              if(err) {
                  this.error = err.toString()
              }else{
                  this.post = post
              }
          })
      }
  },
  created() {
      this.fetchData()
  },
};
</script>
<style lang='less' scoped>
</style>