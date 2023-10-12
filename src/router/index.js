import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/index"
    }, {
        path: "/index",
        name: "index",
        component: resolve => (require(['@/views/visitor/index'], resolve))
    },
    {
        path: "/addAsk",
        name: 'addAsk',
        component: resolve => (require(['@/views/visitor/addAsk'], resolve))

    },
    {
        path: "/askDetail",
        name: 'askDetail',
        component: resolve => (require(['@/views/visitor/askDetail'], resolve))

    },
    {
        path: "/guestIndex",
        name: 'guestindex',
        component: resolve => (require(['@/views/guestSide/guestIndex'], resolve))

    }, {
        path: "/guestadd",
        name: 'guestadd',
        component: resolve => (require(['@/views/guestSide/guestadd'], resolve))

    }, {
        path: "/visitordetail",
        name: 'visitordetail',
        component: resolve => (require(['@/views/guestSide/visitordetail'], resolve))

    }, {
        path: "/invitedper",
        name: 'invitedper',
        component: resolve => (require(['@/views/invite/invitedper'], resolve))
    }, {
        path: "/invitedCode",
        name: 'invitedCode',
        component: resolve => (require(['@/views/invite/invitedCode'], resolve))
    }, {
        path: "/login",
        name: 'login',
        component: resolve => (require(['@/views/dorm/login'], resolve))

    }, {
        path: "/guardsys",
        name: 'guardsys',
        component: resolve => (require(['@/views/guard/guardsys'], resolve))

    }, {
        path: "/todayVisit",
        name: 'todayVisit',
        component: resolve => (require(['@/views/guard/todayVisit'], resolve))

    }, {
        path: "/todayvisitdetail",
        name: 'todayvisitdetail',
        component: resolve => (require(['@/views/guard/todayvisitdetail'], resolve))

    }, {
        path: "/askList",
        name: 'askList',
        component: resolve => (require(['@/views/guard/askList'], resolve))

    }


    // {
    //     // 登录之后的选择页
    //     path: "/startNext",
    //     name: 'startNext',
    //     component: () =>
    //         import ("@/views/startNext.vue"),
    //     meta: {
    //         needLogin: true // 需要登录
    //     },

    // },

];

const  originalPush  = VueRouter.prototype.push;
VueRouter.prototype.push  =   function  push(location)  {  
    return  originalPush.call(this,  location).catch(err  =>  err);
};

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;