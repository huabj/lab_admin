<template>
  <div class="addUsersPage">
    <el-button type="primary" size="small" @click="goUsersManage">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <el-form label-width="100px" label-position="top" class="margin-t-20" ref="addUsersForm" :model="addUsersForm" :rules="rules">
      <div class="addUsers">
        <div class="title">
          <span class="span-l" v-if="currentMenu.sign === 'add'">新建用户</span>
          <span class="span-l" v-else-if="currentMenu.sign === 'update'">修改权限</span>
          <div class="clearfix"></div>
        </div>
        <p class="f16 margin-t-20" style="padding: 0 10px;">基础信息</p>
        <div class="addUsersInfo margin-t-10">
          <div class="addUsersInfo-1 flex">
            <div class="addUsersInfo-1-l flex">
              <el-form-item label="姓名" prop="nickName">
                <el-input placeholder="请输入姓名" size="small" v-model="addUsersForm.nickName"></el-input>
              </el-form-item>
              <el-form-item label="民族" prop="nation">
                <el-select v-model="addUsersForm.nation" size="small" placeholder="请选择">
                  <el-option v-for="item in nationList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="籍贯" prop="nativePlace">
                <el-input placeholder="请输入籍贯" size="small" v-model="addUsersForm.nativePlace"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="addUsersForm.sex" size="small" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="毕业院校" prop="schoolAddress">
                <el-input placeholder="请输入毕业院校" size="small" v-model="addUsersForm.schoolAddress"></el-input>
              </el-form-item>
              <el-form-item label="婚姻状况" prop="married">
                <el-select v-model="addUsersForm.married" size="small" placeholder="请选择">
                  <el-option label="未婚" :value="1"></el-option>
                  <el-option label="已婚" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号" prop="card">
                <el-input placeholder="请输入身份证号" size="small" v-model="addUsersForm.card"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input placeholder="请输入联系电话" size="small" v-model="addUsersForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="身体状况" prop="body">
                <el-input placeholder="请输入身体状况" size="small" v-model="addUsersForm.body"></el-input>
              </el-form-item>
            </div>
            <div class="addUsersInfo-1-r">
              <el-form-item size="small" prop="images">
                <label @change="uploadFile($event)" class="uploadFile">
                  <img src="../../../../assets/img/upload.png"  v-if="addUsersForm.userAvatar.realName === ''">
                  <img :src="$Config.POST_URL + '/avatar/' + addUsersForm.userAvatar.realName" v-else>
                  <input class="none" name="filename" type="file" ref="clearFile" accept="image/jpeg, image/png">
                </label>
              </el-form-item>
            </div>
          </div>
          <div class="addUsersInfo-2 flex">
            <div class="addUsersInfo-2-l">
              <el-form-item label="邮箱" prop="email">
                <el-input placeholder="请输入邮箱" size="small" v-model="addUsersForm.email"></el-input>
              </el-form-item>
            </div>
            <div class="addUsersInfo-2-r">
              <el-form-item label="家庭住址" prop="homeAddress">
                <el-input placeholder="请输入家庭住址" size="small" v-model="addUsersForm.homeAddress"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="addUsers" style=" padding: 20px 20px 10px 20px;">
        <p class="f16" style="padding: 0 10px;">岗位信息</p>
        <div class="addUsersInfo margin-t-10">
          <div class="addUsersInfo-2 flex">
            <div class="addUsersInfo-2-l">
              <el-form-item label="院系" prop="department">
                <el-input placeholder="请输入院系" size="small" v-model="addUsersForm.department"></el-input>
              </el-form-item>
            </div>
            <div class="addUsersInfo-2-r">
              <el-form-item label="办公地点" prop="jobAddress">
                <el-input placeholder="请输入办公地点" size="small" v-model="addUsersForm.jobAddress"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="addUsersInfo-3 flex">
            <el-form-item label="是否为党员" prop="memberStatus">
              <!--1-是，2-否-->
              <el-select v-model="addUsersForm.memberStatus" size="small" placeholder="请选择">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工龄" prop="jobYear">
              <el-input placeholder="请输入工龄" size="small" v-model="addUsersForm.jobYear"></el-input>
            </el-form-item>
            <el-form-item label="卡号" prop="idCard">
              <el-input placeholder="请输入卡号" size="small" v-model="addUsersForm.idCard"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="idPassword">
              <el-input prefix-icon="el-icon-lock" type="password" v-model="addUsersForm.idPassword" placeholder="请输入登录密码" show-password></el-input>
            </el-form-item>
          </div>
          <div class="addUsersInfo-2 flex">
            <div class="addUsersInfo-2-l">
              <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" size="small" v-model="addUsersForm.username"></el-input>
              </el-form-item>
            </div>
            <div class="addUsersInfo-2-r">
              <el-form-item label="角色分配" prop="roles">
                <el-select v-model="addUsersForm.roles" size="small" multiple placeholder="请选择">
                  <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="addUsersInfo-2">
            <el-form-item label="补充说明">
              <el-input type="textarea" v-model="addUsersForm.remark"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="but w-100 text-c"><el-button size="small" type="primary" @click="submit('addUsersForm')">&nbsp;&nbsp;&nbsp;&nbsp;提交&nbsp;&nbsp;&nbsp;&nbsp;</el-button></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'addUsers',
    data () {
      let checkEmail = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入邮箱'));
        } else {
          let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(value)) {
            return callback(new Error('您输入的邮箱格式不正确！'));
          } else {
            return callback();
          }
        }
      };
      return {
        addUsersForm: {
          id: '',
          userAvatar: {
            id: '',
            realName: ''
          },
          nickName: '',
          username: '',
          email: '',
          phone: '',
          sex: '',
          nation: '',
          nativePlace: '',
          schoolAddress: '',
          married: '',
          card: '',
          homeAddress: '',
          body: '',
          department: '',
          jobAddress: '',
          memberStatus: '',
          jobYear: '',
          idCard: '',
          idPassword: '',
          remark: '',
          roles: [],
          enabled: 1,
          dept: {
            id: 2
          },
          job: {
            id: 11
          }
        },
        rules: {
          roles: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          nation: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          memberStatus: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          married: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          nickName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          nativePlace: [
            {required: true, message: '请输入籍贯', trigger: 'blur'}
          ],
          schoolAddress: [
            {required: true, message: '请输入毕业院校', trigger: 'blur'}
          ],
          card: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'}
          ],
          body: [
            {required: true, message: '请输入身体状况', trigger: 'blur'}
          ],
          email: [
            {required: true, validator: checkEmail, trigger: 'blur'}
          ],
          homeAddress: [
            {required: true, message: '请输入家庭住址', trigger: 'blur'}
          ],
          department: [
            {required: true, message: '请输入院系', trigger: 'blur'}
          ],
          jobAddress: [
            {required: true, message: '请输入办公地点', trigger: 'blur'}
          ],
          jobYear: [
            {required: true, message: '请输入工龄', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '请输入卡号', trigger: 'blur'}
          ],
          idPassword: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入补充说明', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        taskFile: {},
        rolesList: []
      };
    },
    computed: {
      ...mapState([
        'currentMenu',
        'nationList'
      ])
    },
    created () {
      this.rolesList = this.currentMenu.rolesList;
      if (this.currentMenu.row !== undefined) {
        this.getValue();
      }
    },
    methods: {
      getValue () {
        this.addUsersForm.id = this.currentMenu.row.id;
        this.addUsersForm.userAvatar.id = this.currentMenu.row.avatar.id;
        this.addUsersForm.userAvatar.realName = this.currentMenu.row.avatar.realName;
        this.addUsersForm.nickName = this.currentMenu.row.nickName;
        this.addUsersForm.username = this.currentMenu.row.username;
        this.addUsersForm.email = this.currentMenu.row.email;
        this.addUsersForm.phone = this.currentMenu.row.phone;
        this.addUsersForm.sex = this.currentMenu.row.sex;
        this.addUsersForm.nation = this.currentMenu.row.nation;
        this.addUsersForm.nativePlace = this.currentMenu.row.nativePlace;
        this.addUsersForm.schoolAddress = this.currentMenu.row.schoolAddress;
        this.addUsersForm.married = this.currentMenu.row.married;
        this.addUsersForm.card = this.currentMenu.row.card;
        this.addUsersForm.homeAddress = this.currentMenu.row.homeAddress;
        this.addUsersForm.body = this.currentMenu.row.body;
        this.addUsersForm.department = this.currentMenu.row.department;
        this.addUsersForm.jobAddress = this.currentMenu.row.jobAddress;
        this.addUsersForm.memberStatus = this.currentMenu.row.memberStatus;
        this.addUsersForm.jobYear = this.currentMenu.row.jobYear;
        this.addUsersForm.idCard = this.currentMenu.row.idCard;
        this.addUsersForm.idPassword = this.currentMenu.row.idPassword;
        this.addUsersForm.remark = this.currentMenu.row.remark;
        for (let i = 0; i < this.currentMenu.row.roles.length; i++) {
          this.addUsersForm.roles.push(this.currentMenu.row.roles[i].id);
        }
        this.addUsersForm.enabled = this.currentMenu.row.enabled;
      },
      // 信息提交
      submit (addUsersForm) {
        this.$refs[addUsersForm].validate((valid) => {
          if (valid) {
            if (this.currentMenu.row !== undefined) {
              this.updateUsersSave();
            } else {
              this.addUsersSave();
            }
          } else {
            return false;
          }
        });
      },
      // 新增
      addUsersSave () {
        let roles = [];
        for (let i = 0; i < this.addUsersForm.roles.length; i++) {
          let item = {
            id: this.addUsersForm.roles[i]
          };
          roles.push(item);
        }
        this.addUsersForm.roles = roles;
        if (this.addUsersForm.userAvatar.realName === '') {
          this.$alert('请上传您的头像照片！', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else {
          let vm = this;
          this.$Service.addUsers(this.addUsersForm).then(function (res) {
            if (res.data.data !== undefined) {
              vm.$message({
                message: '操作成功',
                type: 'success'
              });
              vm.goUsersManage();
            }
          });
        }
      },
      // 修改
      updateUsersSave () {
        let roles = [];
        for (let i = 0; i < this.addUsersForm.roles.length; i++) {
          let item = {
            id: this.addUsersForm.roles[i]
          };
          roles.push(item);
        }
        this.addUsersForm.roles = roles;
        if (this.addUsersForm.userAvatar.realName === '') {
          this.$alert('请上传您的头像照片！', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else {
          let vm = this;
          this.$Service.updateUsers(this.addUsersForm).then(function (res) {
            if (res.data.data !== undefined) {
              vm.$message({
                message: '操作成功',
                type: 'success'
              });
              vm.goUsersManage();
            }
          });
        }
      },
      // 上传头像
      uploadFile (e) {
        this.taskFile = e.target.files[0];
        this.fileUploadSubmit();
      },
      fileUploadSubmit () {
        let formData = new FormData();
        formData.append('file', this.taskFile, this.taskFile.name);
        formData.append('chunk', '0');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        let vm = this;
        this.$Service.updateAvatar(formData, config).then(function (res) {
          if (res.data.data !== undefined) {
            vm.addUsersForm.userAvatar.realName = res.data.data.realName;
            vm.addUsersForm.userAvatar.id = res.data.data.id;
          } else {
            vm.taskFile = {};
          }
        });
      },
      // 返回
      goUsersManage () {
        let currentMenu = {
          component: 'usersManage',
          roleId: this.currentMenu.roleId
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
