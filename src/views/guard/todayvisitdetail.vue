<template>
  <div class="guardsysVisitPage">
    <div class="content">
      <List>
        <ListItem>
          <span>访问时间</span>
          <p>{{visitTime}}</p>
        </ListItem>
        <ListItem>
          <span>被访人</span>
          <p>{{teacherName}}</p>
        </ListItem>
        <ListItem>
          <span>来访目的</span>
          <p>{{visitReason}}</p>
        </ListItem>
        <ListItem>
          <span>访问地址</span>
          <p>{{visitAddress}}</p>
        </ListItem>
      </List>
    </div>
    <div class="cardStep">
      <h3>来访人员</h3>
      <Timeline>
        <TimelineItem v-for="(item,index) in spList" :key="index">
            <template #dot>
                <span class="name">{{(item.visitName==''||item.visitName==null)?'访':item.visitName.charAt(0)}}</span>
            </template>
             <div>
              <p class="doThing">
                  <span>{{item.visitName}}</span>
                  <Button type="success" :disabled="item.isDisable"  @click="hasVisit(item.eventId,item.id)" class="time">{{item.btnTips}}</Button>
              </p>
              <p class="phone"><span>{{item.phone}}</span></p>
              <Tag class="tag">预约到访</Tag>
            </div>
        </TimelineItem>
        <!-- <TimelineItem><a href="#">查看更多</a></TimelineItem> -->
      </Timeline>
    </div>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import icon3 from '@/assets/imgs/icon3.png'
export default {
  name: 'index',
  data () {
    return {
      title:'门卫管理',
      isStudent:false,
      icon3:icon3,
      eventId:'',
      visitTime:'',
      teacherName:'',
      visitReason:'',
      visitAddress:'',
      spList:[],
      id:'',
      isLoading:false,
      codeDisabled:false,
    }
  },
  created(){
    document.title = this.title;
    this.eventId = common.getQueryVariable("eventId");//家长手机
    this.id = common.getQueryVariable("id");//登录人员id
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.getDetailFun()
  },
  methods: {
    getDetailFun(){
      this.isLoading = true;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.guardianCheckVisitDetail+'?eventId='+Number(this.eventId),
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        console.log("res",res)
        this.isLoading = false;
        if(res.code==200){
          for(var i=0;i<res.data.visitorRecordList.length;i++){
            if(res.data.visitorRecordList[i].accessStatus==0){
              res.data.visitorRecordList[i].btnTips = '未到访'
              res.data.visitorRecordList[i].isDisable = false;
            }else{
              res.data.visitorRecordList[i].btnTips = '已登记';
              res.data.visitorRecordList[i].isDisable = true;
            }
          }
          this.spList = res.data.visitorRecordList;
          console.log("返回数据",this.spList)
          this.visitTime = res.data.eventVisitRecord.startTime;//访问时间
          this.teacherName = res.data.eventVisitRecord.teacherName;//被访人
          this.visitReason = res.data.eventVisitRecord.visitReason;//来访目的
          this.visitAddress = res.data.eventVisitRecord.visitDestination;//访问地址
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    hasVisit(eventId,visitorId){
      this.codeDisabled = true;
      setTimeout(()=>{
        this.codeDisabled = false;
      },2000)
      this.isLoading = true;
      var params = {
        eventId:eventId,
        visitorId:visitorId,
        checkStatus:1,
        guardianId:Number(this.id),
      }
      console.log("params",params);
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.guardianCheck,
        data:params,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        this.isLoading = false;
        console.log("res",res)
        if(res.code==200){
          console.log("res",res)
          this.$Message.info(res.msg);
          for(var i=0;this.spList.length;i++){
            console.log("this.spList",this.spList[i],visitorId)
            if(this.spList[i].id==visitorId){
              this.spList[i].btnTips = '已登记';
              this.$set(this.spList, i, this.spList[i])
            }
          }
          
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.guardsysVisitPage{
  background:#fff;
  padding:10px;
  .content{
    width:92%;
    margin:20px auto;
    // padding-bottom:100px;
    background:#fff;
    span{
      display:block;
      color:#8c8c8c;
    }
    p{
      display:block;
      color:#333;
      margin-top:5px;
      font-size:17px;
      font-weight:600;
      position:relative;
      ::before{
        position:absolute;
        content:'';
        left:0;
        top:0;
        width:10px;
        height:10px;;
        background:#22b78e;
      }
    }
    /deep/.ivu-list-item{
      padding:10px 13px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .ivu-list-split .ivu-list-item{
      border-bottom:none;
    }
  }
  .cardStep{
    margin-top:20px;
    padding:10px;
    background:#fff;
    h3{
      margin-bottom:10px;
    }
    .name{ 
      height:100%;
      width:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size:19px;
      color:#fff;
      
    }
    .doThing{
      color:#222;
      font-weight:600;
      display: flex;
      justify-content: space-between;
      padding-top:3px;
      position:relative;
      .time{
        display: block;
        padding: 5px 8px;
        color: #fff;
        font-size: 13px;
        border-radius: 7px;
        background: #22b78e;
        position: absolute;
        right: 0;
        top: 14px;
        font-weight: normal;
      }
    }
    .phone{
      color:#222;
      padding-top:3px;
      font-size:12px;
    }
    /deep/.ivu-tag{
      margin:0;
      font-size:12px;
    }
    .namedetail{
      color:rgba(0,184,122);
      font-size:13px;
    }
    /deep/.ivu-timeline-item-content{
      margin-left:30px;
      padding-bottom:20px;
    }
    /deep/.ivu-timeline-item-tail{
      border-left: 2px solid #e8eaec;
      left: 20px;
    }
  }
}
  /deep/.ivu-timeline-item-head-custom{
    height:40px;
    width:40px;
    background:rgba(0,184,122);
    border-radius: 5px;
    left:0;
    top:15px;
  }
  /deep/.ivu-timeline-item{
    padding-bottom:5px;
  }
</style>
