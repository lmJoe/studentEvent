<template>
  <div class="invitedCodePage">
    <div class="codeCont">
      <div class="tips">
        <span>温馨提示：</span>
        <p>1. 点击分享按钮或者长按保存预约二维码发送给拜访人填写</p>
        <p>2. 拜访人可以通过钉钉，浏览器识别二维码进行填写</p>
      </div>
      <div class="tipContent">
        <p>被访问人：{{teacherName}}</p>
        <p>来访开始时间：{{startTime}}</p>
        <p>来访结束时间：{{endTime}}</p>
      </div>
      <div class="erweimaImg" ref="qrCodeUrl">

      </div>
      <p class="tipsTitle">（长按放大或识别二维码）</p>
      <Button class="shareBtn" type="primary" size="large">分享</Button>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import QRCode from "qrcodejs2"
export default {
  name: 'index',
  data () {
    return {
      title:'访客二维码详情',
      isStudent:false,
      optPhone:'',
      inviteId:'',
      teacherName:'',
      startTime:'',
      endTime:'',
    }
  },
  created(){
    document.title = this.title;
    this.inviteId = this.$route.query.inviteId;
    this.optPhone = this.$route.query.optPhone;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    
    this.findShareDetail();
  },
  methods: {
    creatQrCode(url) {
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: url, // 需要转换为二维码的内容
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
    findShareDetail(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.findShareDetail+'?inviteId='+Number(this.inviteId),
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        console.log("res",res)
        if(res.code==200){
          console.log("返回数据",res)
          this.teacherName = res.data.inviteInfo.teacherName;
          this.startTime = res.data.inviteInfo.startTime;
          this.endTime = res.data.inviteInfo.endTime;
          var erweimaUrl = res.data.inviteUrl;
          this.creatQrCode(erweimaUrl)
        }else{
          this.$Message.info(res.msg)
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
.invitedCodePage{
  background:#2797fe;
  width:100%;
  height:100%;
  .codeCont{
    width:92%;
    height:500px;
    position:fixed;
    top:-90px;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    background:#fff;
    border-radius: 5px;
    .tips{
      background:#fff7e4;
      padding:25px 15px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      p{
        color:rgba(252,123,1);
        font-size:12px;
      }
      span{
        color:#333;
        font-weight:500;
        font-size:17px;
      }
    }
    .tipContent{
      padding:15px 25px;
      border-bottom:1px solid #dedede;
      p{
        font-size:13px;
        color:#666;
        margin-bottom:8px;
      }
    }
    .shareBtn{
      width:92%;
      display:block;
      margin:0 auto;
      position:absolute;
      bottom:25px;
      left:0;
      right:0;
    }
    .tipsTitle{
      text-align:center;
      font-size:13px;
      color:#999;
      margin-top:10px;
    }
    .erweimaImg{
      width:150px;
      height:150px;
      border:1px solid #dedede;
      margin:20px auto 0;
    }
  }
}

</style>
