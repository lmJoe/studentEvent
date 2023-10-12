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
      <Button class="shareBtn" type="primary" size="large" @click="useWxShare()">分享</Button>
    </div>
    <div class="shareBg" v-show="shareDialog">
        <img :src="shareImg" alt="">
      </div>
      <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import QRCode from "qrcodejs2"
import shareImg from '@/assets/imgs/shareImg.png';//审批拒绝
import { wexinShare } from '@/utils/weixinShare.js';
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
      linkimgUrl:'',
      inviteUrl:'',
      shareImg:shareImg,
      shareDialog:false,
      isLoading:false,
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
    useWxShare(){
      //请求微信配置参数接口（获取签名），由后台给接口给
      var urls = window.location.href.split('#')[0];
      
      console.log(urls, 22222333);
      // const msg = this.$Message.loading({
      //     content: 'Loading...',
      //     duration: 0
      // });
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWxConfig+'?url='+urls,
        data: {},
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
        if(res.code==200){
          //微信加签
          console.log("res-----",res)
          var obj = {
            appId: res.data.appid,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            timestamp: res.data.timestamp,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          };
          //分享数据，这段主要是为了在hash模式下分享出去的链接不被浏览器截取，保证完全把链接分享出去
          var url = window.location.href.split('#')[0];
          // var shareWxLink = encodeURIComponent(url);加密
          let shareData = {
              title: '拜访信息填写', // 分享标题
              desc:'请填写邀填信息',
              link: this.erweimaUrl,
              // link: window.location.href,
              imgUrl: this.linkimgUrl, // 分享图标
              
          };
          //引用
          // wexinShare(obj, shareData,callback);
          wexinShare(obj, shareData,(res)=>{
            console.log("分享实现调用",res);
            //弹起分享窗口
            this.shareDialog = true;
          })
        }else{
          this.$Message.info('获取sdk参数失败！');
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
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
      this.isLoading = true;
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
        this.isLoading = false;
        if(res.code==200){
          console.log("返回数据----",res)
          this.teacherName = res.data.inviteInfo.teacherName;
          this.startTime = res.data.inviteInfo.startTime;
          this.endTime = res.data.inviteInfo.endTime;
          var erweimaUrl = res.data.inviteUrl;
          this.erweimaUrl = res.data.inviteUrl;
          this.linkimgUrl = res.data.inviteLinkPic;
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
  .shareBg{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
    img{
      width:88%;
      position:absolute;
      top:20px;
      right:10px;
      bottom:0;
    }
  }
}

</style>
