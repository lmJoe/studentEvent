(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f96b268"],{"0048":function(t,e,a){},"083a":function(t,e,a){"use strict";var i=a("0d51"),o=TypeError;t.exports=function(t,e){if(!delete t[e])throw o("Cannot delete property "+i(e)+" of "+i(t))}},1741:function(t,e,a){t.exports=a.p+"img/status1.e0513603.png"},a434:function(t,e,a){"use strict";var i=a("23e7"),o=a("7b0b"),r=a("23cb"),s=a("5926"),l=a("07fa"),n=a("3a34"),d=a("3511"),m=a("65f0"),c=a("8418"),u=a("083a"),f=a("1dde"),h=f("splice"),p=Math.max,b=Math.min;i({target:"Array",proto:!0,forced:!h},{splice:function(t,e){var a,i,f,h,v,T,V=o(this),g=l(V),y=r(t,g),x=arguments.length;for(0===x?a=i=0:1===x?(a=0,i=g-y):(a=x-2,i=b(p(s(e),0),g-y)),d(g+a-i),f=m(V,i),h=0;h<i;h++)v=y+h,v in V&&c(f,h,V[v]);if(f.length=i,a<i){for(h=y;h<g-i;h++)v=h+i,T=h+a,v in V?V[T]=V[v]:u(V,T);for(h=g;h>g-i+a;h--)u(V,h-1)}else if(a>i)for(h=g-i;h>y;h--)v=h+i-1,T=h+a-1,v in V?V[T]=V[v]:u(V,T);for(h=0;h<a;h++)V[h+y]=arguments[h+2];return n(V,g-i+a),f}})},b0c0:function(t,e,a){"use strict";var i=a("83ab"),o=a("5e77").EXISTS,r=a("e330"),s=a("edd0"),l=Function.prototype,n=r(l.toString),d=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,m=r(d.exec),c="name";i&&!o&&s(l,c,{configurable:!0,get:function(){try{return m(d,n(this))[1]}catch(t){return""}}})},e56a:function(t,e,a){"use strict";a.r(e);a("b0c0");var i,o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"submitPage"},[e("Form",{ref:"formValidate",attrs:{model:t.formValidate,"label-width":80}},[e("FormItem",{attrs:{label:"请假类型"}},[e("Select",{attrs:{placeholder:"请选择请假类型"},model:{value:t.formValidate.status,callback:function(e){t.$set(t.formValidate,"status",e)},expression:"formValidate.status"}},[e("Option",{attrs:{value:"1"}},[t._v("事假")]),e("Option",{attrs:{value:"2"}},[t._v("病假")]),e("Option",{attrs:{value:"3"}},[t._v("其他")])],1)],1),e("FormItem",{attrs:{label:"开始时间"}},[e("DatePicker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"请选择开始时间"},on:{"on-ok":function(e){return t.choseStartTime()},"on-clear":function(e){return t.clearStartTime()}},model:{value:t.formValidate.startTime,callback:function(e){t.$set(t.formValidate,"startTime",e)},expression:"formValidate.startTime"}})],1),e("FormItem",{attrs:{label:"结束时间"}},[e("DatePicker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"请选择结束时间"},on:{"on-ok":function(e){return t.choseEndTime()},"on-clear":function(e){return t.clearEndTime()}},model:{value:t.formValidate.endTime,callback:function(e){t.$set(t.formValidate,"endTime",e)},expression:"formValidate.endTime"}})],1),e("FormItem",{attrs:{label:"请假时长"}},[e("Input",{attrs:{readonly:""},model:{value:t.formValidate.totalTime,callback:function(e){t.$set(t.formValidate,"totalTime",e)},expression:"formValidate.totalTime"}})],1),e("FormItem",{attrs:{label:"体温情况"}},[e("RadioGroup",{model:{value:t.formValidate.bodyTempStat,callback:function(e){t.$set(t.formValidate,"bodyTempStat",e)},expression:"formValidate.bodyTempStat"}},[e("Radio",{attrs:{label:"体温正常",border:""}}),e("Radio",{attrs:{label:"体温异常",border:""}})],1)],1),e("FormItem",{attrs:{label:"体温"}},[e("Input",{attrs:{placeholder:"请输入体温度数"},model:{value:t.formValidate.bodyTemp,callback:function(e){t.$set(t.formValidate,"bodyTemp",e)},expression:"formValidate.bodyTemp"}})],1),e("FormItem",{attrs:{label:"请假事由","label-position":"top"}},[e("Input",{staticClass:"textarea",attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入请假事由，若请病假，请填写病情，如发烧（体温度数），是否咳嗽，是否咽喉痛等。"},model:{value:t.formValidate.desc,callback:function(e){t.$set(t.formValidate,"desc",e)},expression:"formValidate.desc"}})],1),e("FormItem",{staticClass:"uploadBox"},[t._l(t.formValidate.uploadList,(function(a,i){return e("div",{key:i,staticClass:"demo-upload-list"},["finished"===a.status?[e("img",{attrs:{src:a.url,fit:"cover",width:"100%",height:"100%",alt:""}}),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-eye-outline"},on:{click:function(e){return t.handleView(a.name)}}}),e("Icon",{attrs:{type:"ios-trash-outline"},on:{click:function(e){return t.handleRemove(a)}}})],1)]:[a.showProgress?e("Progress",{attrs:{percent:a.percentage,"hide-info":""}}):t._e()]],2)})),e("Upload",{ref:"upload",attrs:{"show-upload-list":!1,"default-file-list":t.formValidate.defaultList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:"",type:"drag",action:"https://xskwx.zjhuaxuntong.com/jxaxService/eventrec/uploadEventPic"}},[e("div",{staticClass:"upload"},[e("span",[t._v("图片")]),e("Icon",{attrs:{type:"ios-add-circle-outline",size:"20"}})],1)]),e("ImagePreview",{attrs:{"preview-list":["http://39.171.241.227:18551/images/event/"+t.formValidate.imgName]},model:{value:t.formValidate.visible,callback:function(e){t.$set(t.formValidate,"visible",e)},expression:"formValidate.visible"}})],2),e("FormItem",{staticClass:"lastFrom"},[e("Button",{staticClass:"submitBtn",attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formValidate")}}},[t._v("提交")])],1)],1)],1)},r=[],s=a("ade3"),l=(a("d3b7"),a("159b"),a("14d9"),a("a434"),a("b1d0")),n=a("1271"),d=a("3b2d"),m=(a("1741"),{name:"index",data:function(){return{title:"学生请假",formValidate:{status:"",startTime:"",endTime:"",totalTime:"",bodyTempStat:"",bodyTemp:"",desc:"",defaultList:[],imgName:"",visible:!1,uploadList:[]},uploadListArr:[],noStartChose:{disabledDate:function(t){return t&&t.valueOf()<Date.now()-864e5}},noEndChose:{disabledDate:function(t){return t&&t.valueOf()<Date.now()-864e5}},studentId:"",optPhone:""}},created:function(){document.title=this.title,this.studentId=this.$route.query.studentId,this.optPhone=this.$route.query.optPhone},activated:function(){document.title=this.title},mounted:function(){var t=this;this.formValidate.uploadList=this.$refs.upload.fileList,console.log("获取图片地址11",this.$refs.upload.fileList),this.$refs.upload.fileList.forEach((function(e){t.uploadListArr.push(e.url)})),console.log("获取图片地址---",this.uploadListArr)},methods:(i={addAskFun:function(){var t=this,e=Object(s["a"])({eventEndTime:d["a"].changeTimeFormat(this.formValidate.endTime),eventPicPathArr:this.uploadListArr,eventReason:this.formValidate.desc,eventStartTime:d["a"].changeTimeFormat(this.formValidate.startTime),eventTotalDay:this.formValidate.totalTime,eventType:this.formValidate.status,optPhone:this.optPhone,studentId:this.studentId,temperature:this.formValidate.bodyTemp,temperatureStatus:"体温正常"==this.formValidate.bodyTempStat?1:2},"optPhone",this.optPhone);console.log("params",e),Object(l["a"])({method:"post",url:n["a"].recordUrl.addAsk,data:e,headers:{"Content-Type":"application/json"}}).then((function(e){console.log("res",e),200==e.code?(console.log("res",e),setTimeout((function(){t.$router.go(-1)}),1500)):t.$Message.info(e.msg)})).catch((function(t){console.log(t)}))},choseStartTime:function(){if(this.formValidate.endTime){var t=this.formValidate.startTime.getTime(),e=this.formValidate.endTime.getTime();if(t>e)this.$Message.info("结束时间不能小于开始时间"),this.formValidate.startTime="";else{var a=e-t;this.formValidate.totalTime=d["a"].TimeInterval(a)}}},choseEndTime:function(){if(this.formValidate.startTime){var t=this.formValidate.startTime.getTime(),e=this.formValidate.endTime.getTime();if(t>e)this.$Message.info("结束时间不能小于开始时间"),this.formValidate.endTime="";else{var a=e-t;this.formValidate.totalTime=d["a"].TimeInterval(a)}}},clearStartTime:function(){this.formValidate.startTime=""}},Object(s["a"])(i,"clearStartTime",(function(){this.formValidate.endTime=""})),Object(s["a"])(i,"handleSubmit",(function(t){var e=this;this.$refs[t].validate((function(t){t?e.addAskFun():e.$Message.error("Fail!")}))})),Object(s["a"])(i,"handleReset",(function(t){this.$refs[t].resetFields()})),Object(s["a"])(i,"handleView",(function(t){console.log("打开图片地址",t),this.formValidate.imgName=t,this.formValidate.visible=!0})),Object(s["a"])(i,"handleRemove",(function(t){console.log("删除",t),console.log("删除11",this.uploadListArr);var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1),this.uploadListArr.splice(e.indexOf(t),1)})),Object(s["a"])(i,"handleSuccess",(function(t,e){console.log("res",e),e.name=t.data,e.url=t.data,console.log("图片地址数组",this.formValidate.uploadList),this.uploadListArr.push(e.url)})),Object(s["a"])(i,"handleFormatError",(function(t){this.$Message.error("文件"+t.name+" 不正确，请选择JPG还是PNG.")})),Object(s["a"])(i,"handleMaxSize",(function(t){this.$Message.error("文件"+t.name+" 太大不能超过2M.")})),Object(s["a"])(i,"handleBeforeUpload",(function(){var t=this.formValidate.uploadList.length<5;return t||this.$Notice.warning({title:"Up to five pictures can be uploaded."}),t})),i)}),c=m,u=(a("e56d"),a("2877")),f=Object(u["a"])(c,o,r,!1,null,"78d01f42",null);e["default"]=f.exports},e56d:function(t,e,a){"use strict";a("0048")}}]);