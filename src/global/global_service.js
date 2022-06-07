/**
 * 用来接口请求的
 */
import Vue from 'vue';
import Config from './global_config';

class GlobalService extends Vue {
  GET (url, model) {
    return this.httpMethod('GET', url, model);
  }
  POST (url, model) {
    return this.httpMethod('POST', url, model);
  }
  PUT (url, model) {
    return this.httpMethod('PUT', url, model);
  }
  DELETE (url, model) {
    return this.httpMethod('DELETE', url, model);
  }
  // 接口请求
  httpMethod (method, url, model) {
    let params = {
      url: url,
      method: method
    };
    if (method === 'GET') {
      model && (params.params = model);
    } else {
      model && (params.data = model);
    }
    let localToken = this.getCookieVal('token');
    let token = (undefined === localToken) ? '' : localToken;
    params.headers = {
      'Authorization': token
    };
    return new Promise((resolve, reject) => {
      let vm = this;
      this.$axios(params)
        .then((res) => {
          console.log('[###接口请求的url###]');
          console.log('[url]', url);
          console.log('[###接口请求的参数###]');
          console.log('[headers]', params.headers);
          console.log('[method]', params.method);
          console.log('[model]', model);
          console.log('[data]', params.data);
          console.log('[###接口返回的结果###]');
          console.log(res.data);
          if (res.data.status === 1) {
            resolve(res);
          } else {
            vm.$alert(res.data.msg, '温馨提示', {
              confirmButtonText: '确定'
            });
          }
        });
    }).catch((e) => {
        console.log('[###接口请求错误信息###]:', e.data);
    });
  };
  // 后台返回token过期跳转登陆页面
  goLogin () {
    sessionStorage.setItem('json', '');
    sessionStorage.setItem('userInfo', '');
    window.location.href = Config.WEB_URL;
  };
}

export default GlobalService;
