//引入安装的axios插件
import axios from 'axios'
import App from './../App'
import vue from 'vue'
import common from '@/libs/units.js'

//请求Mock地址封装
axios.defaults.timeout = 100000;
// axios.defaults.baseURL = '/jxaxService'; //开发环境

var hosturl = window.location.host;
var apiUrl;
if (hosturl == "wxxsk.zjhuaxuntong.com") {
    apiUrl = "https://wxxsk.zjhuaxuntong.com/jxaxService"; //正式环境地址
} else {
    apiUrl = "https://xskwx.zjhuaxuntong.com/jxaxService";
}
axios.defaults.baseURL = apiUrl; //正式环境
//请求方法封装
const http = options => {
    var that = this;
    return new Promise((resolve, reject) => {
        const defaultOptions = {};
        const newOptions = {
            ...defaultOptions,
            ...options
        };
        // var token = common.getCookie("accessToken");
        // console.log("token------", token);
        // if (token == null) {
        //     // window.location.href = 'https://pxtadmin.com/'
        // }
        // console.log("token-----", token);
        // token = 'bearer' + ' ' + token;
        // var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1PZUVVR0NfZlFqa0U3b0dZZHhrX0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MTU4ODEzOTIsImV4cCI6MTYxNjQ4NjE5MiwiaXNzIjoiaHR0cDovLzEwLjAuMC4yNDk6NTAwMCIsImF1ZCI6ImdhdGV3YXkiLCJjbGllbnRfaWQiOiJnYXRld2F5X2NsaWVudCIsInN1YiI6IjEzMjg1NzE1NTE3IiwiYXV0aF90aW1lIjoxNjE1ODgxMzkyLCJpZHAiOiJsb2NhbCIsIlVuaXF1ZUtleSI6Ijg2NDFlMDViLTRkODQtNDFhMy04ZDdhLWY4ZWY1YzFkZmJmOCIsIlVzZXJOYW1lIjoiMTMyODU3MTU1MTciLCJVc2VySWQiOiI1NiIsInNjb3BlIjpbImdhdGV3YXkiXSwiYW1yIjpbImN1c3RvbSJdfQ.f49klog4wUR_jiIMYP1C82Hhbs0u-mc8eIMZUtne3B-GIFXnuEDMreHcIMD3APj07QhFaXl3GDHP9GCOJ8WmLgwNwhKF1n8a1nvSUmK_j_zbKWjDeBF12Zid4c1HXbSQ6dc_qHpbxbTDNUsZABuz5pi8jRBJprjJHrvnzkLbur_iZRi6oFmktJD7x9wOTr6kVuOnqMh7otdPXgEtCblBbhceP5PhCA33O7ecPp2XxTInMN-Pe8KWkGqgO2l3v7tXuJdxok-BB7WhcJA4RUCBi41QMX3o1MjkDY8gQGPDKvZ2S5S3pOIFFItUgmV9CyhCuKz2ICHWVTw5uFMWQLzxDw';
        //headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
        newOptions.headers = {
            // "authorization": token,
            ...newOptions.headers,
        };
        //这里可以在调用的时候看到你的method、url、data、headers等参数
        axios({
            method: newOptions.method,
            url: newOptions.url,
            data: newOptions.data,
            headers: newOptions.headers,
            dataType: 'JSONP',
        }).then(res => {
            if (res.status == 200) {
                //这里我们只需要获取返回的data中的数据即可
                resolve(res.data);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
};
export default http