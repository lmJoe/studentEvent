<template>
  <div class="askListPage">
    <div class="nowDate">{{nowDate}}</div>
    <Table border :columns="columns" :data="dataList" size="small">
      <template slot-scope="{ row, index }" slot="checkoutTime">
          <span v-if="row.checkoutTime!==''">{{row.checkoutTime}}</span>
          <Button type="primary" size="small"  v-if="roleType==1&&row.checkoutTime==''" @click="checkTime(index,row.eventId)">点击登记</Button>
        </template>
    </Table>
    <div class="nodata" v-if="isNodata">
      <img :src="nodata" alt="">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import nodata from '@/assets/imgs/no-data.png';
export default {
  name: 'index',
  data () {
    return {
      title:'学生请假明细',
      schoolId:'',
      isNodata:false,
      nodata:nodata,
      dataList:[],
      nowDate:'',
      roleType:'',
      id:'',
      columns:[{
        title: '学生姓名',
        key: 'studentName',
        align: 'center',
        fixed: 'left',
        width:80,
      },{
        title: '班级',
        key: 'className',
        align: 'center',
        width:100,
      },{
        title: '请假时间',
        key: 'leaveTimePeriod',
        align: 'center',
        width:150,
      },{
        title: '请假事由',
        key: 'eventReason',
        align: 'center',
        width:100,
      },{
        title: '登记时间',
        slot: 'checkoutTime',
        key: 'checkoutTime',
        align: 'center',
        fixed: 'right',
        width:80,
      }]
    }
  },
  created(){
    document.title = this.title;
    this.schoolId = common.getQueryVariable("schoolId");//学校id
    this.roleType = common.getQueryVariable("roleType");//1-门卫 2-宿管
    this.id = common.getQueryVariable("id");//1-门卫 2-宿管
    this.nowDate = common.getDate(0);
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.getAskList();
  },
  methods: {
    getAskList(){
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.listGuardianCheckList+'?schoolId='+this.schoolId,
        data: {},
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then((res) => {
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
    toDetailVisit(){
      this.$router.push({
        path:'todayVisit',
        query:{
          schoolId:this.schoolId
        }
      })
    },
    checkTime (index,id) {
      console.log("index",index,id)
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.guardianCheckout+'?schoolId='+this.schoolId,
        data: {
          eventId:id,
          optPhone:'',
          checkoutStatus:1,
          guardianId:Number(this.id),
        },
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        if(res.code==200){
          console.log("res",res)
          this.$Message.info(res.msg);
          this.getAskList()
          // for(var i=0;this.dataList.length;i++){
          //   console.log("this.dataList",this.dataList[i],index)
          //   if(this.dataList[i].id==index){
          //     this.dataList[index].checkoutTime = common.getHmsecond(common.getNowFormatDate());
          //     this.$set(this.dataList, i, this.dataList[index])
          //   }
          // }
        }else{
          this.$Message.info(res.msg);
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
.askListPage{
  background:#fff;
  .nowDate{
    padding:10px;
    font-size:15px;
    color:#333;
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
}
/deep/.ivu-table-header thead tr th{
  font-size:13px;
  text-align: center;
}
/deep/.ivu-table-cell{
  padding:0;
}
/deep/.ivu-btn-primary{
  font-size:12px;
}
</style>
