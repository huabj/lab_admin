<template>
  <div class="loginPage">
    <div class="login-bg">
      <div class="login">
        <h3>校园数字化系统</h3>
        <div class="login-main">
          <div class="login-nav">
            <ul>
              <li v-for="(item, index) in loginNavList" :key="item.id" :class="{'active': activeName === index}" @click="handleClick(index)">
                {{item.name}}
                <span v-if="activeName === index"></span>
              </li>
            </ul>
          </div>
          <div class="login-form" v-if="activeName === 0">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user" type="text" v-model="loginForm.username" placeholder="请输入您的教工号" clearable></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" placeholder="请输入您的密码" show-password></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit('loginForm')">登录</el-button>
            <p>
              <el-checkbox v-model="checked">记住我</el-checkbox>
              <a class="f14 color-gray" href="javascript:void(0);" @click="forgePassword">忘记密码？</a>
            </p>
          </div>
          <div class="login-form" v-if="activeName === 1">
            <el-form :model="loginForm2" :rules="rules2" ref="loginForm2">
              <el-form-item prop="phone">
                <el-input prefix-icon="el-icon-mobile" type="text" v-model="loginForm2.phone" placeholder="请输入您的手机号" clearable></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm2.password" placeholder="请输入您的密码" show-password></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit2('loginForm2')">登录</el-button>
            <p>
              <el-checkbox v-model="checked">记住我</el-checkbox>
              <a class="f14 color-gray" href="javascript:void(0);" @click="forgePassword">忘记密码？</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'login',
  data () {
    let checkUserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入您的用户名！'));
      } else {
        return callback();
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入您的手机号！'));
      } else {
        return callback();
      }
    };
    let checkPassWord = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入您的登录密码！'));
      } else {
        return callback();
      }
    };
    return {
      checked: false,
      loginNavList: [
        {
          name: '教工号登录'
        },
        {
          name: '手机号登录'
        }
      ],
      activeName: 0,
      loginForm: {
        username: '',
        password: ''
      },
      loginForm2: {
        phone: '',
        password: ''
      },
      rules: {
        username: [
          {validator: checkUserName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassWord, trigger: 'blur'}
        ]
      },
      rules2: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassWord, trigger: 'blur'}
        ]
      }
    };
  },
  components: {
  },
  created () {
    this.keyupSubmit();
    if (this.getCookieVal('token') !== undefined && this.getCookieVal('token') !== null && this.getCookieVal('token') !== '') {
      this.$router.push('/index');
    }
  },
  methods: {
    handleClick (index) {
      this.activeName = index;
      if (index === 0) {
        this.loginForm2.phone = '';
        this.loginForm2.password = '';
      } else if (index === 1) {
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    },
    keyupSubmit () {
      let that = this;
      document.onkeydown = function (e) {
        e = window.event || e;
        if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
          if (that.activeName === 0) {
            that.submit('loginForm');
          } else if (that.activeName === 1) {
            that.submit2('loginForm2');
          }
        }
      };
    },
    submit (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.getLogin(this.loginForm);
        } else {
          return false;
        }
      });
    },
    submit2 (loginForm2) {
      this.$refs[loginForm2].validate((valid) => {
        if (valid) {
          this.getLogin(this.loginForm2);
        } else {
          return false;
        }
      });
    },
    getLogin (loginForm) {
      let vm = this;
      this.$Service.login(loginForm).then(function (res) {
        if (res.data.data !== undefined) {
          document.cookie = 'userInfo=' + JSON.stringify(res.data.data.user) + ';path=/;';
          document.cookie = 'token=' + res.data.data.token + ';path=/;';
          vm.$router.push('/index');
        }
      });
    },
    forgePassword () {
      this.$alert('如果您忘记了密码，请联系系统管理员，帮您重置密码！', '温馨提示', {
        confirmButtonText: '确定'
      });
    }
  }
};
</script>
