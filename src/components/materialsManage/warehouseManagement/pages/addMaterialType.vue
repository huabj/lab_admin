<template>
  <div class="addMaterialTypePage">
    <div class="modal-bg">
      <div class="modal w-40" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">物料类型维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="addForm" :model="addForm" :rules="rules">
            <el-form-item label="物料类型" class="w-100" prop="materialTypeName">
              <el-input placeholder="请输入物料类型名称" size="small" v-model="addForm.materialTypeName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('addForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'addMaterialType',
  computed: {
    ...mapState([
      'screenHeight'
    ])
  },
  props: [
    'passInfo'
  ],
  data () {
    return {
      addForm: {
        materialTypeName: '',
        status: 0
      },
      rules: {
        materialTypeName: [
          {required: true, message: '请输入物料类型名称', trigger: 'blur'}
        ]
      }
    };
  },
  created () {
    if (this.passInfo.id !== undefined) {
      this.addForm = this.passInfo;
    }
  },
  methods: {
    submit (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if (this.passInfo.id === undefined) {
            this.addSave();
          } else {
            this.updateSave();
          }
        } else {
          return false;
        }
      });
    },
    addSave () {
      let vm = this;
      this.$Service.addMaterialType(this.addForm).then(function (res) {
        if (res.data.data !== undefined) {
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
          vm.cancelModal('add');
        }
      });
    },
    updateSave () {
      let vm = this;
      this.$Service.editMaterialType(this.addForm).then(function (res) {
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
      this.$emit('addMaterialTypeModalClose', sign);
    }
  }
};
</script>

<style scoped>

</style>
