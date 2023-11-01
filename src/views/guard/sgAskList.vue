<template>
  <div class="askListPage">
    <DatePicker class="time" type="date" :value="dataValue" disabled></DatePicker>
    <Table class="table" border :columns="tableList" :data="dataList">
        <template slot-scope="{ row }" slot="gradeAndClassName">
            <span style="display:block;">{{row.gradeName}}</span>
            <span style="display:block;">({{row.className}})</span>
        </template>
        <template slot-scope="{ row }" slot="action">
            <span v-if="row.guardianCheckStatus==0">未出校</span>
            <span v-if="row.guardianCheckStatus==1">{{row.checkoutTime}}</span>
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
      title:'宿舍管理',
      tableList: [
        {
            title: '学生姓名',
            key: 'studentName',
            align:'center'
        },
        {
            title: '班级',
            // key: 'gradeAndClassName',
            align:'center',
            slot: 'gradeAndClassName',
        },
        {
            title: '请假时间',
            key: 'leaveTimePeriod',
            align:'center',
        },
        {
            title: '请假事由',
            key: 'eventReason',
            align:'center'
        },
        {
            title: '出校时间',
            align:'center',
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
    }
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
