(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06dcd3c2"],{"232d":function(t,e,i){t.exports=i.p+"img/no-data.eca1736d.png"},"24c1":function(t,e,i){"use strict";i("6b32")},"2c69":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"askPage"},[t._l(t.dataList,(function(i,a){return e("Card",{key:a,staticClass:"cardBox",nativeOn:{click:function(e){return t.visitorDetail(i.studentId,i.id)}}},[e("p",{staticClass:"time",attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(i.startTime)+" ")]),e("p",{style:{color:0==i.approveStatus?"#f49048":1==i.approveStatus?"#24c789":2==i.approveStatus?"rgba(250,100,0)":""},attrs:{slot:"extra"},slot:"extra"},[t._v(" "+t._s(i.approveStr)+" ")]),e("div",{staticClass:"content"},[e("p",[t._v("访客："+t._s(i.visitorName))]),e("p",[t._v("来访目的："+t._s(i.visitReason))]),e("p",[t._v("被访人："+t._s(i.teacherName))])])])})),t.isNodata?e("div",{staticClass:"nodata"},[e("img",{attrs:{src:t.nodata,alt:""}}),e("span",[t._v("暂无数据")])]):t._e(),1==t.roleId?e("Button",{staticClass:"addAsk",attrs:{type:"primary"},on:{click:function(e){return t.handleAdd()}}},[t._v("发起访客预约")]):t._e(),e("Loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]})],2)},s=[],o=(i("14d9"),i("b1d0")),n=i("1271"),d=i("3b2d"),r=i("232d"),c=i.n(r),l={name:"index",data:function(){return{title:"访客名单",isNodata:!0,studentId:"",optPhone:"",roleId:1,dataList:[],nodata:c.a,openId:"",isLoading:!1}},created:function(){document.title=this.title,this.optPhone=d["a"].getQueryVariable("phone"),this.studentId=d["a"].getQueryVariable("studentId"),this.roleId=d["a"].getQueryVariable("roleType"),1==this.roleId?this.title="我发起的":this.title="访客名单",document.title=this.title,this.getConfig()},activated:function(){document.title=this.title},mounted:function(){},methods:{getConfig:function(){var t,e=this;this.isLoading=!0,t=1==this.roleId?n["a"].recordUrl.visitrecList:n["a"].recordUrl.visitorlist,Object(o["a"])({method:"get",url:t+"?phone="+this.optPhone,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.isLoading=!1,200==t.code?(t.data.length?e.isNodata=!1:e.isNodata=!0,e.dataList=t.data,console.log(e.dataList)):e.$Message.info(t.msg)})).catch((function(t){console.log(t)}))},handleAdd:function(){this.$router.push({path:"guestadd",query:{optPhone:this.optPhone,studentId:this.studentId,roleType:this.roleId}})},visitorDetail:function(t,e){this.$router.push({path:"visitordetail",query:{studentId:t,optPhone:this.optPhone,roleType:this.roleId,eventId:e}})}}},u=l,h=(i("24c1"),i("2877")),p=Object(h["a"])(u,a,s,!1,null,"1f001ae9",null);e["default"]=p.exports},"6b32":function(t,e,i){}}]);