(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-de170ebe"],{"1a16":function(t,e,n){"use strict";var a=n("b2f7"),s=n.n(a);s.a},b2f7:function(t,e,n){},e328:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"header"},[t._v("日期格式化")]),n("div",{staticClass:"introduce"},[t._v(t._s(t.describe))]),n("div",{staticClass:"code"},[n("div",[n("div",{staticClass:"jsTitle"},[t._v("js代码")]),n("code",{directives:[{name:"helight",rawName:"v-helight",value:t.jsCode,expression:"jsCode"}],staticClass:"hljs javascript"},[t._v(t._s(t.jsCode))]),n("div",{staticClass:"jsTitle",staticStyle:{position:"relative"}},[t._v("源码\n        "),n("div",{staticClass:"copy",on:{click:t.copy}},[t._v("一键复制")])]),n("code",{ref:"textArea",staticClass:"codeArea",attrs:{autoHeight:"true"},domProps:{innerHTML:t._s(t.originCode)}})])])])},s=[],r={data:function(){return{describe:"这是使用正则表达式的过滤器工具包",jsCode:"  import {fileToString} from 'xxxx';\n        1)在全局注册过滤器\n        2)使用时 {{timeStamp|注册过滤器(\"yyyy-MM-dd\")}}",originCode:'class dateFilter {\n  static formatDate (srcDate, format) {\n    if (srcDate instanceof String) {\n      //排除日期格式串,只处理时间戳\n      let reg = new RegExp(/^d+$/);\n      if (reg.exec(srcDate) !== null) {\n        try {\n          srcDate = parseInt(srcDate);\n        } catch (e) { }\n      }\n    }\n\n    //得到日期\n    srcDate = new Date(srcDate);\n    if (isNaN(srcDate.getDay())) {\n      return \'\';\n    }\n\n    let o = {\n      "M+": srcDate.getMonth() + 1, //月份\n      "d+": srcDate.getDate(), //日\n      "h+": srcDate.getHours() % 12 === 0 ? 12 : srcDate.getHours() % 12, //小时\n      "H+": srcDate.getHours(), //小时\n      "m+": srcDate.getMinutes(), //分\n      "s+": srcDate.getSeconds(), //秒\n      "q+": Math.floor((srcDate.getMonth() + 3) / 3), //季度\n      "S": srcDate.getMilliseconds() //毫秒\n    };\n    let week = {\n      "0": "日",\n      "1": "一",\n      "2": "二",\n      "3": "三",\n      "4": "四",\n      "5": "五",\n      "6": "六"\n    };\n    //年份单独处理\n    if (/(y+)/.test(format)) {\n      format = format.replace(RegExp.$1, (srcDate.getFullYear() + "").substr(4 - RegExp.$1.length));\n    }\n    //月日\n    Object.keys(o).forEach(function (k) {\n      if (new RegExp("(" + k + ")").test(format)) {\n        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));\n      }\n    });\n\n    //星期\n    if (/(E+)/.test(format)) {\n      format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[srcDate.getDay() + ""]);\n    }\n    return format;\n  }\n  static toDate (dateStr) {\n    let date1;\n    try {\n      date1 = new Date(Date.parse(dateStr));\n    } catch (e) {\n\n    }\n    if (!date1) {\n      throw Error.handle(\'not date\');\n    }\n\n    //处理非标准日期串\n    //14位\n    if (isNaN(date1) || isNaN(date1.getDay())) {\n      if (dateStr.length === 14) {\n        dateStr = dateStr.substr(0, 4) + \'/\' + dateStr.substr(4, 2) + \'/\' + dateStr.substr(6, 2) + \' \' +\n          dateStr.substr(8, 2) + \':\' + dateStr.substr(10, 2) + \':\' + dateStr.substr(12);\n        date1 = new Date(Date.parse(dateStr));\n      } else if (dateStr.length === 8) { //8位\n        dateStr = dateStr.substr(0, 4) + \'/\' + dateStr.substr(4, 2) + \'/\' + dateStr.substr(6, 2);\n        date1 = new Date(Date.parse(dateStr));\n      }\n    }\n    return date1;\n  }\n}\nexport default { dateFilter: dateFilter.formatDate }'}},mounted:function(){var t=this;this.$nextTick((function(){t.$refs.textArea.style.height=t.$refs.textArea.scrollHeight+"px"}))},methods:{copy:function(){document.execCommand("copy",!1,this.$refs.textArea.select())}}},i=r,c=(n("1a16"),n("2877")),o=Object(c["a"])(i,a,s,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-de170ebe.7fdd3d68.js.map