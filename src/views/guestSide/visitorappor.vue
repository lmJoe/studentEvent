<template>
  <div class="askPage">
    
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import nodata from '@/assets/imgs/no-data.png';//审批拒绝
export default {
  name: 'index',
  data () {
    return {
      title:'访客审批',
    }
  },
  created(){
    document.title = this.title;
    
  },
  activated (){
    document.title = this.title;
    
  },
  mounted() {
    
  },
  methods: {
    handleAdd(){
      //跳转新增页面
      this.$router.push({
        path:'guestadd',
        query:{
          studentId:this.studentId,
          optPhone:this.optPhone,
          roleId:this.roleId,
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.askPage{
  
}
</style>
