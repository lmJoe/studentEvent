(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c705b1ee"],{"00b4":function(e,t,i){"use strict";i("ac1f");var s=i("23e7"),n=i("c65b"),o=i("1626"),a=i("825a"),r=i("577e"),m=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),d=/./.test;s({target:"RegExp",proto:!0,forced:!m},{test:function(e){var t=a(this),i=r(e),s=t.exec;if(!o(s))return n(d,t,i);var m=n(s,t,i);return null!==m&&(a(m),!0)}})},"07e2":function(e,t,i){"use strict";i("0df2")},"0df2":function(e,t,i){},"296d":function(e,t,i){"use strict";i.r(t);i("b0c0");var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"guestAddPage"},[t("Form",{attrs:{model:e.formItem,"label-width":90}},[e._l(e.formItemList,(function(i,s){return t("div",{key:s},[t("p",{staticClass:"dataTitle"},[e._v(e._s("访客"+(s+1)))]),t("FormItem",{attrs:{label:"访客姓名"}},[t("Input",{attrs:{placeholder:"请输入..."},model:{value:i.visitName,callback:function(t){e.$set(i,"visitName",t)},expression:"item.visitName"}})],1),t("FormItem",{attrs:{label:"访客手机"}},[t("Input",{attrs:{placeholder:"请输入..."},model:{value:i.phone,callback:function(t){e.$set(i,"phone",t)},expression:"item.phone"}})],1),t("FormItem",{attrs:{label:"访客身份证"}},[t("Input",{attrs:{placeholder:"请输入..."},model:{value:i.visitorIdentity,callback:function(t){e.$set(i,"visitorIdentity",t)},expression:"item.visitorIdentity"}})],1)],1)})),t("div",{staticClass:"addPer"},[t("Icon",{attrs:{type:"md-add"}}),t("Button",{attrs:{type:"text"},on:{click:e.addPer}},[e._v("添加同行人")])],1)],2),t("p",{staticClass:"divider"},[e._v("访问信息")]),t("Form",{staticClass:"detailMsg",attrs:{model:e.formItemTime,"label-position":"top","label-width":66}},[t("FormItem",{attrs:{label:"选择时间"}},[t("Row",[t("Col",{attrs:{span:"11"}},[t("DatePicker",{attrs:{type:"datetime",placeholder:"选择起始时间","start-date":new Date,disabled:e.isdisAbled,format:"yyyy-MM-dd HH:mm"},on:{"on-ok":function(t){return e.choseStartTime()},"on-change":function(t){return e.choseStartTime()},"on-clear":function(t){return e.clearStartTime()}},model:{value:e.formItemTime.startTime,callback:function(t){e.$set(e.formItemTime,"startTime",t)},expression:"formItemTime.startTime"}})],1),t("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("-")]),t("Col",{attrs:{span:"11"}},[t("DatePicker",{attrs:{type:"datetime",placeholder:"选择结束时间","start-date":new Date,disabled:e.isdisAbled,format:"yyyy-MM-dd HH:mm"},on:{"on-ok":function(t){return e.choseEndTime()},"on-change":function(t){return e.choseEndTime()},"on-clear":function(t){return e.clearEndTime()}},model:{value:e.formItemTime.endTime,callback:function(t){e.$set(e.formItemTime,"endTime",t)},expression:"formItemTime.endTime"}})],1)],1)],1)],1),t("Form",{attrs:{model:e.formItemMsg,"label-width":90}},[t("FormItem",{attrs:{label:"来访目的"}},[t("Input",{attrs:{maxlength:"10",placeholder:"请输入（最多10个字）"},model:{value:e.formItemMsg.visitReason,callback:function(t){e.$set(e.formItemMsg,"visitReason",t)},expression:"formItemMsg.visitReason"}})],1),t("FormItem",{attrs:{label:"到访地址"}},[t("Input",{attrs:{type:"textarea",maxlength:"20",placeholder:"请输入（最多20个字）"},model:{value:e.formItemMsg.visitDestination,callback:function(t){e.$set(e.formItemMsg,"visitDestination",t)},expression:"formItemMsg.visitDestination"}})],1)],1),e.isStudent?t("Form",{attrs:{model:e.formItemPer,"label-width":90}},[t("FormItem",{attrs:{label:"就读学生"}},[t("Input",{model:{value:e.formItemPer.name,callback:function(t){e.$set(e.formItemPer,"name",t)},expression:"formItemPer.name"}})],1)],1):e._e(),t("Button",{staticClass:"submitBtn",attrs:{type:"primary"},on:{click:e.shureSubmit}},[e._v("确认预约")]),t("Loading",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]})],1)},n=[],o=i("ade3"),a=(i("a9e3"),i("ac1f"),i("5319"),i("14d9"),i("4d63"),i("c607"),i("2c3e"),i("25f0"),i("00b4"),i("b1d0")),r=i("1271"),m=i("3b2d"),d={name:"index",data:function(){return{title:"访客预约",isStudent:!1,optPhone:"",formItem:{visitorName:"",visitorPhone:"",visitorIdentity:""},formItemTime:{startTime:"",endTime:""},formItemMsg:{visitReason:"",visitDestination:""},formItemList:[{visitName:"",phone:"",visitorIdentity:""}],formItemPer:{name:"",studentId:""},roleType:"",eventType:1,inviteCount:0,isdisAbled:!1,inviteId:"",isLoading:!1}},created:function(){document.title=this.title,this.optPhone=m["a"].getQueryVariable("optPhone"),m["a"].getQueryVariable("inviteId")&&(this.inviteId=Number(m["a"].getQueryVariable("inviteId"))),m["a"].getQueryVariable("startTime")&&(this.isdisAbled=!0,this.formItemTime.startTime=m["a"].shijianc(Number(m["a"].getQueryVariable("startTime")))),m["a"].getQueryVariable("endTime")&&(this.isdisAbled=!0,this.formItemTime.endTime=m["a"].shijianc(Number(m["a"].getQueryVariable("endTime")))),m["a"].getQueryVariable("inviteCount")&&(this.inviteCount=m["a"].getQueryVariable("inviteCount")),m["a"].getQueryVariable("roleType")&&(this.roleType=m["a"].getQueryVariable("roleType")),m["a"].getQueryVariable("eventType")&&(this.eventType=m["a"].getQueryVariable("eventType")),m["a"].getQueryVariable("studentId")&&(this.formItemPer.studentId=m["a"].getQueryVariable("studentId"))},activated:function(){document.title=this.title},mounted:function(){},methods:Object(o["a"])({addAskFun:function(){var e=this,t={visitorName:this.formItemList[0].visitName,visitorPhone:this.formItemList[0].phone,visitorIdentity:this.formItemList[0].visitorIdentity,startTime:m["a"].getQueryVariable("startTime")?this.formItemTime.startTime:m["a"].changeTimeFormat(this.formItemTime.startTime),endTime:m["a"].getQueryVariable("endTime")?this.formItemTime.endTime:m["a"].changeTimeFormat(this.formItemTime.endTime),visitReason:this.formItemMsg.visitReason,visitDestination:this.formItemMsg.visitDestination,visitorRecordList:this.formItemList,studentId:this.formItemPer.studentId,optPhone:this.optPhone,inviteId:this.inviteId,eventType:this.eventType};console.log("params",t),this.isLoading=!0,Object(a["a"])({method:"post",url:r["a"].recordUrl.visitoradd,data:t,headers:{"Content-Type":"application/json"}}).then((function(t){e.isLoading=!1,console.log("res",t),200==t.code?(console.log("res",t),e.$Message.info(t.msg),setTimeout((function(){var t=window.location.protocol+"//"+window.location.hostname+"/event/index.html#/guestIndex?roleType="+e.roleType+"&studentId="+e.formItemPer.studentId+"&openId="+e.token+"&phone="+e.optPhone;location.replace(t)}),1500)):e.$Message.info(t.msg)})).catch((function(e){console.log(e)}))},addPer:function(){console.log("this.formItemList.length",this.formItemList.length+1),console.log("this.inviteCount",this.inviteCount),0!==this.inviteCount&&this.formItemList.length+1>this.inviteCount?this.$Message.info("已超出访问人数上限"):this.formItemList.push({visitName:"",phone:"",visitorIdentity:""})},shureSubmit:function(){var e=new RegExp("^1[3578]\\d{9}$");this.formItemList[0].visitName?this.formItemList[0].phone?e.test(this.formItemList[0].phone)?this.formItemList[0].visitorIdentity?this.isValidIDCard(this.formItemList[0].visitorIdentity)?this.formItemTime.startTime?this.formItemTime.endTime?this.formItemMsg.visitReason?this.addAskFun():this.$Message.info("访客目的不能为空"):this.$Message.info("访客结束时间不能为空"):this.$Message.info("访客开始时间不能为空"):this.$Message.info("访客身份证格式错误"):this.$Message.info("访客身份证不能为空"):this.$Message.info("访客手机格式错误"):this.$Message.info("访客手机不能为空"):this.$Message.info("访客姓名不能为空")},isValidIDCard:function(e){var t=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;return t.test(e)},choseStartTime:function(){if(this.formItemTime.endTime){var e=this.formItemTime.startTime.getTime(),t=this.formItemTime.endTime.getTime();e>t?(this.$Message.info("结束时间不能小于开始时间"),this.formItemTime.startTime=""):e==t&&(this.$Message.info("开始时间与结束时间一致"),this.formItemTime.startTime="")}},choseEndTime:function(){if(this.formItemTime.startTime){var e=this.formItemTime.startTime.getTime(),t=this.formItemTime.endTime.getTime();e>t?(this.$Message.info("结束时间不能小于开始时间"),this.formItemTime.endTime=""):e==t&&(this.$Message.info("开始时间与结束时间一致"),this.formItemTime.endTime="")}},clearStartTime:function(){this.formValidate.startTime=""}},"clearStartTime",(function(){this.formValidate.endTime=""}))},l=d,c=(i("07e2"),i("2877")),u=Object(c["a"])(l,s,n,!1,null,"424b730a",null);t["default"]=u.exports},b0c0:function(e,t,i){"use strict";var s=i("83ab"),n=i("5e77").EXISTS,o=i("e330"),a=i("edd0"),r=Function.prototype,m=o(r.toString),d=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,l=o(d.exec),c="name";s&&!n&&a(r,c,{configurable:!0,get:function(){try{return l(d,m(this))[1]}catch(e){return""}}})}}]);