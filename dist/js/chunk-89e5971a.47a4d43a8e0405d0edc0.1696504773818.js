(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-89e5971a"],{1741:function(t,e,a){t.exports=a.p+"img/status1.e0513603.png"},6284:function(t,e,a){"use strict";a("cc97")},"78ca":function(t,e,a){t.exports=a.p+"img/status3.1b3347fe.png"},"94ec":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"askdetailPage"},[e("div",{staticClass:"card"},[e("div",{staticClass:"cardTop"},[e("Avatar",{attrs:{size:"large",src:t.head}}),e("div",{staticClass:"cardBox"},[e("p",{staticClass:"name"},[t._v(t._s(t.studentName))]),e("p",{staticClass:"date"},[t._v(t._s(t.updateTime))])])],1),e("div",{staticClass:"cardBottom"},[e("p",{staticClass:"firstMsg"},[t._v("审批编号："),e("span",[t._v(t._s(t.flowNo))])]),e("p",{staticClass:"firstMsg"},[t._v("请假类型："),e("span",[t._v(t._s(t.eventTypeStr))])]),e("div",{staticClass:"step"},[e("p",{staticClass:"stepAskTime"},[t._v("请假时长："+t._s(t.eventTotalDay)+"天")]),e("Timeline",{staticClass:"stepBox"},[e("TimelineItem",{attrs:{color:"#999"}},[t._v(t._s(t.eventStartTime))]),e("TimelineItem",{attrs:{color:"#999"}},[t._v(t._s(t.eventEndTime))])],1)],1),e("div",{staticClass:"askMsg"},[e("p",[e("span",[t._v("请假事由：")]),t._v(t._s(t.eventReason))]),e("p",[e("span",[t._v("体温情况：")]),t._v(t._s(t.temperatureStatus))]),e("p",[e("span",[t._v("体温：")]),t._v(t._s(t.temperature))])]),e("div",{staticClass:"askImages"},t._l(t.eventPicPath,(function(t,a){return e("img",{key:a,attrs:{src:t}})})),0)]),e("img",{staticClass:"statusImg",attrs:{src:1==t.agreeStat?t.status1:2==t.agreeStat?t.status2:3==t.agreeStat?t.status3:"",alt:""}})]),e("div",{staticClass:"cardStep"},[e("Timeline",t._l(t.spList,(function(a,s){return e("TimelineItem",{key:s,scopedSlots:t._u([{key:"dot",fn:function(){return[e("span",{staticClass:"name"},[t._v(t._s(0==s?"家":a.refPersonName.charAt(0)))])]},proxy:!0}],null,!0)},[e("div",[e("p",{staticClass:"doThing"},[e("span",[t._v(t._s(a.optPersonTypeStr))]),e("span",{staticClass:"time"},[t._v(t._s(a.createTime))])]),e("p",{staticClass:"namedetail"},[t._v(" "+t._s(""!=a.approveStr&&null!=a.approveStr||0!=s?a.refPersonName:"家长")+" "+t._s(""==a.approveStr||null==a.approveStr?" ":"("+a.approveStr+")")+" ")])])])})),1)],1),1==t.roleId||1!==t.agreeStat?e("Button",{staticClass:"backBtn",attrs:{type:"primary",disabled:1!=t.agreeStat},on:{click:function(e){return t.askBtn()}}},[t._v("撤回")]):2==t.roleId||1==t.agreeStat?e("div",{staticClass:"spDom"},[e("Button",{staticClass:"aggreeBtn",attrs:{type:"primary"},on:{click:function(e){return t.aggreeBtn(1)}}},[t._v("同意")]),e("Button",{staticClass:"rejectBtn",attrs:{type:"success",ghost:""},on:{click:function(e){return t.aggreeBtn(2)}}},[t._v("拒绝")])],1):t._e()],1)},n=[],o=(a("14d9"),a("a9e3"),a("ac1f"),a("5319"),a("b1d0")),i=a("1271"),r=a("3b2d"),c=a("1741"),d=a.n(c),l=a("cf5b"),u=a.n(l),p=a("78ca"),v=a.n(p),m=a("c7ef"),g=a.n(m),h={name:"index",data:function(){return{title:"请假详情",status1:d.a,status2:u.a,status3:v.a,studentId:"",id:"",studentName:"",updateTime:"",flowNo:"",eventTypeStr:"",eventTotalDay:"",eventStartTime:"",eventEndTime:"",eventReason:"",temperatureStatus:"",temperature:"-",spList:[],agreeStat:"",eventPicPath:[],head:g.a,roleId:"",token:""}},created:function(){document.title=this.title,this.studentId=this.$route.query.studentId,this.id=this.$route.query.id,this.optPhone=this.$route.query.optPhone,this.roleId=this.$route.query.roleId,this.token=this.$route.query.token,this.getDetailFun()},activated:function(){document.title=this.title},mounted:function(){},methods:{getDetailFun:function(){var t=this;Object(o["a"])({method:"get",url:i["a"].recordUrl.getDetail+"?studentId="+this.studentId+"&eventId="+this.id,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("res",e),200==e.code?(console.log("返回数据",e),t.studentName=e.data.event.studentName,t.updateTime=r["a"].shijianc(e.data.event.updateTime),t.flowNo=e.data.event.flowNo,t.eventTypeStr=e.data.event.eventTypeStr,t.eventTotalDay=e.data.event.eventTotalDay,t.eventStartTime=e.data.event.eventStartTime,t.eventEndTime=e.data.event.eventEndTime,t.eventReason=e.data.event.eventReason,t.eventPicPath=e.data.event.eventPicPathArr,t.temperatureStatus=1==e.data.event.temperatureStatus?"体温正常":"体温异常",t.temperature=e.data.event.temperature,t.spList=e.data.eventHistory,t.agreeStat="未审批"==e.data.event.approveStr?1:"同意"==e.data.event.approveStr?2:"拒绝"==e.data.event.approveStr?3:""):t.$Message.info(e.msg)})).catch((function(t){console.log(t)}))},handleAdd:function(){this.$router.push({path:"addAsk"})},askBtn:function(){var t=this;Object(o["a"])({method:"post",url:i["a"].recordUrl.eventRollback,data:{eventId:Number(this.id),optPhone:Number(this.optPhone)},headers:{"Content-Type":"application/json"}}).then((function(e){console.log("res",e),200==e.code?(console.log("返回数据",e),t.$Message.info(e.msg),setTimeout((function(){t.$router.go(-1)}),1500)):t.$Message.info(e.msg)})).catch((function(t){console.log(t)}))},aggreeBtn:function(t){var e=this;Object(o["a"])({method:"post",url:i["a"].recordUrl.approve,data:{eventId:Number(this.id),recStatus:t},headers:{"Content-Type":"application/json"}}).then((function(t){console.log("res",t),200==t.code?(console.log("返回数据",t),e.$Message.info(t.msg),setTimeout((function(){void 0==e.roleId&&(e.roleId=r["a"].getQueryVariable("roleType")),void 0==e.token&&(e.token=r["a"].getQueryVariable("openId"));var t=window.location.protocol+"//"+window.location.hostname+"/event/index.html#/index?roleType="+e.roleId+"&studentId="+e.studentId+"&openId="+e.token+"&phone="+e.optPhone;console.log("url",t),location.replace(t)}),1500)):e.$Message.info(t.msg)})).catch((function(t){console.log(t)}))}}},f=h,_=(a("6284"),a("2877")),T=Object(_["a"])(f,s,n,!1,null,"33257560",null);e["default"]=T.exports},c7ef:function(t,e,a){t.exports=a.p+"img/head.c41c7c84.png"},cc97:function(t,e,a){},cf5b:function(t,e,a){t.exports=a.p+"img/status2.444c4dee.png"}}]);