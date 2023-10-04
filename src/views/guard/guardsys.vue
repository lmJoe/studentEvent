<template>
  <div class="guardsysPage">
    <Card style="background:#fefbf6" v-if="roleType==2||roleType==1" @click.native="toDetailAsk()">
      <div class="cardCont">
        <h3>学生请假明细</h3>
        <img :src="icon1" alt="">
      </div>
    </Card>
    <Card style="background:#fefbf6;margin-top:10px;" v-if="roleType==1" @click.native="toDetailVisit()">
      <div class="cardCont">
        <h3>今日访客</h3>
        <img :src="icon2" alt="">
      </div>
    </Card>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import icon1 from '@/assets/imgs/icon1.png'
import icon2 from '@/assets/imgs/icon2.png'
export default {
  name: 'index',
  data () {
    return {
      title:'门卫管理',
      isStudent:false,
      icon1:icon1,
      icon2:icon2,
      roleType:'',//1-门卫，2-宿管
      schoolId:'',
      id:'',//人员id
    }
  },
  created(){
    document.title = this.title;
    // this.studentId = this.$route.query.studentId;
    this.roleType = common.getQueryVariable("roleType");//角色类型
    this.schoolId = common.getQueryVariable("schoolId");//学校id
    this.id = common.getQueryVariable("id");//人员id
    
    // this.optPhone = this.$route.query.optPhone;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
  
  },
  methods: {
    toDetailAsk(){
      this.$router.push({
        path:'asklist',
        query:{
          schoolId:this.schoolId,
          roleType:this.roleType,
          id:this.id
        }
      })
    },
    toDetailVisit(){
      this.$router.push({
        path:'todayVisit',
        query:{
          schoolId:this.schoolId,
          id:this.id
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.guardsysPage{
  padding:10px;
  .cardCont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:130px;
  }
}
/deep/.ivu-card-body{
  width:92%;
  margin:0 auto;
}
</style>
