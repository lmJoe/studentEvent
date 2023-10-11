<template>
  <div class="askPage">
    <Card class="cardBox"  v-for="(item,index) in dataList" :key="index" @click.native="visitorDetail(item.studentId,item.id)">
        <p slot="title" class="time">
            {{item.startTime}}
        </p>
        <p slot="extra" :style="{color:item.approveStatus==0?'#f49048':item.approveStatus==1?'#24c789':item.approveStatus==2?'rgba(250,100,0)':''}">
           {{item.approveStr}}
        </p>
        <div class="content">
          <p>访客：{{item.visitorName}}</p>
          <p>来访目的：{{item.visitReason}}</p>
          <p>被访人：{{item.studentName}}</p>
        </div>
    </Card>
    <div class="nodata" v-if="isNodata">
      <img :src="nodata" alt="">
      <span>暂无数据</span>
    </div>
    <Button class="addAsk" type="primary" @click="handleAdd()" v-if="roleId==1">发起访客预约</Button>
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
      title:'我发起的',
      isNodata:true,
      studentId:'',
      optPhone:'',
      roleId:1,//1-提交人 2-审批人 3-门卫
      dataList:[],
      nodata:nodata,
      openId:'',
    }
  },
  created(){
    document.title = this.title;
    //获取链接中的参数
    this.optPhone = common.getQueryVariable("phone");//家长手机
    this.studentId = common.getQueryVariable("studentId");//家长手机
    this.roleId = common.getQueryVariable("roleType");//角色id
    // console.log("1",this.optPhone,this.roleId)
    this.getConfig()
    
  },
  activated (){
    document.title = this.title;
    
  },
  mounted() {
    
  },
  methods: {
    getConfig(){
      // const msg = this.$Message.loading({
      //     content: 'Loading...',
      //     duration: 0
      // });
      var url;
      if(this.roleId==1){
        url = URL.recordUrl.visitrecList;
      }else{
        url = URL.recordUrl.visitorlist;
      }
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:url+'?phone='+this.optPhone,
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
        path:'guestadd',
        query:{
          optPhone:this.optPhone,
          studentId:this.studentId,
          roleType:this.roleId
        }
      })
    },
    visitorDetail(studentId,id){
      this.$router.push({
        path:'visitordetail',
        query:{
          studentId:studentId,
          optPhone:this.optPhone,
          roleType:this.roleId,
          eventId:id
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
    .time{
        font-size:18px;
        color:#333;
    }
    .content p{
        margin-bottom:10px;
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
  .addAsk{
    width:92%;
    margin:0 auto;
    position:fixed;
    bottom:25px;
    background:#18a470;
    height:45px;
  }
}
/deep/.ivu-btn-primary{
  border-color:#18a470;
}
</style>
