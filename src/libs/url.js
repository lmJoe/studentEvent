// 环境的切换
// process.env.NODE_ENV环境
let baseURL;

var hosturl = window.location.host;
if (hosturl == "xskwx.zjhuaxuntong.com") {
    var apiUrl = "https://xskwx.zjhuaxuntong.com";
} else {
    var apiUrl = "https://xskwx.zjhuaxuntong.com";
}
export var URL = {
    recordUrl: {
        /**
         * api
         */
        addAsk: apiUrl +
            '/jxaxService/eventrec/add', //请假申请
        getlist: apiUrl +
            '/jxaxService/eventrec/list', //学生端请假列表
        listEventByTeacherPhone: apiUrl +
            '/jxaxService/eventrec/listEventByTeacherPhone', //老师端请假列表
        getDetail: apiUrl +
            '/jxaxService/eventrec/findDetail', //详情
        eventRollback: apiUrl +
            '/jxaxService/eventrec/eventRollback', //撤销
        approve: apiUrl +
            '/jxaxService/eventrec/approve', //同意/拒绝
        visitorlist: apiUrl +
            '/jxaxService/visitrec/list', //访客列表
        visitoradd: apiUrl +
            '/jxaxService/visitrec/add', //访客预约
        findDetail: apiUrl +
            '/jxaxService/visitrec/findDetail', //访客审批详情
        visiteventRollback: apiUrl +
            '/jxaxService/visitrec/eventRollback', //访客详情撤回
        visitApprove: apiUrl +
            '/jxaxService/visitrec/visitApprove', //访客详情同意
        buildInviteRec: apiUrl +
            '/jxaxService/teacher/buildInviteRec', //邀请访客
        findShareDetail: apiUrl +
            '/jxaxService/teacher/findShareDetail', //二维码界面
        getWxConfig: apiUrl +
            '/jxaxService/wx/getWxConfig', //分享功能获取配置参数
        listGuardianVisitor: apiUrl +
            '/jxaxService/visitrec/listGuardianVisitor', //门卫访客列表
        login: apiUrl +
            '/jxaxService/schoolServiceUser/login', //登录
        guardianCheckVisitDetail: apiUrl +
            '/jxaxService/visitrec/guardianCheckVisitDetail', //访问列表详情
        guardianCheck: apiUrl +
            '/jxaxService/visitrec/guardianCheck', //访问列表详情登记按钮
        listGuardianCheckList: apiUrl +
            '/jxaxService/eventrec/listGuardianCheckList', //请假明细列表

        guardianCheckout: apiUrl +
            '/jxaxService/eventrec/guardianCheckout', //请假明细列表登记

    }
};