(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec92f790"],{3106:function(t,s,i){"use strict";i("31b8")},"31b8":function(t,s,i){},ad95:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAlBJREFUWEfFlzFoFEEUhv83e6KFCRZCupDsHXaSRgRNYdTC2wOLFJ5gaakQvEWRs4oQjGjYBUFLe2MhKO6ehRqLKGglVoHLXkiXThIFxbt9sit7XC6z2Z3lvN123/v/b97MvJkh5PxRzv5IDTDxwj6iHezMsNDOgPkkQGMgjIUDYGwBvAWiz+R3PnR+aysbs7XvaQaXCmCyYVXBWCRATyPKgAdCvVU2l5Pi9wdYvqRNjpwKjG8lCcn+M/CwtfOpjurzTlx+LEDRsc8x8dssxv05xHR+vVJ7J9OSApQaVtVnPBuEeaQhCJebkinZAzDzfr6w+Wv0zyDNI63xQ9sHVs7Ot3u19wDojuWAYKQB8AwzzNddi9PEg+F6FbMSC6C71jUAj1OJAVAG+Cd83TPMJ5FHtwIl59GoL9rfwBj/rwCETeEXjjcrc9uBTxdgwl26ICAaac2DuIwVgA+/vGHcfLMLQHftewDXhwEA0KJn1O70AVirAE4PBwAfPcOc7q9AE+DicABo3TNqpd0ADXsHzIeHAkD0wyvXRgYGcOzV0tF2QdwFEGzj5E8K4NrKUwBglSEetIwbLwPXomNPM/FtABf3p5BNgau+CLsmxE+ZtQBkLeyMjn0VxHMApmJApItQeRv2if8EsOAZ5v0Q4rV1AgJf5ACSbZilEcWM7iszLZDgWTCuyGKkjShLK05ebZKIuFYclk3xMMoEEHcYRWIqx7EyQNJxHAjmfiEJIHK9kkVlzfVS2p3bPK/lvQssv4dJD0WuTzPl7aaQkOptqKCnHPoXaBYiMPnj4gkAAAAASUVORK5CYII="},cd82:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"guardsysVisitPage"},[s("div",{staticClass:"content"},[s("List",[s("ListItem",[s("span",[t._v("访问时间")]),s("p",[t._v(t._s(t.visitTime))])]),s("ListItem",[s("span",[t._v("被访人")]),s("p",[t._v(t._s(t.teacherName))])]),s("ListItem",[s("span",[t._v("来访目的")]),s("p",[t._v(t._s(t.visitReason))])]),s("ListItem",[s("span",[t._v("访问地址")]),s("p",[t._v(t._s(t.visitAddress))])])],1)],1),s("div",{staticClass:"cardStep"},[s("h3",[t._v("来访人员")]),s("Timeline",t._l(t.spList,(function(i,e){return s("TimelineItem",{key:e,scopedSlots:t._u([{key:"dot",fn:function(){return[s("span",{staticClass:"name"},[t._v(t._s(""==i.visitName||null==i.visitName?"访":i.visitName.charAt(0)))])]},proxy:!0}],null,!0)},[s("div",[s("p",{staticClass:"doThing"},[s("span",[t._v(t._s(i.visitName))]),s("Button",{staticClass:"time",attrs:{type:"success",disabled:i.isDisable},on:{click:function(s){return t.hasVisit(i.eventId,i.id)}}},[t._v(t._s(i.btnTips))])],1),s("p",{staticClass:"phone"},[s("span",[t._v(t._s(i.phone))])]),s("Tag",{staticClass:"tag"},[t._v("预约到访")])],1)])})),1)],1),s("Loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]})],1)},a=[],n=(i("a9e3"),i("b1d0")),o=i("1271"),d=i("3b2d"),c=i("ad95"),r=i.n(c),l={name:"index",data:function(){return{title:"门卫管理",isStudent:!1,icon3:r.a,eventId:"",visitTime:"",teacherName:"",visitReason:"",visitAddress:"",spList:[],id:"",isLoading:!1,codeDisabled:!1}},created:function(){document.title=this.title,this.eventId=d["a"].getQueryVariable("eventId"),this.id=d["a"].getQueryVariable("id")},activated:function(){document.title=this.title},mounted:function(){this.getDetailFun()},methods:{getDetailFun:function(){var t=this;this.isLoading=!0,Object(n["a"])({method:"get",url:o["a"].recordUrl.guardianCheckVisitDetail+"?eventId="+Number(this.eventId),data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(s){if(console.log("res",s),t.isLoading=!1,200==s.code){for(var i=0;i<s.data.visitorRecordList.length;i++)0==s.data.visitorRecordList[i].accessStatus?(s.data.visitorRecordList[i].btnTips="未到访",s.data.visitorRecordList[i].isDisable=!1):(s.data.visitorRecordList[i].btnTips="已登记",s.data.visitorRecordList[i].isDisable=!0);t.spList=s.data.visitorRecordList,console.log("返回数据",t.spList),t.visitTime=s.data.eventVisitRecord.startTime,t.teacherName=s.data.eventVisitRecord.teacherName,t.visitReason=s.data.eventVisitRecord.visitReason,t.visitAddress=s.data.eventVisitRecord.visitDestination}else t.$Message.info(s.msg)})).catch((function(t){console.log(t)}))},hasVisit:function(t,s){var i=this;this.codeDisabled=!0,setTimeout((function(){i.codeDisabled=!1}),2e3),this.isLoading=!0;var e={eventId:t,visitorId:s,checkStatus:1,guardianId:Number(this.id)};console.log("params",e),Object(n["a"])({method:"post",url:o["a"].recordUrl.guardianCheck,data:e,headers:{"Content-Type":"application/json"}}).then((function(t){if(i.isLoading=!1,console.log("res",t),200==t.code){console.log("res",t),i.$Message.info(t.msg);for(var e=0;i.spList.length;e++)console.log("this.spList",i.spList[e],s),i.spList[e].id==s&&(i.spList[e].btnTips="已登记",i.$set(i.spList,e,i.spList[e]))}else i.$Message.info(t.msg)})).catch((function(t){console.log(t)}))}}},v=l,u=(i("3106"),i("2877")),p=Object(u["a"])(v,e,a,!1,null,"5cfc4bfc",null);s["default"]=p.exports}}]);