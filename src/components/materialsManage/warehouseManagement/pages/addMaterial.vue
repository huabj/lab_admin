<template>
  <div class="addMaterialPage">
    <div class="modal-bg">
      <div class="modal w-40" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">物料维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="120px" class="margin-t-20" ref="addForm" :model="addForm" :rules="rules">
            <el-form-item label="物料类型" class="w-100" prop="materialTypeName">
              <el-input placeholder="请输入物料名称" size="small" v-model="addForm.materialTypeName" disabled></el-input>
            </el-form-item>
            <el-form-item label="物料名称" class="w-100" prop="materialName">
              <el-input placeholder="请输入物料名称" size="small" v-model="addForm.materialName"></el-input>
            </el-form-item>
            <el-form-item label="仓库编号" class="w-100" prop="wareHouseNumber">
              <el-input placeholder="请输入仓库编号" size="small" v-model="addForm.wareHouseNumber"></el-input>
            </el-form-item>
            <el-form-item label="货架编号" class="w-100" prop="shelvesNumber">
              <el-input placeholder="请输入货架编号" size="small" v-model="addForm.shelvesNumber"></el-input>
            </el-form-item>
            <el-form-item label="单位" class="w-100" prop="unit">
              <el-input placeholder="请输入单位" size="small" v-model="addForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="有效期" class="w-100" prop="limitType">
              <el-radio-group v-model="addForm.limitType">
                <el-radio :label="1">时效</el-radio>
                <el-radio :label="2">长期</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时效日期" class="w-100" prop="limitTime" v-if="addForm.limitType === 1">
              <el-date-picker v-model="addForm.limitTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否需要归还" class="w-100" prop="isReturn">
              <el-radio-group v-model="addForm.isReturn">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
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
  name: 'addMaterial',
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
        id: '',
        materialName: '',
        materialTypeName: '',
        materialTypeId: '',
        wareHouseNumber: '',
        shelvesNumber: '',
        unit: '',
        limitType: 1, // 有效期类型（1：限期 2：长期）
        limitTime: '',
        isReturn: 0, // 是否需要归还（0-不需要归还 1-需要归还）
        status: 0 // 状态 0-启用 1-禁用
      },
      rules: {
        materialTypeName: [
          {required: true, message: '请输入物料类型名称', trigger: 'blur'}
        ],
        materialName: [
          {required: true, message: '请输入物料名称', trigger: 'blur'}
        ],
        wareHouseNumber: [
          {required: true, message: '请输入仓库编号', trigger: 'blur'}
        ],
        shelvesNumber: [
          {required: true, message: '请输入货架编号', trigger: 'blur'}
        ],
        unit: [
          {required: true, message: '请输入单位', trigger: 'blur'}
        ],
        limitType: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        limitTime: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        isReturn: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    };
  },
  created () {
    if (this.passInfo.sign === undefined) {
      this.addForm.materialTypeName = this.passInfo.materialTypeName;
      this.addForm.materialTypeId = this.passInfo.id;
    } else {
      this.addForm = this.passInfo.data;
    }
  },
  methods: {
    submit (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if (this.passInfo.sign === undefined) {
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
      if (this.addForm.limitType === 2) {
        this.addForm.limitTime = null;
      }
      this.$Service.addMaterial(this.addForm).then(function (res) {
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
      if (this.addForm.limitType === 2) {
        this.addForm.limitTime = null;
      }
      this.$Service.editMaterial(this.addForm).then(function (res) {
        if (res.data.data !== undefined) {
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
          vm.cancelModal('edit');
        }
      });
    },
    cancelModal (sign) {
      this.$emit('addMaterialModalClose', sign);
    }
  }
};
</script>

<style scoped>

</style>
