<template>
  <div class="guardsysPage">
    <Input search enter-button placeholder="手机号" v-model="phone" @on-search="search()"/>
    <div class="headerTip">
      <p style="font-size:18px;">今天<span class="a1">{{getDay}}</span></p>
      <p style="font-size:15px;">共有{{totalVis}}位访客，已到<span class="a2">{{visitNum}}</span>位</p>
    </div>
     <Card v-for="(item,index) in dataList" :key="index" @click.native="visitorDetail(item.id)">
        <p slot="title">
           <img :src="icon3" alt="" style="width:20px;height:20px;">
           {{item.startTime}}
        </p>
        <p slot="extra" :style="{color: item.accessStatus == 0 ? '#515a6e' : 'rgb(9,130,249)'}"
        >
            {{item.accessStatus == 0 ? '未到访' : '已登记'}}
        </p>
        <div class="b1">{{item.visitorName}}等{{item.visitCount}}位</div>
        <div class="b2">被访人：{{item.teacherName}}</div>
        <Tag class="b3">{{item.visitReason}}</Tag>
    </Card>
    <div class="nodata" v-if="isNodata">
      <img :src="nodata" alt="">
      <span>暂无数据</span>
    </div>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import icon3 from '@/assets/imgs/icon3.png'
import nodata from '@/assets/imgs/no-data.png';
export default {
  name: 'index',
  data () {
    return {
      title:'门卫管理',
      isStudent:false,
      icon3:icon3,
      nodata:nodata,
      schoolId:'',
      isNodata:false,
      phone:'',
      dataList:[],
      getDay:'',
      totalVis:'',//总访问人数
      visitNum:'',//今日已到访问人数
      id:'',//登录人员id
      isLoading:false,
    }
  },
  created(){
    document.title = this.title;
    var currentDate = new Date();
    this.getDay = currentDate.getDay()==0?'周日':
                  currentDate.getDay()==1?'周一':
                  currentDate.getDay()==2?'周二':
                  currentDate.getDay()==3?'周三':
                  currentDate.getDay()==4?'周四':
                  currentDate.getDay()==5?'周五':
                  currentDate.getDay()==6?'周六':'';
    this.schoolId = common.getQueryVariable("schoolId");//家长手机
    this.id = common.getQueryVariable("id");//登录人员id
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig(){
      this.isLoading = true;
      // const msg = this.$Message.loading({
      //     content: 'Loading...',
      //     duration: 0
      // });
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.listGuardianVisitor+'?schoolId='+this.schoolId+'&phone='+this.phone,
        data: {},
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        this.isLoading = false;
        if(res.code==200){
          if(!res.data.eventVisitRecords.length){
            this.isNodata = true;
          }else{
            this.isNodata = false;
          }
          this.totalVis = res.data.checkStatistics.totalCount;//总共访问人
          this.visitNum = res.data.checkStatistics.visitCount;//来了几个访问人
          for(var i=0;i<res.data.eventVisitRecords.length;i++){
            res.data.eventVisitRecords[i].startTime = common.getHmsecond(res.data.eventVisitRecords[i].startTime)
          }
          this.dataList = res.data.eventVisitRecords;
         
          console.log(this.dataList)
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    visitorDetail(id){
      this.$router.push({
        path:'todayvisitdetail',
        query:{
          eventId:id,
          id:this.id,
        }
      })
    },
    search(){
      console.log("phone",this.phone)
      this.getConfig()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.guardsysPage{
  background:#fff;
  padding:10px;
  .headerTip{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:15px 0;
    p{
      color:#333;
    }
    .a1{
      font-size:12px;
      margin-left:5px;
      color:#666;
    }
    .a2{
      color:#22b78e;
    }
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
  .b1{
    color:#333;
    font-size:16px;
    margin-bottom:7px;
  }
  .b2{
    font-size:13px;
    margin-bottom:7px;
  }
  .b3{
    font-size:12px;
    margin-bottom:7px;
  }
  /deep/.ivu-card-head{
    border-bottom:none;
  }
  /deep/.ivu-card-body{
    padding-top:10px;
  }
  /deep/.ivu-card-head p{
    display: flex;
    align-items: center;
    img{
      margin-right:5px;
    }
  }
  /deep/.ivu-card{
    margin-bottom:5px;
  }
}
</style>
