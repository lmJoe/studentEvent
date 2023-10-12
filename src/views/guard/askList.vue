<template>
  <div class="askListPage">
    <DatePicker class="time" type="date" :value="dataValue" disabled></DatePicker>
    <Table class="table" border :columns="tableList" :data="dataList">
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" v-if="row.checkoutTime==''" @click="guardianCheckout(row,index)">点击登记</Button>
            <span v-if="row.checkoutTime">{{row.checkoutTime}}</span>
        </template>
    </Table>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
import icon1 from '@/assets/imgs/icon1.png'
import icon2 from '@/assets/imgs/icon2.png'
export default {
  name: 'index',
  data () {
    return {
      title:'门卫管理',
      tableList: [
        {
            title: '学生姓名',
            key: 'studentName',
            width: 80,
            fixed: 'left',
            align:'center'
        },
        {
            title: '班级',
            key: 'gradeAndClassName',
            width: 100,
            align:'center'
        },
        {
            title: '请假时间',
            key: 'leaveTimePeriod',
            width: 180,
            align:'center'
        },
        {
            title: '请假事由',
            key: 'eventReason',
            width: 180,
            align:'center'
        },
        {
            title: '登记时间',
            width: 80,
            align:'center',
            fixed: 'right',
            slot: 'action',
        }
      ],
      dataList: [],
      dataValue:'',
      phone:'',
      schoolId:'',
      checkout:'',
      id:'',
      isLoading:false,
    }
  },
  created(){
    document.title = this.title;
    this.dataValue = common.getDate();
    this.schoolId = common.getQueryVariable("schoolId");//学校id
    this.phone = common.getQueryVariable("phone");//手机
    this.id = common.getQueryVariable("id");//手机
    
    // this.optPhone = this.$route.query.optPhone;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.listGuardianCheckList();
  },
  methods: {
    
    listGuardianCheckList(){
      this.isLoading = true;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.listGuardianCheckList+'?schoolId='+this.schoolId+'&phone='+this.phone,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        console.log("res",res)
        this.isLoading = false;
        if(res.code==200){
          this.dataList = res.data;
        }else{
          this.$Message.info(res.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    guardianCheckout(params,itemIndex){
    this.isLoading = true;
     var params = {
        eventId:params.eventId,
        checkoutStatus:1,
        optPhone:Number(this.phone),
        guardianId:parseInt(this.id),
      }
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.guardianCheckout,
        data:params,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then((res) => {
        this.isLoading = false;
        if(res.code==200){
          this.listGuardianCheckList();
          this.$Message.info(res.msg);
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
  .time{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:10;
  }
  .table{
    margin-top:30px;
    width:100%;
  }
}
/deep/.ivu-input[disabled], fieldset[disabled] .ivu-input{
  color:#222;
}
/deep/.ivu-table-cell{
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  font-size:13px;
}
/deep/.ivu-btn-small{
  font-size:12px;
}
</style>
