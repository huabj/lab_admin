let DEV = {
  POST_URL_VALUE: 'http://82.156.25.167:9966',
  PC: {
    WEB_URL_VALUE: 'http://82.156.25.167:9967'
  }
};

let PRO = {
  POST_URL_VALUE: 'http://10.10.28.58:9966',
  PC: {
    WEB_URL_VALUE: 'http://10.10.28.58:9967'
  }
};


let getUrlList = DEV;
const POST_URL = getUrlList.POST_URL_VALUE;
const WEB_URL = getUrlList.PC.WEB_URL_VALUE;

export default {
  POST_URL: POST_URL,
  WEB_URL: WEB_URL
};
