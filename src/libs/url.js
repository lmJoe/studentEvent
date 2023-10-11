// 环境的切换
// process.env.NODE_ENV环境
// let baseURL;

// var hosturl = window.location.host;
// if (hosturl == "xskwx.zjhuaxuntong.com") {
//     var apiUrl = "https://xskwx.zjhuaxuntong.com";
// } else {
//     var apiUrl = "https://xskwx.zjhuaxuntong.com";
// }
export var URL = {
    recordUrl: {
        addAsk: '/eventrec/add', //请假申请
        getlist: '/eventrec/list', //学生端请假列表
        listEventByTeacherPhone: '/eventrec/listEventByTeacherPhone', //老师端请假列表
        getDetail: '/eventrec/findDetail', //详情
        eventRollback: '/eventrec/eventRollback', //撤销
        approve: '/eventrec/approve', //同意/拒绝
        visitorlist: '/visitrec/listVisitRecByTeacherPhone', //访客列表角色列表为2
        visitoradd: '/visitrec/add', //访客预约
        findDetail: '/visitrec/findDetail', //访客审批详情
        visiteventRollback: '/visitrec/eventRollback', //访客详情撤回
        visitApprove: '/visitrec/visitApprove', //访客详情同意
        buildInviteRec: '/teacher/buildInviteRec', //邀请访客
        findShareDetail: '/teacher/findShareDetail', //二维码界面
        getWxConfig: '/wx/getWxConfig', //分享功能获取配置参数
        listGuardianVisitor: '/visitrec/listGuardianVisitor', //门卫访客列表
        login: '/schoolServiceUser/login', //登录
        guardianCheckVisitDetail: '/visitrec/guardianCheckVisitDetail', //访问列表详情
        guardianCheck: '/visitrec/guardianCheck', //访问列表详情登记按钮
        listGuardianCheckList: '/eventrec/listGuardianCheckList', //请假明细列表
        guardianCheckout: '/eventrec/guardianCheckout', //请假明细列表登记
        visitrecList: '/visitrec/list', //访客端列表角色为1时

    }
};