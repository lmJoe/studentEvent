(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04e4512f"],{1741:function(t,e,a){t.exports=a.p+"img/status1.e0513603.png"},"2e42":function(t,e,a){"use strict";a("bd68")},"4c47":function(t,e,a){t.exports=a.p+"img/status4.de1ec3aa.png"},"78ca":function(t,e,a){t.exports=a.p+"img/status3.1b3347fe.png"},"94ec":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"askdetailPage"},[e("div",{staticClass:"card"},[e("div",{staticClass:"cardTop"},[e("Avatar",{attrs:{size:"large",src:t.head}}),e("div",{staticClass:"cardBox"},[e("p",{staticClass:"name"},[t._v(t._s(t.studentName))]),e("p",{staticClass:"date"},[t._v(t._s(t.updateTime))])])],1),e("div",{staticClass:"cardBottom"},[e("p",{staticClass:"firstMsg"},[t._v("审批编号："),e("span",[t._v(t._s(t.flowNo))])]),e("p",{staticClass:"firstMsg"},[t._v("请假类型："),e("span",[t._v(t._s(t.eventTypeStr))])]),e("div",{staticClass:"step"},[e("p",{staticClass:"stepAskTime"},[t._v("请假时长："+t._s(t.eventTotalDay))]),e("Timeline",{staticClass:"stepBox"},[e("TimelineItem",{attrs:{color:"#999"}},[t._v(t._s(t.eventStartTime))]),e("TimelineItem",{attrs:{color:"#999"}},[t._v(t._s(t.eventEndTime))])],1)],1),e("div",{staticClass:"askMsg"},[e("p",[e("span",{staticClass:"left"},[t._v("请假事由：")]),e("span",{staticClass:"right"},[t._v(t._s(t.eventReason))])]),e("p",[e("span",{staticClass:"left"},[t._v("体温情况：")]),e("span",{staticClass:"right"},[t._v(t._s(t.temperatureStatus))])]),e("p",[e("span",{staticClass:"left"},[t._v("体温：")]),e("span",{staticClass:"right"},[t._v(t._s(t.temperature))])])]),e("div",{staticClass:"askImages"},t._l(t.eventPicPath,(function(a,s){return e("img",{key:s,attrs:{src:a},on:{click:function(e){return t.searchBigImg(a)}}})})),0)]),e("img",{staticClass:"statusImg",attrs:{src:0==t.agreeStat?t.status1:1==t.agreeStat?t.status2:2==t.agreeStat?t.status3:3==t.agreeStat?t.status4:"",alt:""}})]),e("div",{staticClass:"cardStep"},[e("Timeline",t._l(t.spList,(function(a,s){return e("TimelineItem",{key:s,scopedSlots:t._u([{key:"dot",fn:function(){return[e("span",{staticClass:"name"},[t._v(t._s(0==s?"家":a.refPersonName.charAt(0)))])]},proxy:!0}],null,!0)},[e("div",[e("p",{staticClass:"doThing"},[e("span",[t._v(t._s(a.optPersonTypeStr))]),e("span",{staticClass:"time"},[t._v(t._s(a.createTime))])]),e("p",{staticClass:"namedetail"},[t._v(" "+t._s(""!=a.currentStatus&&null!=a.currentStatus||0!=s?a.refPersonName:"家长")+" "+t._s(1==a.currentStatus?"(已同意)":2==a.currentStatus?"(已拒绝)":3==a.currentStatus?"(已撤回)":0==a.currentStatus&&0!==s?"(未审批)":"")+" ")])])])})),1)],1),1!=t.roleId||0!=t.agreeStat&&1!=t.agreeStat||1===t.guardCheckoutStatus?t._e():e("Button",{staticClass:"backBtn",attrs:{type:"primary",disabled:0!=t.agreeStat&&1!=t.agreeStat},on:{click:function(e){return t.askBtn()}}},[t._v("撤回 ")]),2==t.roleId&&0==t.agreeStat?e("div",{staticClass:"spDom"},[e("Button",{staticClass:"aggreeBtn",attrs:{type:"primary"},on:{click:function(e){return t.aggreeBtn(1)}}},[t._v("同意")]),e("Button",{staticClass:"rejectBtn",attrs:{type:"success",ghost:""},on:{click:function(e){return t.aggreeBtn(2)}}},[t._v("拒绝")])],1):t._e(),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isBigImg,expression:"isBigImg"}],staticClass:"bigImgBg",on:{click:function(e){return t.closeBig()}}},[e("img",{staticClass:"bigImg",attrs:{src:t.bigImgUrl}})]),e("Loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]})],1)},n=[],i=(a("14d9"),a("a9e3"),a("ac1f"),a("5319"),a("b1d0")),o=a("1271"),r=a("3b2d"),c=a("1741"),u=a.n(c),d=a("cf5b"),l=a.n(d),g=a("78ca"),p=a.n(g),v=a("4c47"),m=a.n(v),h=a("c7ef"),f=a.n(h),_={name:"index",data:function(){return{title:"请假详情",status1:u.a,status2:l.a,status3:p.a,status4:m.a,studentId:"",id:"",studentName:"",updateTime:"",flowNo:"",eventTypeStr:"",eventTotalDay:"",eventStartTime:"",eventEndTime:"",eventReason:"",temperatureStatus:"",temperature:"-",spList:[],agreeStat:"",eventPicPath:[],head:f.a,roleId:"",token:"",guardCheckoutStatus:"",isLoading:!1,isBigImg:!1,bigImgUrl:""}},created:function(){document.title=this.title,r["a"].getQueryVariable("roleType")&&(this.roleId=r["a"].getQueryVariable("roleType")),r["a"].getQueryVariable("optPhone")&&(this.optPhone=r["a"].getQueryVariable("optPhone")),r["a"].getQueryVariable("studentId")&&(this.studentId=r["a"].getQueryVariable("studentId")),r["a"].getQueryVariable("openId")&&(this.openId=r["a"].getQueryVariable("openId")),r["a"].getQueryVariable("id")&&(this.id=r["a"].getQueryVariable("id")),this.getDetailFun()},activated:function(){document.title=this.title},mounted:function(){},methods:{closeBig:function(){this.isBigImg=!1},searchBigImg:function(t){this.bigImgUrl=t,this.isBigImg=!0},getDetailFun:function(){var t=this;this.isLoading=!0,Object(i["a"])({method:"get",url:o["a"].recordUrl.getDetail+"?studentId="+this.studentId+"&eventId="+this.id,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("res",e),t.isLoading=!1,200==e.code?(console.log("返回数据",e),t.studentName=e.data.event.studentName,t.updateTime=r["a"].shijianc(e.data.event.updateTime),t.flowNo=e.data.event.flowNo,t.eventTypeStr=e.data.event.eventTypeStr,t.eventTotalDay=e.data.event.eventTotalDay,t.eventStartTime=e.data.event.eventStartTime,t.eventEndTime=e.data.event.eventEndTime,t.eventReason=e.data.event.eventReason,t.eventPicPath=e.data.event.eventPicPathArr,t.guardCheckoutStatus=e.data.event.guardCheckoutStatus,t.temperatureStatus=1==e.data.event.temperatureStatus?"体温正常":"体温异常",t.temperature=e.data.event.temperature,t.spList=e.data.eventHistory,t.agreeStat=e.data.event.currentStatus):t.$Message.info(e.msg)})).catch((function(t){console.log(t)}))},handleAdd:function(){this.$router.push({path:"addAsk"})},askBtn:function(){var t=this;this.isLoading=!0,Object(i["a"])({method:"post",url:o["a"].recordUrl.eventRollback,data:{eventId:Number(this.id),optPhone:Number(this.optPhone)},headers:{"Content-Type":"application/json"}}).then((function(e){t.isLoading=!1,console.log("res",e),200==e.code?(console.log("返回数据",e),t.$Message.info(e.msg),setTimeout((function(){t.$router.go(-1)}),1500)):t.$Message.info(e.msg)})).catch((function(t){console.log(t)}))},aggreeBtn:function(t){var e=this;this.isLoading=!0,Object(i["a"])({method:"post",url:o["a"].recordUrl.approve,data:{eventId:Number(this.id),recStatus:t},headers:{"Content-Type":"application/json"}}).then((function(t){e.isLoading=!1,console.log("res",t),200==t.code?(console.log("返回数据",t),e.$Message.info(t.msg),setTimeout((function(){void 0==e.roleId&&(e.roleId=r["a"].getQueryVariable("roleType")),void 0==e.openId&&(e.openId=r["a"].getQueryVariable("openId"));var t=window.location.protocol+"//"+window.location.hostname+"/event/index.html#/index?roleType="+e.roleId+"&studentId="+e.studentId+"&openId="+e.openId+"&phone="+e.optPhone;console.log("url",t),location.replace(t)}),1500)):e.$Message.info(t.msg)})).catch((function(t){console.log(t)}))}}},I=_,b=(a("2e42"),a("2877")),C=Object(b["a"])(I,s,n,!1,null,"3cee3c52",null);e["default"]=C.exports},bd68:function(t,e,a){},c7ef:function(t,e,a){t.exports=a.p+"img/head.c41c7c84.png"},cf5b:function(t,e,a){t.exports=a.p+"img/status2.ab1ba18b.png"}}]);