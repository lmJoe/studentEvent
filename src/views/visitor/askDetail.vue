<template>
  <div class="askdetailPage">
    <div class="card">
      <div class="cardTop">
        <Avatar size="large" :src="head" />
        <div class="cardBox">
          <p class="name">{{studentName}}</p>
          <p class="date">{{updateTime}}</p>
        </div>
      </div>
      <div class="cardBottom">
        <p class="firstMsg">审批编号：<span>{{flowNo}}</span></p>
        <p class="firstMsg">请假类型：<span>{{eventTypeStr}}</span></p>
        <div class="step"> 
          <p class="stepAskTime">请假时长：{{eventTotalDay}}天</p>
          <Timeline class="stepBox">
                <TimelineItem color="#999">{{eventStartTime}}</TimelineItem>
                <TimelineItem color="#999">{{eventEndTime}}</TimelineItem>
            </Timeline>
        </div>
        <div class="askMsg">
          <p><span>请假事由：</span>{{eventReason}}</p>
          <p><span>体温情况：</span>{{temperatureStatus}}</p>
          <p><span>体温：</span>{{temperature}}</p>
        </div>
        <div class="askImages">
          <img v-for="(item,index) in eventPicPath" :key="index" :src="item" />
        </div>

      </div>
      <img class="statusImg" :src='agreeStat==1?status1:agreeStat==2?status2:agreeStat==3?status3:""' alt="">
    </div>
    <div class="cardStep">
      <Timeline>
        <TimelineItem v-for="(item,index) in spList" :key="index">
            <template #dot>
                <span class="name">{{index==0?'家':item.refPersonName.charAt(0)}}</span>
            </template>
             <div>
              <p class="doThing"><span>{{item.optPersonTypeStr}}</span><span class="time">{{item.createTime}}</span></p>
              <p class="namedetail">
                {{(item.approveStr=='' || item.approveStr==null)&&index==0 ? '家长':item.refPersonName}}
                {{
                  (item.approveStr=='' || item.approveStr==null) ? ' ':
                  '('+item.approveStr +')'
                }}
              </p>
            </div>
        </TimelineItem>
        <!-- <TimelineItem><a href="#">查看更多</a></TimelineItem> -->
      </Timeline>
    </div>
    <Button type="primary" class="backBtn" v-if="roleId==1||agreeStat!==1" :disabled="agreeStat==1?false:true" @click="askBtn()">撤回</Button>
    <div v-else-if="roleId==2||agreeStat==1" class="spDom">
      <Button type="primary" class="aggreeBtn" @click="aggreeBtn(1)">同意</Button>
      <Button type="success" class="rejectBtn" ghost @click="aggreeBtn(2)">拒绝</Button>
    </div>
    
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import status1 from '@/assets/imgs/status1.png';//审批中
import status2 from '@/assets/imgs/status2.png';//审核通过
import status3 from '@/assets/imgs/status3.png';//审批拒绝
import head from '@/assets/imgs/head.png';//审批拒绝
export default {
  name: 'index',
  data () {
    return {
      title:'请假详情',
      status1:status1,
      status2:status2,
      status3:status3,
      studentId:'',
      id:'',
      studentName:'',//学生姓名
      updateTime:'',//提交时间
      flowNo:'',//审批编号
      eventTypeStr:'',//请假类型
      eventTotalDay:'',//请假时长
      eventStartTime:'',//开始时间
      eventEndTime:'',//结束时间
      eventReason:'',//请假事由
      temperatureStatus:'',//体温情况
      temperature:'-',//体温
      spList:[],
      agreeStat:'',//同意是否
      eventPicPath:[],//图片地址
      head:head,//学生头像
      roleId:'', //角色id 1-提交人 2-审批人 3-门卫
      token:'',//openId
    }
  },
  created(){
    document.title = this.title;
    this.studentId = this.$route.query.studentId;
    this.id = this.$route.query.id;
    this.optPhone = this.$route.query.optPhone;
    this.roleId = this.$route.query.roleId;
    this.token = this.$route.query.token;
    this.getDetailFun()
  },
  activated (){
    document.title = this.title;    
  },
  mounted() {
 
  },
  methods: {
    //获取右上角选择数据
    getDetailFun(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getDetail+'?studentId='+this.studentId+'&eventId='+this.id,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("返回数据",res)
          this.studentName = res.data.event.studentName;
          this.updateTime = common.shijianc(res.data.event.updateTime)
          this.flowNo = res.data.event.flowNo;
          this.eventTypeStr = res.data.event.eventTypeStr;
          this.eventTotalDay = res.data.event.eventTotalDay;
          this.eventStartTime = res.data.event.eventStartTime;
          this.eventEndTime = res.data.event.eventEndTime;
          this.eventReason = res.data.event.eventReason;
          this.eventPicPath = res.data.event.eventPicPathArr;
          this.temperatureStatus = res.data.event.temperatureStatus==1?'体温正常':'体温异常',
          this.temperature = res.data.event.temperature;
          this.spList = res.data.eventHistory;
          this.agreeStat =  res.data.event.approveStr=="未审批"?1:res.data.event.approveStr=="同意"?2:res.data.event.approveStr=="拒绝"?3:""
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    handleAdd(){
      //跳转新增页面
      this.$router.push({
        path:'addAsk',
      })
    },
    askBtn(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.eventRollback,
        data: {
           eventId:Number(this.id),
           optPhone:Number(this.optPhone),
        },
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("返回数据",res)
          this.$Message.info(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    aggreeBtn(num){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.approve,
        data: {
           eventId:Number(this.id),
           recStatus:num,
        },
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("返回数据",res)
          this.$Message.info(res.msg);
          setTimeout(() => {
            if(this.roleId==undefined){
              this.roleId = common.getQueryVariable("roleType");//角色id
            }
            if(this.token==undefined){
              this.token = common.getQueryVariable("openId");//openid
            }
            var url = window.location.protocol+'//'+window.location.hostname + '/event/index.html#/index?roleType='+this.roleId+'&studentId='+this.studentId+'&openId='+this.token+'&phone='+this.optPhone;
            console.log("url",url)
            location.replace(url)
          }, 1500);
          
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.askdetailPage{
  width:95%;
  margin:0 auto;
  padding:10px 0 50px 0;
  .card{
    background:#fff;
    padding:10px;
    
    .cardTop{
      display: flex;
      justify-content: start;
      align-items: center;
      .cardBox{
        margin-left:10px;
        .name{
          font-weight: 600;
          color:#222;
        }
        .date{
          margin-top:3px;
          color:#999;
        }
      }
    }
    .cardBottom{
      margin-top:15px;
      border-top:1px solid #dedede;
      padding:8px;
      .firstMsg{
        color:#545f68;
        line-height:25px;
        padding-left:10px;
        span{
          color:#000;
        }
      }
      .step{
        background:#f5f5f5;
        padding:10px;
        border-radius: 12px;
        margin-top:5px;
        .stepAskTime{
          color:#222;
          font-weight:600;
          margin-bottom:15px;
        }
        .stepBox{
          margin-top:10px;
          /deep/.ivu-timeline-item-content{
            padding-bottom:0;
          }
        }
      }
      .askMsg{
        margin-top:15px;
        p{
          color:#000;
          line-height:25px;
          padding-left:10px;
          display: flex;
          justify-content: start;
          align-items: center;
          span{
            color:#545f68;
            text-align:right;
            width:70px;
            display:block;
          }
        }
      }
      .askImages{
        img{
          width:100px;
          height:auto !important;
          margin-right: 10px;
          margin-top: 10px;
        } 
      }
    }
    .statusImg{
      height:70px;
      position:absolute;
      top:20px;
      right:20px;
    }
  }
  .cardStep{
    margin-top:20px;
    padding:10px;
    background:#fff;
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
      padding-top:5px;
      .time{
        color:#999;
        font-weight:normal;
      }
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
  .backBtn{
    background:#18a470;
    width:92%;
    position:fixed;
    bottom:25px;
    left:0;
    right:0;
    margin:0 auto;
  }
  .spDom{
    width:92%;
    position:fixed;
    bottom:25px;
    left:0;
    right:0;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    .aggreeBtn{
      width:40%;
      background:#18a470;
    }
    .rejectBtn{
      width:40%;
    }
  }
  
}

/deep/.ivu-timeline-item{
  padding-bottom:5px;
}
/deep/.ivu-timeline-item-head-custom{
  height:40px;
  width:40px;
  background:rgba(0,184,122);
  border-radius: 5px;
  left:0;
  top:15px;
}

/deep/.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
/deep/.demo-upload-list img{
    width: 100%;
    height: 100%;
}
/deep/.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
/deep/.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
/deep/.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
