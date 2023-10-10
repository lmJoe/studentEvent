<template>
  <div class="askPage">
    <Card class="cardBox" v-for="(item,index) in dataList" :key="index" @click.native="askDetail(item.studentId,item.id)">
        <p slot="title">
            {{item.studentName}}
        </p>
        <p slot="extra">
            {{common.shijianc(item.updateTime)}}
        </p>
        <div>
          <p>请假类型：{{item.eventTypeStr}}</p>
          <p>请假时长：{{item.eventTotalDay}}</p>
        </div>
        <div class="askMsg">
           <Timeline>
              <TimelineItem>{{common.shijianc(item.eventStartTime)}}</TimelineItem>
              <TimelineItem>{{common.shijianc(item.eventEndTime)}}</TimelineItem>
          </Timeline>
          <img class="statusImg" :src="item.currentStatus==0?status1:
                                        item.currentStatus==1?status2:
                                        item.currentStatus==2?status3:
                                        status4" alt="">
        </div>
    </Card>
    <div class="nodata" v-if="isNodata">
      <img :src="nodata" alt="">
      <span>暂无数据</span>
    </div>
    <Button class="addAsk" type="primary" @click="handleAdd()" v-if="roleId==1">新增</Button>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import status1 from '@/assets/imgs/status1.png';//审批中
import status2 from '@/assets/imgs/status2.png';//审核通过
import status3 from '@/assets/imgs/status3.png';//审批拒绝
import status4 from '@/assets/imgs/status4.png';//订单撤回
import nodata from '@/assets/imgs/no-data.png';//没有数据
export default {
  name: 'index',
  data () {
    return {
      title:'学生请假',
      status1:status1,
      status2:status2,
      status3:status3,
      status4:status4,
      studentName:'',
      time:'',
      startTime:'',
      endTime:'',
      eventStatus:'',
      totalDay:'',
      studentId:'',
      dataList:[],
      optPhone:'',
      token:'',
      roleId:'',//角色id 1-提交人 2-审批人 3-门卫
      nodata:nodata,
      isNodata:true,
    }
  },
  created(){
    document.title = this.title;
    //获取链接中的参数
    this.optPhone = common.getQueryVariable("phone");//家长手机
    this.studentId = common.getQueryVariable("studentId");//学生id
    this.token = common.getQueryVariable("openId");//openid
    this.roleId = common.getQueryVariable("roleType");//角色id
    console.log("1",this.optPhone,this.roleId)
    this.getConfig()
    
  },
  activated (){
    document.title = this.title;
    
  },
  mounted() {
    
  },
  methods: {
    getConfig(){
      var url;
      //2位审批人老师端
      if(this.roleId==2){
        url = URL.recordUrl.listEventByTeacherPhone+'?phone='+this.optPhone;
      }else{
        url = URL.recordUrl.getlist+'?token='+this.token+'&studentId='+this.studentId;
      }
      // const msg = this.$Message.loading({
      //     content: 'Loading...',
      //     duration: 0
      // });
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:url,
        data: {},
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        // setTimeout(msg, 2000); 
        if(res.code==200){
          if(!res.data.length){
            this.isNodata = true;
          }else{
            this.isNodata = false;
          }
          this.dataList = res.data;
          console.log(this.dataList)
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    handleAdd(){
      //跳转新增页面
      this.$router.push({
        path:'addAsk',
        query:{
          studentId:this.studentId,
          optPhone:this.optPhone,
          roleId:this.roleId,
        }
      })
    },
    askDetail(studentId,id){
      this.$router.push({
        path:'askDetail',
        query:{
          studentId:studentId,
          id:id,
          optPhone:this.optPhone,
          roleType:this.roleId,
          openId:this.token,
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.askPage{
  width:95%;
  margin:0 auto;
  padding:10px 0 50px 0;
  .cardBox{
    margin-bottom:15px;
    .askMsg{
      position:relative;
      margin-top:15px;
      .statusImg{
        position:absolute;
        top:-15px;
        right:0;
        // width:70px;
        height:70px;
      }
    }
    .ivu-timeline-item{
      padding:0;
    }
  }
  .addAsk{
    width:92%;
    margin:0 auto;
    position:fixed;
    bottom:25px;
    background:#18a470;
    height:45px;
  }
  .nodata{
    img{
      width:100px;
      height:auto !important;
      margin: 200px auto 0;
      display: block;
    }
    span{
      font-size:18px;
      color:#999;
      text-align:center;
      margin-top:20px;
      display:block;
    }
  }
}
/deep/.ivu-btn-primary{
  border-color:#18a470;
}
</style>
