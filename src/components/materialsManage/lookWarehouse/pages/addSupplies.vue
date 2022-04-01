<template>
  <div class="addSuppliesPage">
    <div class="modal-bg">
      <div class="modal w-40" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">物料信息维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="addSuppliesForm" :model="addSuppliesForm" :rules="rules">
            <el-form-item label="物料名称" class="w-100" prop="name">
              <el-input placeholder="请输入物料名称" size="small" v-model="addSuppliesForm.name"></el-input>
            </el-form-item>
            <el-form-item label="数量" class="w-50"  prop="quantity">
              <el-input-number v-model="addSuppliesForm.quantity" size="small" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="单位" class="w-50" prop="unit">
              <el-select v-model="addSuppliesForm.unit" placeholder="请选择" size="small">
                <el-option v-for="item in unitList" :key="item.id" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库编号" class="w-50" prop="storageNumber">
              <el-input placeholder="请输入仓库编号" size="small" v-model="addSuppliesForm.storageNumber"></el-input>
            </el-form-item>
            <el-form-item label="货架编号" class="w-50" prop="warehouseNumber">
              <el-input placeholder="请输入货架编号" size="small" v-model="addSuppliesForm.warehouseNumber"></el-input>
            </el-form-item>
            <el-form-item label="物料类型" class="w-50" prop="type">
              <el-select v-model="addSuppliesForm.type" placeholder="请选择">
                <el-option label="消耗品" value="1"></el-option>
                <el-option label="非消耗品" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安全系数" class="w-50" prop="safeType">
              <el-select v-model="addSuppliesForm.safeType" placeholder="请选择">
                <el-option v-for="item in suppliesSafeTypeList" :key="item.id" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" class="w-100" prop="times">
              <el-date-picker v-model="addSuppliesForm.times" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" class="w-100" prop="remark">
              <el-input type="textarea" v-model="addSuppliesForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('addSuppliesForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'addSupplies',
    data () {
      return {
        addSuppliesForm: {
          id: '',
          number: '',
          name: '',
          type: '',
          quantity: 1,
          unit: '',
          warehouseNumber: '',
          storageNumber: '',
          safeType: '',
          startTime: '',
          endTime: '',
          status: 0,
          remark: '',
          times: []
        },
        rules: {
          name: [
            {required: true, message: '请输入物料名称', trigger: 'blur'}
          ],
          quantity: [
            {required: true, message: '请输入数量', trigger: 'blur'}
          ],
          storageNumber: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          warehouseNumber: [
            {required: true, message: '请输入货架编号', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          safeType: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          times: [
            {required: true, message: '请选择', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu',
        'unitList',
        'suppliesSafeTypeList',
        'currentMenu'
      ])
    },
    props: [
      'passInfo'
    ],
    created () {
      if (this.passInfo.row !== undefined) {
        this.getValue();
      }
    },
    methods: {
      getValue () {
        this.addSuppliesForm.id = this.passInfo.row.id;
        this.addSuppliesForm.name = this.passInfo.row.name;
        this.addSuppliesForm.number = this.passInfo.row.number;
        this.addSuppliesForm.type = this.passInfo.row.typeId;
        this.addSuppliesForm.quantity = this.passInfo.row.quantity;
        this.addSuppliesForm.unit = this.passInfo.row.unitId;
        this.addSuppliesForm.warehouseNumber = this.passInfo.row.warehouseNumber;
        this.addSuppliesForm.storageNumber = this.passInfo.row.storageNumber;
        this.addSuppliesForm.safeType = this.passInfo.row.safeTypeId;
        this.addSuppliesForm.times.push(this.passInfo.row.startTime);
        this.addSuppliesForm.times.push(this.passInfo.row.endTime);
        this.addSuppliesForm.status = this.passInfo.row.statusId;
        this.addSuppliesForm.remark = this.passInfo.row.remark;
      },
      submit (addSuppliesForm) {
        this.$refs[addSuppliesForm].validate((valid) => {
          if (valid) {
            if (this.passInfo.row === undefined) {
              this.addSuppliesSave();
            } else {
              this.updateSuppliesSave();
            }
          } else {
            return false;
          }
        });
      },
      addSuppliesSave () {
        let vm = this;
        this.addSuppliesForm.startTime = this.addSuppliesForm.times[0];
        this.addSuppliesForm.endTime = this.addSuppliesForm.times[1];
        this.$Service.addSupplies(this.addSuppliesForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          }
        });
      },
      updateSuppliesSave () {
        let vm = this;
        this.addSuppliesForm.startTime = this.addSuppliesForm.times[0];
        this.addSuppliesForm.endTime = this.addSuppliesForm.times[1];
        this.$Service.updateSupplies(this.addSuppliesForm).then(function (res) {
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
        this.$emit('addSuppliesModalClose', sign);
      }
    }
  };
</script>
