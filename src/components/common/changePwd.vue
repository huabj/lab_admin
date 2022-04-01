<template>
  <div class="changePwdPage">
    <div class="modal-bg">
      <div class="modal w-30" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f18 f-bolder">修改密码</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="repassForm" :model="repassForm" :rules="rules">
            <el-form-item label="旧密码" class="w-100" prop="oldPass">
              <el-input prefix-icon="el-icon-lock" size="small" type="password" v-model="repassForm.oldPass" placeholder="请输入您的旧密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" class="w-100" prop="newPass">
              <el-input prefix-icon="el-icon-lock" size="small" type="password" v-model="repassForm.newPass" placeholder="请输入您的新密码" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('repassForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'changePwd',
    data () {
      return {
        repassForm: {
          oldPass: '',
          newPass: ''
        },
        rules: {
          oldPass: [
            {required: true, message: '请输入您的旧密码', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入您的新密码', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    props: [
      'passInfo'
    ],
    methods: {
      submit (repassForm) {
        this.$refs[repassForm].validate((valid) => {
          if (valid) {
            this.repassSave();
          } else {
            return false;
          }
        });
      },
      repassSave () {
        let vm = this;
        this.$Service.updatePass(this.repassForm).then(function (res) {
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
          vm.cancelModal('add');
        });
      },
      cancelModal (sign) {
        this.$emit('repassModalClose', sign);
      }
    }
  };
</script>
