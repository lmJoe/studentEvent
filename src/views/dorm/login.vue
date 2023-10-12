<template>
    <div class="loginContent">
      <div class="loginCont">
        <h3>宿管&门卫管理平台</h3>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" class="">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入账号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" class="submitBtn" @click="login('formInline')">登入</Button>
            </FormItem>
        </Form>
      </div>
    </div>
</template>
<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import common from '@/libs/units.js'
export default {
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login(){
          var params = {
            phone: this.formInline.user,
            password:this.formInline.password,
          }
          console.log("params",params);
          http({
            //这里是你自己的请求方式、url和data参数
            method: 'post',
            url:URL.recordUrl.login,
            data:params,
            //假设后台需要的是表单数据这里你就可以更改
            headers: {
              "Content-Type":"application/json",
            }
          }).then((res) => {
            console.log("res",res)
            if(res.code==200){
              this.$Message.info(res.msg);
              setTimeout(() => {
                this.$router.push({
                  path:'guardsys',
                  query:{
                    roleType:res.data.roleType,
                    schoolId:res.data.schoolId,
                    id:res.data.id,
                    phone:res.data.phone
                  }
                })
              }, 1500);
            }else{
              this.$Message.info(res.msg);
            }
          }).catch(function (err) {
            console.log(err);
          });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
.loginContent{
  background:#fff;
  width:100%;
  height:100%;
  .loginCont{
    width:80%;
    height:300px;
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  
  h3{
    text-align:center;
    margin-bottom:20px;
    font-size:25px;
    font-weight:400;
  }
  .submitBtn{
    background: rgba(255,135,1);
  }
}
/deep/.ivu-form-item-content{

}
/deep/.ivu-input{
  height:50px;
  font-size:16px;
}
/deep/.ivu-input-group-prepend{
  font-size:x-large;
  width:50px;
}
/deep/.ivu-btn-primary{
  width:100%;
  height:50px;
  font-size:18px;
  border-color:rgba(255,135,1);
}
/deep/.ivu-form-item-error .ivu-input-group-append, .ivu-form-item-error .ivu-input-group-prepend{
   border: 0.0625rem solid rgba(255,135,1);
}
/deep/.ivu-form-item-error .ivu-input:hover{
  border-color:rgba(255,135,1);
}
/deep/.ivu-form-item-error .ivu-input{
  border-color:rgba(255,135,1);
}
/deep/.ivu-form-item-error .ivu-input-group-prepend{
  border:1px solid rgba(255,135,1);
}
/deep/.ivu-input:hover{
  border-color:rgba(255,135,1);
}
</style>
