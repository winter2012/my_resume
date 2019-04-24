/**
 * @Author: Jecyu
 * @Date: 2017-10-26 10:25:12 pm 
 * @Modified By: JeCyu 
 * @Last Modified time: 2017-10-27 11:01:13 pm 
 */

 
'use strict';

require('./index.css');
require('page/common/index.js');
require('page/common/nav-sample/index.js');
require('iframe-resizer');

// page逻辑
var page = {
    init: function() {
        this.bindEvent(); 
        this.setIframeHeight();
        return this; 
    },
    bindEvent: function() {
        // $('.page-wrap').html('HELLo');
       
    },
    // // 设置iframe高度
    setIframeHeight: function() {
    //     var _this = this;
    //     _this.resizeIframe($('iframe'));
    },

    // // iframe高度自适应
    // resizeIframe:  function (obj) {
    //     obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px'; 
    // } 
 };
 
$(function() {
    page.init();
});
