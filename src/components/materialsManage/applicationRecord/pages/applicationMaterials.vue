<template>
  <div class="applicationMaterialsPage">
    <div class="modal-bg">
      <div class="modal w-50" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">物料归还</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="form" :model="form" :rules="rules">
              <el-form-item label="物料类型" class="w-100">
                <el-input placeholder="请输入物料类型" size="small" v-model="form.materialTypeName"></el-input>
              </el-form-item>
            <el-form-item label="物料名称" class="w-100">
              <el-input placeholder="请输入物料名称" size="small" v-model="form.materialName"></el-input>
            </el-form-item>
            <el-form-item label="仓库编号" class="w-100">
              <el-input placeholder="请输入仓库编号" size="small" v-model="form.wareHouseNumber"></el-input>
            </el-form-item>
            <el-form-item label="货架编号" class="w-100">
              <el-input placeholder="请输入货架编号" size="small" v-model="form.shelvesNumber"></el-input>
            </el-form-item>
            <el-form-item label="申请数量" class="w-50">
              <el-input placeholder="请输入申请数量" size="small" v-model="form.applyCount"></el-input>
            </el-form-item>
            <el-form-item label="单位" class="w-50">
              <el-input placeholder="请输入单位" size="small" v-model="form.unit"></el-input>
            </el-form-item>
            <!--归还类型（1:正常 2:损坏 3:丢失 4：待修复 5：报废 ）-->
            <el-form-item label="归还类型" class="w-50" prop="type" size="small">
              <el-select v-model="form.receiveStatus" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="returnCount" label="归还数量" class="w-50">
              <el-input placeholder="请输入归还数量" size="small" v-model="form.returnCount"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('form')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'applicationMaterials',
    data () {
      return {
        // 归还类型（1:正常 2:损坏 3:丢失 4：待修复 5：报废 ）
        typeList: [
          {
            id: 1,
            name: '正常'
          },
          {
            id: 2,
            name: '损坏'
          },
          {
            id: 3,
            name: '丢失'
          },
          {
            id: 4,
            name: '待修复'
          },
          {
            id: 5,
            name: '报废'
          }
        ],
        form: {
          materialInventoryApplyId: '',
          receiveStatus: '',
          returnCount: ''
        },
        rules: {
          returnCount: [
            {required: true, message: '请输入归还数量', trigger: 'blur'}
          ]
        }
      };
    },
    props: [
      'passInfo'
    ],
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
      this.form = {...this.form, ...this.passInfo};
      console.log(this.form);
    },
    methods: {
      submit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let vm = this;
            this.form.materialInventoryApplyId = this.form.id;
            this.$Service.materialInventoryReturn(this.form).then(function (res) {
              if (res.data.data !== undefined) {
                vm.$message({
                  message: '操作成功',
                  type: 'success'
                });
                vm.cancelModal('add');
              }
            });
          } else {
            return false;
          }
        });
      },
      cancelModal (sign) {
        this.$emit('applicationMaterialsModalClose', sign);
      }
    }
  };
</script>
