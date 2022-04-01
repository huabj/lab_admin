<template>
  <div class="addRolesPage">
    <div class="modal-bg">
      <div class="modal w-30" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">角色信息维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="addRolesForm" :model="addRolesForm" :rules="rules">
            <el-form-item label="角色名称" class="w-100" prop="name">
              <el-input placeholder="请输入角色名称" size="small" v-model="addRolesForm.name"></el-input>
            </el-form-item>
            <el-form-item label="角色级别" class="w-50"  prop="level">
              <el-input-number v-model="addRolesForm.level" size="small" controls-position="right" :min="1" :max="5"></el-input-number>
            </el-form-item>
            <el-form-item label="角色权限" class="w-50" prop="permission">
              <el-input placeholder="请输入角色权限" size="small" v-model="addRolesForm.permission"></el-input>
            </el-form-item>
            <el-form-item label="描述信息" class="w-100" prop="remark">
              <el-input type="textarea" v-model="addRolesForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('addRolesForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'addRoles',
    data () {
      return {
        addRolesForm: {
          id: '',
          name: '',
          remark: '',
          dataScope: '本级',
          level: '',
          permission: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          level: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          permission: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入描述信息', trigger: 'blur'}
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
    created () {
      if (this.passInfo.id !== undefined) {
        this.getValue();
      }
    },
    methods: {
      getValue () {
        this.addRolesForm.id = this.passInfo.id;
        this.addRolesForm.name = this.passInfo.name;
        this.addRolesForm.level = this.passInfo.level;
        this.addRolesForm.remark = this.passInfo.remark;
        this.addRolesForm.dataScope = this.passInfo.dataScope;
        this.addRolesForm.permission = this.passInfo.permission;
      },
      submit (addRolesForm) {
        this.$refs[addRolesForm].validate((valid) => {
          if (valid) {
            if (this.passInfo.id !== undefined) {
              this.updateRolesSave();
            } else {
              this.addRolesSave();
            }
          } else {
            return false;
          }
        });
      },
      // 角色新增提交
      addRolesSave () {
        let vm = this;
        this.$Service.addRoles(this.addRolesForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          }
        });
      },
      // 角色修改提交
      updateRolesSave () {
        let vm = this;
        this.$Service.updateRoles(this.addRolesForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          }
        });
      },
      cancelModal (sign) {
        this.$emit('addRolesModalClose', sign);
      }
    }
  };
</script>
