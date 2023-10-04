import axios from 'axios'
const common = {
    getQueryVariable(variable) {
        const reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)", "i");
        const urlObj = window.location;
        var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getQueryVariable1(variable) {
        const reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)", "i");
        const urlObj = window.location;
        var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    //给url添加参数
    addOrgToUrl(key, val) {
        var url = window.location.href
        if (url.indexOf(key) > -1) {
            var re = eval('/(' + key + '=)([^&]*)/gi');
            url = url.replace(re, key + '=' + val);
        } else {
            var paraStr = key + '=' + val;
            var idx = url.indexOf('?');
            if (idx < 0) {
                url += '?';
            } else if (idx >= 0 && idx != url.length - 1) {
                url += '&';
            }
            url = url + paraStr;
        }
        return url;
    },
    //指定日期获取一周的日期时间
    formatDate(num) {
        var now = new Date();
        var nowTime = now.getTime();
        var oneDayTime = 24 * 60 * 60 * 1000;
        var ShowTime = nowTime + num * oneDayTime;
        var myDate = new Date(ShowTime);
        var y = myDate.getFullYear(); //年
        var m = myDate.getMonth() + 1; //月
        var d = myDate.getDate(); //日
        return [y, m, d].map(padStartConvert).join('-')

        function padStartConvert(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    },
    //将秒换算成00：00：00
    time_conversion($times) {
        var $result = '00:00';
        if ($times > 0) {
            var $hour = Math.floor($times / 3600);
            var $minute = Math.floor($times % 3600 / 60);
            var $second = Math.floor(($times - 60 * $minute) % 60);
            if ($hour < 10) {
                $hour = '0' + $hour;
            }
            if ($minute < 10) {
                $minute = "0" + $minute;
            }
            if ($second < 10) {
                $second = "0" + $second;
            }
            return $result = $hour + ':' + $minute + ':' + $second;
        } else {
            return $result = "00" + ':' + "00" + ':' + "00";
        }
    },
    //2020-01-01格式
    getDate(dates) { //dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
        var dd = new Date();
        var n = dates || 0;
        dd.setDate(dd.getDate() + n);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        var day = y + "-" + m + "-" + d;
        return day;
    },
    //20200101格式
    getDate1(dates) { //dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
        var dd = new Date();
        var n = dates || 0;
        dd.setDate(dd.getDate() + n);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        var day = y + "" + m + "" + d;
        return day;
    },
    //获取当前cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    TimeInterval(timestamp) {
        //时间戳转化为天时分秒
        // 总秒数
        var second = Math.floor(timestamp / 1000);
        // 天数
        var day = Math.floor(second / 3600 / 24);
        // 小时
        var hr = Math.floor(second / 3600 % 24);
        // 分钟
        var min = Math.floor(second / 60 % 60);
        // 秒
        // var sec = Math.floor(second % 60);
        // return (day ? day + "天" : '') + (hr ? hr + "小时" : '') + (min ? min + "分钟" : '') + sec + "秒";
        return (day ? day + "天" : '') + (hr ? hr + "小时" : '') + (min ? min + "分钟" : '');

    },
    //yy-mm-dd hh-mm-ss
    shijianc(time) {
        var date = new Date(time)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s

    },
    changeTimeFormat(str) {
        this.clock = (str + '').split(' ')[4]
        if ((str + '').indexOf('-') != -1) {
            str = str.replace(new RegExp(/-/gm), '/')
        }
        let d = new Date(str)
        let newDateYear = d.getFullYear()
        let newDateMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
        let newDateDay = d.getDate() + '' < 10 ? '0' + d.getDate() + '' : d.getDate() + ''
        return newDateYear + '-' + newDateMonth + '-' + newDateDay + ' ' + this.clock
    },
    //根据yy-mm-dd hh:mm:ss 获取hh:mm:ss
    getHmsecond(dateStr) {
        var date = new Date(dateStr);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var time = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
        return time;
    },
    //根据yy-mm-dd hh:mm:ss 获取mm-dd hh:mm
    getHmsecond1(dateStr) {
        var date = new Date(dateStr);
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) { month = "0" + month; }
        if (strDate >= 0 && strDate <= 9) { strDate = "0" + strDate; }

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var time = month + '-' + strDate + " " + hours + ":" + (minutes < 10 ? "0" : "");
        return time;
    },
    getNowFormatDate() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();

        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

        if (month >= 1 && month <= 9) { month = "0" + month; }
        if (strDate >= 0 && strDate <= 9) { strDate = "0" + strDate; }
        if (h >= 0 && h <= 9) { h = "0" + h; }
        if (m >= 0 && m <= 9) { m = "0" + m; }
        if (s >= 0 && s <= 9) { s = "0" + s; }

        var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + h + ":" + m + ":" + s;
        return currentdate;
    },

}
export default common