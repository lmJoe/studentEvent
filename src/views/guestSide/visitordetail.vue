<template>
  <div class="visitorPage">
    <div class="title">
        <h3>{{visitorName}}提交的访客审批</h3>
        <p :class="[currentStatus==0?'needStyle':
                    currentStatus==1?'argeeStyle':
                    currentStatus==2?'rejectStyle':'']">{{
            currentStatus==0?'未审批':
            currentStatus==1?'已同意':
            currentStatus==2?'已拒绝':''
            }}</p>
    </div>
    <div class="content">
      <List>
        <ListItem>
          <span>流水号</span>
          <p>{{flowNo}}</p>
        </ListItem>
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
          <span>同行人员</span>
          <p><Tag v-for="(item,index) in visitorRecordList" :key="index">{{item}}</Tag></p>
        </ListItem>
        <ListItem>
          <span>登记人</span>
          <p>{{visitorName}}</p>
        </ListItem>
        <ListItem>
          <span>班主任</span>
          <p>{{teacherName}}</p>
        </ListItem>
        <ListItem>
          <span>身份</span>
          <p>家长</p>
          <!-- <p>{{sfzType}}</p> -->
        </ListItem>
      </List>
    </div>
    <div class="cardStep">
      <h3>审批流程</h3>
      <Timeline>
        <TimelineItem v-for="(item,index) in spList" :key="index">
            <template #dot>
                <span class="name">{{index==0?'家':item.refPersonName.charAt(0)}}</span>
            </template>
             <div>
              <div class="doThing">
                  <div>
                    <span>{{item.optPersonTypeStr}}</span>
                    <span :class="['statusStyle',currentStatus==0?'needStyle':
                    currentStatus==1?'argeeStyle':
                    currentStatus==2?'rejectStyle':'']">
                      {{
                        item.currentStatus==1 ? '(已同意)':
                        item.currentStatus==2 ? '(已拒绝)':
                        item.currentStatus==3 ? '(已撤回)':
                        item.currentStatus==0&&index!==0 ? '(未审批)':''
                      }}
                    </span>
                  </div>
                  <span class="time">{{item.createTime}}</span>
                </div>
              <p class="namedetail">
                {{(item.currentStatus=='' || item.currentStatus==null)&&index==0 ? '家长':item.refPersonName}}
                
              </p>
            </div>
        </TimelineItem>
        <!-- <TimelineItem><a href="#">查看更多</a></TimelineItem> -->
      </Timeline>
    </div>
    <img class="statusImg" 
        :src='currentStatus==0?status1:
        currentStatus==1?status2:
        currentStatus==2?status3:
        ""' alt="">
    <!-- <Button type="primary" class="cancel" v-if="roleId==1&&agreeStat==1" :disabled="agreeStat==1?false:true" @click="handleCancel()">撤回</Button> -->
    <div v-if="roleId==2&&agreeStat==1" class="spDom">
      <Button type="primary" class="aggreeBtn" @click="aggreeBtn(1)">同意</Button>
      <Button type="success" class="rejectBtn" ghost @click="aggreeBtn(2)">驳回</Button>
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
export default {
  name: 'index',
  data () {
    return {
      title:'详情',
      visitorName:'',
      eventId:'',
      studentId:'',
      optPhone:'',
      roleId:'',
      spList:[],
      flowNo:'',//流水号
      teacherName:'',//被访人
      visitReason:'',//来访目的
      visitorRecordList:[],
      visitorName:'',//登记人
      sfzType:'',//身份
      visitTime:'',//访问时间
      currentStatus:'',//审批状态值
      status1:status1,
      status2:status2,
      status3:status3,
    }
  },
  created(){
    document.title = this.title;
    this.eventId = common.getQueryVariable("eventId");
    this.studentId = Number(common.getQueryVariable("studentId"));
    this.optPhone = Number(common.getQueryVariable("optPhone"));
    this.roleId = common.getQueryVariable("roleType");

    this.getDetailFun()
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
    getDetailFun(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.findDetail+'?studentId='+Number(this.studentId)+'&eventId='+Number(this.eventId),
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("返回数据",res)
          this.spList = res.data.eventHistory;
          this.visitorName = res.data.event.visitorName;
          this.approveStr = res.data.event.approveStr;//审批状态
          this.flowNo = res.data.event.flowNo;//流水号
          this.visitTime = res.data.event.startTime;//访问时间
          this.teacherName = res.data.event.teacherName;//被访人
          this.visitReason = res.data.event.visitReason;//来访目的
          var visitorRecordList = res.data.visitorRecordList; //同行人员
          for(var i=0;i<visitorRecordList.length;i++){
            this.visitorRecordList.push(visitorRecordList[i].visitName)
          }
          this.visitorName = res.data.event.visitorName;//登记人
          this.sfzType = res.data.event.visitorIdentity;
          this.currentStatus = res.data.event.currentStatus;
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    handleCancel(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.visiteventRollback,
        data: {
           eventId:Number(this.eventId),
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
        url:URL.recordUrl.visitApprove,
        data: {
           eventId:Number(this.eventId),
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
            var url = window.location.protocol+'//'+window.location.hostname + '/event/index.html#/guestIndex?roleType='+this.roleId+'&studentId='+this.studentId+'&openId='+this.token+'&phone='+this.optPhone;
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
.visitorPage{
  padding:10px 0 50px 0;
  background:rgba(249,249,248);
  position:relative;
  .title{
    background:#fff;
    padding:20px;
    h3{
      color:#000;
      font-size:17px;
    }
    p{
      margin-top:7px;
      font-size:15px;
    }
  }
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
  .statusImg{
    height:70px;
    position:absolute;
    top:80px;
    right:20px;
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
      padding-top:5px;
      .time{
        color:#999;
        font-weight:normal;
      }
      .statusStyle{
        font-size:13px;
        font-weight:normal;
      }
    }
    .namedetail{
      font-size:13px;
      color: #999;
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
  .cancel{
    width:92%;
    margin:auto;
    position:fixed;
    bottom:25px;
    left:0;
    right:0;
    background:#fff;
    color:#ff2828;
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
  /deep/.ivu-btn-primary{
    border-color:#ff2828;
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
  .argeeStyle{
    color:rgba(0, 184, 122);
  }
  .rejectStyle{
    color:rgb(250, 100, 0);
  }
  .needStyle{
    color:#f8b465;
  }
</style>
