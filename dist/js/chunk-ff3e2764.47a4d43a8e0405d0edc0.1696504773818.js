(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff3e2764"],{1741:function(t,e,a){t.exports=a.p+"img/status1.e0513603.png"},"232d":function(t,e,a){t.exports=a.p+"img/no-data.eca1736d.png"},"4cc5":function(t,e,a){"use strict";a("cdb6")},"78ca":function(t,e,a){t.exports=a.p+"img/status3.1b3347fe.png"},c034:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"askPage"},[t._l(t.dataList,(function(a,s){return e("Card",{key:s,staticClass:"cardBox",nativeOn:{click:function(e){return t.askDetail(a.studentId,a.id)}}},[e("p",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(a.studentName)+" ")]),e("p",{attrs:{slot:"extra"},slot:"extra"},[t._v(" "+t._s(t.common.shijianc(a.updateTime))+" ")]),e("div",[e("p",[t._v("请假类型："+t._s(a.eventTypeStr))]),e("p",[t._v("请假时长："+t._s(a.eventTotalDay))])]),e("div",{staticClass:"askMsg"},[e("Timeline",[e("TimelineItem",[t._v(t._s(t.common.shijianc(a.eventStartTime)))]),e("TimelineItem",[t._v(t._s(t.common.shijianc(a.eventEndTime)))])],1),e("img",{staticClass:"statusImg",attrs:{src:0==a.approveStatus?t.status1:1==a.approveStatus?t.status2:t.status3,alt:""}})],1)])})),t.isNodata?e("div",{staticClass:"nodata"},[e("img",{attrs:{src:t.nodata,alt:""}}),e("span",[t._v("暂无数据")])]):t._e(),1==t.roleId?e("Button",{staticClass:"addAsk",attrs:{type:"primary"},on:{click:function(e){return t.handleAdd()}}},[t._v("新增")]):t._e()],2)},n=[],i=(a("14d9"),a("b1d0")),o=a("1271"),d=a("3b2d"),c=a("1741"),r=a.n(c),u=a("cf5b"),l=a.n(u),h=a("78ca"),p=a.n(h),m=a("232d"),f=a.n(m),g={name:"index",data:function(){return{title:"学生请假",status1:r.a,status2:l.a,status3:p.a,studentName:"",time:"",startTime:"",endTime:"",eventStatus:"",totalDay:"",studentId:"",dataList:[],optPhone:"",token:"",roleId:"",nodata:f.a,isNodata:!0}},created:function(){document.title=this.title,this.optPhone=d["a"].getQueryVariable("phone"),this.studentId=d["a"].getQueryVariable("studentId"),this.token=d["a"].getQueryVariable("openId"),this.roleId=d["a"].getQueryVariable("roleType"),console.log("1",this.optPhone,this.roleId),this.getConfig()},activated:function(){document.title=this.title},mounted:function(){},methods:{getConfig:function(){var t,e=this;t=2==this.roleId?o["a"].recordUrl.listEventByTeacherPhone+"?phone="+this.optPhone:o["a"].recordUrl.getlist+"?token="+this.token+"&studentId="+this.studentId,Object(i["a"])({method:"get",url:t,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){200==t.code?(t.data.length?e.isNodata=!1:e.isNodata=!0,e.dataList=t.data,console.log(e.dataList)):e.$Message.info(t.msg)})).catch((function(t){console.log(t)}))},handleAdd:function(){this.$router.push({path:"addAsk",query:{studentId:this.studentId,optPhone:this.optPhone,roleId:this.roleId}})},askDetail:function(t,e){this.$router.push({path:"askDetail",query:{studentId:t,id:e,optPhone:this.optPhone,roleId:this.roleId,token:this.token}})}}},v=g,I=(a("4cc5"),a("2877")),k=Object(I["a"])(v,s,n,!1,null,"429799d9",null);e["default"]=k.exports},cdb6:function(t,e,a){},cf5b:function(t,e,a){t.exports=a.p+"img/status2.444c4dee.png"}}]);