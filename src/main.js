// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import './assets/css/index.css';
import Config from './global/global_config.js';
import Service from './services/service.js';
import echarts from 'echarts';
import 'babel-polyfill';
import qs from 'qs';
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';

require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VueVideoPlayer);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
Vue.prototype.$echarts = echarts;
Vue.prototype.$Config = Config;
Vue.prototype.$Service = Service;
Vue.use(ElementUI);

axios.interceptors.request.use(config => {
  showFullScreenLoading();
  // get方法传递数组的处理（重点代码）
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  hideFullScreenLoading();
  return response;
}, error => {
  return Promise.reject(error);
});

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;
// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    // text: '努力加载中...',
    // color: 'rgba(0, 0, 0)',
    background: 'rgba(0, 0, 0, 0.2)',
    // 设置加载动画区域
    target: document.querySelector('.el-icon-loading')
  });
}
function endLoading () {
  loading.close();
}
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// http响应拦截器
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  hideFullScreenLoading();
  return data;
}, error => {
  hideFullScreenLoading();
  let _status = error.response && error.response.status;
  switch (_status) {
    case 400:
      ElementUI.MessageBox.alert(error.response.data.message, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      break;
    case 401:
      ElementUI.MessageBox.alert('您的身份已过期，请您重新登录', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.href = Config.WEB_URL;
          document.cookie = 'userInfo=' + '' + ';path=/;';
          document.cookie = 'token=' + '' + ';path=/;';
        }
      });
      break;
  }
  return Promise.reject(error);
});

// 字符串替换方法
Vue.prototype.replaceAll = function (str, s1, s2) {
  return str.replace(new RegExp(s1, 'gm'), s2);
};

// 获取Cookie中的token
Vue.prototype.getCookieVal = function (name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // 判断这个cookie的参数名是不是我们想要的
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
