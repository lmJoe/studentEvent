<template>
  <div class="guestAddPage">
    <Form :model="formItem" :label-width="90">
        <div v-for="(item,index) in formItemList" :key="index">
          <p class="dataTitle">{{'访客'+(index+1)}}</p>
          <FormItem label="访客姓名">
              <Input v-model="item.visitName" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="访客手机">
              <Input v-model="item.phone" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="访客身份证">
              <Input v-model="item.visitorIdentity" placeholder="请输入..."></Input>
          </FormItem>
        </div>
        <div class="addPer">
          <Icon type="md-add" />
          <Button type="text" @click="addPer">添加同行人</Button>
        </div>
    </Form>
    <p class="divider">访问信息</p>
    <Form :model="formItemTime" label-position="top" class="detailMsg" :label-width="66">
      <FormItem label="选择时间">
        <Row>
          <Col span="11">
              <DatePicker type="datetime" placeholder="选择起始时间" :start-date="new Date()" :disabled="isdisAbled" v-model="formItemTime.startTime" format="yyyy-MM-dd HH:mm" 
              @on-ok="choseStartTime()" 
              @on-change="choseStartTime()" 
              @on-clear="clearStartTime()"
              ></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
              <DatePicker type="datetime" placeholder="选择结束时间" :start-date="new Date()" :disabled="isdisAbled" v-model="formItemTime.endTime" format="yyyy-MM-dd HH:mm"
              @on-ok="choseEndTime()" 
              @on-change="choseEndTime()" 
              @on-clear="clearEndTime()"></DatePicker>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <Form :model="formItemMsg" :label-width="90">
      <FormItem label="来访目的">
          <Input v-model="formItemMsg.visitReason" maxlength="10" placeholder="请输入（最多10个字）"></Input>
      </FormItem>
      <FormItem label="到访地址">
          <Input v-model="formItemMsg.visitDestination" type="textarea" maxlength="20" placeholder="请输入（最多20个字）"></Input>
      </FormItem>
    </Form>
    <Form :model="formItemPer" :label-width="90" v-if="isStudent">
      <FormItem label="就读学生">
        <Input v-model="formItemPer.name"></Input>
      </FormItem>
    </Form>
    <Button type="primary" class="submitBtn" @click="shureSubmit">确认预约</Button>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
export default {
  name: 'index',
  data () {
    return {
      title:'访客预约',
      isStudent:false,
      optPhone:'',
      formItem: {
        visitorName: '',
        visitorPhone:'',
        visitorIdentity:'',//访客身份证
      },
      formItemTime: {
        startTime:'',//起始时间
        endTime:'',//结束时间
      },
      formItemMsg:{
        visitReason:'',//访客目的
        visitDestination:'',//到访地址
      },
      formItemList:[
        {
          visitName:'',
          phone:'',
          visitorIdentity:'',
        }
      ],
      formItemPer:{
        name:'',
        studentId:'',
      },
      roleType:'',//角色 家长或老师
      eventType:1,//1-拜访，2-邀约
      inviteCount:0,//邀约限制人数
      isdisAbled:false,//根据邀约或者拜访来判断时间是否可以选择
      inviteId:'',
    }
  },
  created(){
    document.title = this.title;
    this.optPhone = common.getQueryVariable("optPhone");
    if(common.getQueryVariable("inviteId")){
      this.inviteId = Number(common.getQueryVariable("inviteId"));
    }
    if(common.getQueryVariable("startTime")){
      this.isdisAbled = true;
      this.formItemTime.startTime = common.shijianc(Number(common.getQueryVariable("startTime")));//主动邀约开始时间
    }
    if(common.getQueryVariable("endTime")){
      this.isdisAbled = true;
      this.formItemTime.endTime = common.shijianc(Number(common.getQueryVariable("endTime")));//主动邀约结束时间
    }
    if(common.getQueryVariable("inviteCount")){
      this.inviteCount = common.getQueryVariable("inviteCount");//主动邀约人数限制
    }
    if(common.getQueryVariable("roleType")){
      this.roleType = common.getQueryVariable("roleType");//角色 判断家长或老师
    }
    if(common.getQueryVariable("eventType")){
      this.eventType = common.getQueryVariable("eventType");//1-拜访，2-邀约
    }
    if(common.getQueryVariable("studentId")){
      this.formItemPer.studentId = common.getQueryVariable("studentId");//主动访问学生id
    }
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
  
  },
  methods: {
    //发起预约
    addAskFun(){
      var params = {
        visitorName: this.formItemList[0].visitName,
        visitorPhone: this.formItemList[0].phone,
        visitorIdentity: this.formItemList[0].visitorIdentity,//访客身份证
        startTime:common.getQueryVariable("startTime")?this.formItemTime.startTime:common.changeTimeFormat(this.formItemTime.startTime),
        endTime:common.getQueryVariable("endTime")?this.formItemTime.endTime:common.changeTimeFormat(this.formItemTime.endTime),
        visitReason: this.formItemMsg.visitReason,//来访目的
        visitDestination: this.formItemMsg.visitDestination,//来访地址
        visitorRecordList:this.formItemList,
        studentId:this.formItemPer.studentId,
        optPhone:this.optPhone,
        inviteId:this.inviteId,
        eventType:this.eventType
      }
      console.log("params",params);
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.visitoradd,
        data:params,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("res",res)
          this.$Message.info(res.msg);
          setTimeout(() => {
            var url = window.location.protocol+'//'+window.location.hostname + '/event/index.html#/guestIndex?roleType='+this.roleType+'&studentId='+this.formItemPer.studentId+'&openId='+this.token+'&phone='+this.optPhone;
            location.replace(url)
          }, 1500);
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //添加同行人
    addPer(){
      console.log("this.formItemList.length",this.formItemList.length+1)
      console.log("this.inviteCount",this.inviteCount)
      if(this.inviteCount!==0&&((this.formItemList.length+1)>this.inviteCount)){
        this.$Message.info('已超出访问人数上限');
      }else{
        this.formItemList.push({
          visitName:'',
          phone:'',
          visitorIdentity:'',
        })
      }
      
    },
    shureSubmit(){
      var regExp = new RegExp("^1[3578]\\d{9}$");
      var sfzReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//验证身份证
      if(!this.formItemList[0].visitName){
        this.$Message.info('访客姓名不能为空');
        return;
      }
      if(!this.formItemList[0].phone){
        this.$Message.info('访客手机不能为空');
        return;
      }else if(!regExp.test(this.formItemList[0].phone)){
         this.$Message.info('访客手机格式错误');
         return;
      }
      if(!this.formItemList[0].visitorIdentity){
        this.$Message.info('访客身份证不能为空');
        return;
      }else if(!this.isValidIDCard(this.formItemList[0].visitorIdentity)){
        this.$Message.info('访客身份证格式错误');
        return;
      }
      if(!this.formItemTime.startTime){
        this.$Message.info('访客开始时间不能为空');
        return;
      }
      if(!this.formItemTime.endTime){
        this.$Message.info('访客结束时间不能为空');
        return;
      }
      if(!this.formItemMsg.visitReason){
        this.$Message.info('访客目的不能为空');
        return;
      }
      if(!this.formItemMsg.visitDestination){
        this.$Message.info('到访地址不能为空');
        return;
      }
      this.addAskFun();
    },
    //验证身份证
    isValidIDCard(idCard) {
      // 身份证正则表达式
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(idCard);
    },
    choseStartTime(){
      //如果结束时间不为空，则反向计算时差
      if(this.formItemTime.endTime){
        var startTime = this.formItemTime.startTime.getTime();
        var endTime = this.formItemTime.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formItemTime.startTime = '';
        }else if(startTime==endTime){
          this.$Message.info('开始时间与结束时间一致');
          this.formItemTime.startTime = '';
        }
      }
    },
    choseEndTime(){
      //如果开始时间不为空，则正向计算时差
      if(this.formItemTime.startTime){
        var startTime = this.formItemTime.startTime.getTime();
        var endTime = this.formItemTime.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formItemTime.endTime = '';
        }else if(startTime==endTime){
          this.$Message.info('开始时间与结束时间一致');
          this.formItemTime.endTime = '';
        }
      }
    },
    clearStartTime(){
      this.formValidate.startTime = '';
    },
    clearStartTime(){
      this.formValidate.endTime = '';
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.guestAddPage{
  background:#fff;
  padding-bottom:150px;
  .dataTitle{
    color:#000;
    font-weight: 600;
    position:relative;
    padding: 10px 30px;
    border-bottom:1px solid #dedede;
    font-size:17px;
    ::before{
      position:absolute;
      top:0;
      left:35px;
      bottom:0;
      margin:auto;
      content:"";
      width:3px;
      height:25px;
      background:#2797fe;
    }
  }
  .addPer{
    width:30%;
    margin:10px auto;
    /deep/.ivu-btn{
      padding:0;
    }
    /deep/.ivu-btn-text:focus {
        box-shadow:none;
    }
  }
  .divider{
    padding:7px 20px;
    background:#eef7fe;
    color:#2797fe;
  }
  .detailMsg{
    padding:15px 10px 0;
    /deep/.ivu-input{
      text-align:center;
      color:#333;
      font-weight:600;
    }
    /deep/.ivu-form-item-content{
      margin-left:0 !important;
    }
  }
}
.submitBtn{
  width: 92%;
  position: fixed;
  bottom: 50px;
  background: #18a470;
  left: 0;
  right: 0;
  margin: 0 auto;
  height:45px;
}
/deep/.ivu-input{
  border:none;
  color:#999;
  text-align:right;
}
/deep/.ivu-select-selection{
  border:none;
  padding: 2px 0;
  color:#999;
  text-align:right;
  padding-right:15px;
}
/deep/.ivu-form-item{
  border-bottom:1px solid #dedede;
  margin-bottom:0;
  padding: 5px 10px;
}
/deep/.ivu-btn-primary{
  border-color:#18a470;
}
/deep/.ivu-form-item-error-tip{
  position: absolute;
  top: 73%;
  right: 38px;
  line-height: 1;
  padding-top: 0.375rem;
  color: #ed4014;
  z-index: 10;
  font-size: 12px;
  text-align:right;
}
/deep/.ivu-input:focus{
  // border-color:#fff;
}
/deep/.ivu-upload-drag{
  border:none;
}
/deep/.ivu-date-picker{
  width:100%;
}
/deep/.ivu-select-placeholder{
  padding-right: 17px !important;
}
/deep/.ivu-select-selected-value{
  padding-right: 17px !important;
}
/deep/.ivu-radio-group{
  width:100%;
  text-align: right;
}
/deep/.ivu-radio-inner{
  display:none;
}
/deep/.ivu-select-dropdown{
  left:-51px;
}
</style>
