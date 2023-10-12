<template>
  <div class="guestAddPage">
    <Form  ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="90">
        <FormItem label="访问人数" prop="visitNum">
            <Input v-model="formItem.visitNum" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
            <DatePicker type="datetime" placeholder="请选择"  v-model="formItem.startTime" format="yyyy-MM-dd HH:mm" @on-ok="choseStartTime()" @on-clear="clearStartTime()"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
            <DatePicker type="datetime" placeholder="请选择"  v-model="formItem.endTime" format="yyyy-MM-dd HH:mm" @on-ok="choseStartTime()" @on-clear="clearStartTime()"></DatePicker>
        </FormItem>
    </Form>
    <Button type="primary" class="submitBtn" @click="shureSubmit">确定</Button>
    <Loading v-show="isLoading"></Loading>
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
      title:'邀请填写',
      isStudent:false,
      optPhone:'',
      isLoading:false,
      formItem: {
        visitNum: '',
        startTime:'',
        endTime:'',//访客身份证
      },
      ruleValidate: {
        visitNum: [
            { required: true, message: '访问人数不能为空'}
        ],
        startTime: [
            { required: true, message: '开始时间不能为空'}
        ],
        endTime: [
            { required: true, message: '结束时间不能为空'}
        ]
      }
    }
  },
  created(){
    document.title = this.title;
    // this.studentId = this.$route.query.studentId;
    this.optPhone = common.getQueryVariable("phone");//家长手机
    // this.optPhone = this.$route.query.optPhone;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
  
  },
  methods: {
    //发起预约
    addAskFun(){
      this.isLoading = true;
      var params = {
        startTime: common.changeTimeFormat(this.formItem.startTime),
        endTime: common.changeTimeFormat(this.formItem.endTime),
        inviteCount:Number(this.formItem.visitNum),
        teacherPhone:Number(this.optPhone),
      }
      console.log("params",params);
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.buildInviteRec,
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
          setTimeout(() => {
           this.$router.push({
              path:'invitedCode',
              query:{
                inviteId:res.data.id,
              }
            })
          }, 1500);
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    shureSubmit(){
      if(!this.formItem.visitNum){
        this.$Message.info('访问人数不能为空');
        return;
      }
      if(!this.formItem.startTime){
        this.$Message.info('访客开始时间不能为空');
        return;
      }
      if(!this.formItem.endTime){
        this.$Message.info('访客结束时间不能为空');
        return;
      }
      this.addAskFun();
    },
    choseStartTime(){
      //如果结束时间不为空，则反向计算时差
      if(this.formItem.endTime){
        var startTime = this.formItem.startTime.getTime();
        var endTime = this.formItem.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formItem.startTime = '';
        }
      }
    },
    choseEndTime(){
      //如果开始时间不为空，则正向计算时差
      if(this.formItem.startTime){
        var startTime = this.formItem.startTime.getTime();
        var endTime = this.formItem.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formItem.endTime = '';
        }
      }
    },
    clearStartTime(){
      this.formItem.startTime = '';
    },
    clearStartTime(){
      this.formItem.endTime = '';
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.guestAddPage{
  background:#fff;
}
.submitBtn{
  width: 92%;
  position: fixed;
  bottom: 50px;
  background: #208de0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
/deep/.ivu-input{
  border:none;
  color:#999;
  text-align:right;
}
/deep/.ivu-form-item{
  border-bottom:1px solid #dedede;
  margin-bottom:0;
  padding: 5px 10px;
}
/deep/.ivu-btn-primary{
  border-color:#208de0;
}
/deep/.ivu-form-item-error-tip{
  position: absolute;
  top: 80%;
  right: 10px;
  line-height: 1;
  padding-top: 0.375rem;
  color: #ed4014;
  z-index: 10;
  font-size: 12px;
  text-align:right;
}
/deep/.ivu-date-picker{
  width:100%;
}
</style>
