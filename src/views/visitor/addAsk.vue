<template>
  <div class="submitPage">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <FormItem label="请假类型">
        <Select v-model="formValidate.status" placeholder="请选择请假类型">
          <Option value="1">事假</Option>
          <Option value="2">病假</Option>
          <Option value="3">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="开始时间">
          <DatePicker v-model="formValidate.startTime" type="datetime" format="yyyy-MM-dd HH:mm"  placeholder="请选择开始时间" 
            @on-change="choseStartTime()" 
            @on-ok="choseStartTime()"
            @on-clear="clearStartTime()"
            ></DatePicker>
      </FormItem>
      <FormItem label="结束时间">
          <DatePicker v-model="formValidate.endTime" type="datetime" format="yyyy-MM-dd HH:mm" 
          placeholder="请选择结束时间" @on-change="choseEndTime()" @on-ok="choseEndTime()" @on-clear="clearEndTime()"></DatePicker>
      </FormItem>
      <FormItem label="请假时长">
          <Input v-model='formValidate.totalTime' readonly />
      </FormItem>
      <FormItem label="体温情况">
        <RadioGroup v-model="formValidate.bodyTempStat">
            <Radio label="体温正常" border></Radio>
            <Radio label="体温异常" border></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="体温">
          <Input v-model="formValidate.bodyTemp" @on-blur="changeBodyTemp()" type="number" maxlength="4" placeholder="请填写温度(只可填数字,例如36.5)" />
      </FormItem>
      <FormItem label="请假事由" label-position="top">
          <Input class="textarea" v-model="formValidate.desc" type="textarea" maxlength="140" show-word-limit :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入请假事由，若请病假，请填写病情，如发烧（体温度数），是否咳嗽，是否咽喉痛等。" />
      </FormItem>
       <FormItem class="uploadBox">
         <div class="demo-upload-list" v-for="(item,index) in formValidate.uploadList" :key="index">
            <template v-if="item.status === 'finished'">
                <!-- <Image :src="item.url" fit="cover" width="100%" height="100%" /> -->
                <img :src="item.url" fit="cover" width="100%" height="100%" alt="" />
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="formValidate.defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png','heif','gif','webp','bmp','heic']"
            :max-size="8224"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="https://xskwx.zjhuaxuntong.com/jxaxService/eventrec/uploadEventPic">
            <div class="upload">
                <span>图片</span>
                <Icon type="ios-add-circle-outline" size="20"></Icon>
            </div>
        </Upload>
        <ImagePreview v-model="formValidate.visible" :preview-list="['http://39.171.241.227:18551/images/event/' + formValidate.imgName]" />
      </FormItem>
      <!-- <FormItem class="stepBox">
        <Timeline class="stepContainer">
            <TimelineItem class="stepcont">
              <div>
                <p class="name">直接主管</p>
                <p class="desc">1个主管审批</p>
              </div>
              <p class="personName">张三</p>
            </TimelineItem>
            <TimelineItem class="stepcont">
              <div>
                <p class="name">直接主管</p>
                <p class="desc">1个主管审批</p>
              </div>
              <p class="personName">张三</p>
            </TimelineItem>
            <TimelineItem class="stepcont">
              <div>
                <p class="name">直接主管</p>
                <p class="desc">1个主管审批</p>
              </div>
              <p class="personName">张三</p>
            </TimelineItem>
        </Timeline>
      </FormItem> -->
      <FormItem class="lastFrom">
          <Button type="primary" class="submitBtn" @click="handleSubmit('formValidate')">提交</Button>
      </FormItem>
    </Form>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import * as imageConversion from 'image-conversion'
import status1 from '@/assets/imgs/status1.png'
export default {
  name: 'index',
  data () {
    return {
      title:'学生请假',
      formValidate: {
        status: '',
        startTime: '',
        endTime: '',
        totalTime: '',
        bodyTempStat:'',
        bodyTemp: '',
        desc: '',
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
      },
      uploadListArr:[],//图片数据提交变量
      noStartChose: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      noEndChose:{
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      studentId:'',
      optPhone:'',
      isLoading:false,
    }
  },
  created(){
    document.title = this.title;
    if(common.getQueryVariable("studentId")){
      this.studentId = common.getQueryVariable("studentId");//主动访问学生id
    }
    if(common.getQueryVariable("optPhone")){
      this.optPhone = common.getQueryVariable("optPhone");//主动访问学生id
    }
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.formValidate.uploadList = this.$refs.upload.fileList;
    console.log("获取图片地址11",this.$refs.upload.fileList)
    this.$refs.upload.fileList.forEach(element => {
      this.uploadListArr.push(element.url)
    });
    console.log("获取图片地址---",this.uploadListArr)
  },
  methods: {
    changeBodyTemp(){
      var x = String(this.formValidate.bodyTemp).indexOf('.') + 1; //小数点的位置
      var y = (x !== 0) ? String(this.formValidate.bodyTemp).length - x : 0; //小数的位数
      var elementNum = Number.parseFloat(this.formValidate.bodyTemp);
      console.log(elementNum)
      if (isNaN(elementNum) || (y > 1) || (elementNum < 35) || (elementNum > 42)) {
        this.$Message.info('请输入正确体温');
        this.formValidate.bodyTemp = '';
        return false;
      }
    },
    //发布申请
    addAskFun(){
      
      // this.formValidate
      var regExp = new RegExp("^1[3578]\\d{9}$");
      var sfzReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//验证身份证
      if(!this.formValidate.status){
        this.$Message.info('请假类型不能为空');
        return;
      }
      if(!this.formValidate.startTime){
        this.$Message.info('请假开始时间不能为空');
        return;
      }
      if(!this.formValidate.endTime){
         this.$Message.info('请假结束时间不能为空');
         return;
      }
      if(!this.formValidate.bodyTempStat){
        this.$Message.info('体温情况不能为空');
        return;
      }
      if(!this.formValidate.desc){
        this.$Message.info('请假事由不能为空');
        return;
      }
      var params = {
        eventEndTime: common.changeTimeFormat(this.formValidate.endTime),
        eventPicPathArr: this.uploadListArr,
        eventReason: this.formValidate.desc,
        eventStartTime: common.changeTimeFormat(this.formValidate.startTime),
        eventTotalDay: this.formValidate.totalTime,
        eventType: this.formValidate.status,
        optPhone: this.optPhone,
        studentId:this.studentId,
        temperature: this.formValidate.bodyTemp,
        temperatureStatus: this.formValidate.bodyTempStat=='体温正常'?1:2,
      }
      console.log("params",params);
      this.isLoading = true;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.addAsk,
        data:params,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        console.log("res",res)
        this.isLoading = false;
        if(res.code==200){
          console.log("res",res)
          setTimeout(() => {
            this.$router.go(-1);
          
            // var url = window.location.protocol+'//'+window.location.hostname + '/event/index.html#/index?roleType='+this.roleType+'&studentId='+this.studentId+'&openId='+this.token+'&phone='+this.optPhone;
            // location.replace(url)
          }, 1500);
        }else{
          this.$Message.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    choseStartTime(){
      //如果结束时间不为空，则反向计算时差
      
      if(this.formValidate.endTime){
        var startTime = this.formValidate.startTime.getTime();
        var endTime = this.formValidate.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formValidate.startTime = '';
        }else if(startTime==endTime){
          this.$Message.info('开始时间与结束时间一致');
          this.formValidate.startTime = '';
        }else{
          var xiangchazhi = endTime - startTime;
          this.formValidate.totalTime = common.TimeInterval(xiangchazhi)
        }
      }
    },
    choseEndTime(){
      //如果开始时间不为空，则正向计算时差
      if(this.formValidate.startTime){
        var startTime = this.formValidate.startTime.getTime();
        var endTime = this.formValidate.endTime.getTime();
        if(startTime>endTime){
          this.$Message.info('结束时间不能小于开始时间');
          this.formValidate.endTime = '';
        }else if(startTime==endTime){
          this.$Message.info('开始时间与结束时间一致');
          this.formValidate.endTime = '';
        }else{
          var xiangchazhi = endTime - startTime;
          this.formValidate.totalTime = common.TimeInterval(xiangchazhi)
        }
      }
    },
    clearStartTime(){
      this.formValidate.startTime = '';
      this.formValidate.totalTime = '';
    },
    clearStartTime(){
      this.formValidate.endTime = '';
      this.formValidate.totalTime = '';
    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.addAskFun();
                // this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    },
    handleView (name) {
        console.log("打开图片地址",name);
        this.formValidate.imgName = name;
        this.formValidate.visible = true;
    },
    handleRemove (file) {
        console.log("删除",file)
        console.log("删除11",this.uploadListArr)
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.uploadListArr.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      console.log("res",file);
      file.name =  res.data;
      file.url =  res.data;
      console.log("图片地址数组",this.formValidate.uploadList)
      this.uploadListArr.push(file.url)
    },
    handleFormatError (file) {
        this.$Message.error('文件' + file.name + ' 不正确，请选择JPG还是PNG.');
    },
    handleMaxSize (file) {
        this.$Message.error('文件' + file.name + ' 太大不能超过8M.');
    },
    handleBeforeUpload (file) {
      const check = this.formValidate.uploadList.length < 5;
      if (!check) {
          this.$Notice.warning({
              title: '最多上传五张图片'
          });
          return false;
      }
      return new Promise((resolve) => {
        console.log("压缩前-----",file)
        // 压缩到2M,这里的2048就是要压缩的大小,可自定义
        imageConversion.compressAccurately(file, 2048).then(res => {
          console.log("压缩后-------",res)
          resolve(res);
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.submitPage{
  // width:95%;
  // margin:0 auto;
  background:#fff;
  padding-bottom:50px;
  .textarea{
    
    /deep/.ivu-input{
      text-align: left;
    }
  }
  .submitBtn{
    background:#18a470;
    width:92%;
    position:fixed;
    bottom:25px;
    background:#18a470;
    left:0;
    right:0;
    margin:0 auto;
    height:45px;
  }
  .upload{
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .uploadBox{
    /deep/.ivu-form-item-content{
      margin-left:16px !important;
    }
  }
  .stepBox{
    /deep/.ivu-form-item-content{
      margin-left:16px !important;
      margin-top:20px;
    }
    .stepContainer{
      .stepcont{
        /deep/.ivu-timeline-item-content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name{
            font-weight:600;
            font-size:14px;
            line-height:18px;
          }
          .desc{
            font-size:13px;
            line-height:18px;
            margin-top:5px;
            color:#999;
          }
          .personName{
            padding-right:10px;
          }
        }
        
      }
    }
  }
  .lastFrom{
    border-bottom: 0;
    padding:0;
  }
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
</style>
