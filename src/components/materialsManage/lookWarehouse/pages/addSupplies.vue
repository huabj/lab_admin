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
            <el-form-item label="物料类型" class="w-100" prop="materialTypeName">
              <el-input placeholder="请输入物料类型" size="small" v-model="addSuppliesForm.materialTypeName"></el-input>
            </el-form-item>
            <el-form-item label="物料名称" class="w-100" prop="materialName">
              <el-input placeholder="请输入物料名称" size="small" v-model="addSuppliesForm.materialName"></el-input>
            </el-form-item>
            <el-form-item label="仓库编号" class="w-50" prop="wareHouseNumber">
              <el-input placeholder="请输入仓库编号" size="small" v-model="addSuppliesForm.wareHouseNumber"></el-input>
            </el-form-item>
            <el-form-item label="货架编号" class="w-50" prop="shelvesNumber">
              <el-input placeholder="请输入货架编号" size="small" v-model="addSuppliesForm.shelvesNumber"></el-input>
            </el-form-item>
            <el-form-item label="入库数量" class="w-50" prop="count" v-if="passInfo.sign === 'in'">
              <el-input placeholder="请输入入库数量" size="small" v-model="addSuppliesForm.count"></el-input>
            </el-form-item>
            <el-form-item label="出库数量" class="w-50" prop="count" v-if="passInfo.sign === 'out'">
              <el-input placeholder="请输入出库数量" size="small" v-model="addSuppliesForm.count"></el-input>
            </el-form-item>
            <el-form-item label="申请数量" class="w-50" prop="count" v-if="passInfo.sign === 'apply'">
              <el-input placeholder="请输入申请数量" size="small" v-model="addSuppliesForm.count"></el-input>
            </el-form-item>
            <el-form-item label="单位" class="w-50" prop="unit">
              <el-input placeholder="请输入单位" size="small" v-model="addSuppliesForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="有效期" class="w-50" prop="limitType">
              <el-radio-group v-model="addSuppliesForm.limitType">
                <el-radio :label="1">时效</el-radio>
                <el-radio :label="2">长期</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时效日期" class="w-50" prop="limitTime" v-if="addSuppliesForm.limitType === 1">
              <el-date-picker v-model="addSuppliesForm.limitTime" type="datetime" placeholder="选择日期" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item label="入库性质" class="w-100" prop="inputType" v-if="passInfo.sign === 'in'">
              <!--入库性质 （1.采购 2.补贴 3.部分归还 4.全部归还）-->
              <el-select v-model="addSuppliesForm.inputType" placeholder="请选择" size="small">
                <el-option label="采购" :value="1"></el-option>
                <el-option label="补贴" :value="2"></el-option>
                <el-option label="部分归还" :value="3"></el-option>
                <el-option label="全部归还" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出库性质" class="w-100" prop="outputType" v-if="passInfo.sign === 'out'">
              <!--出库性质 （1.分发 2.领用 3.借用 4.报废）-->
              <el-select v-model="addSuppliesForm.outputType" placeholder="请选择" size="small">
                <el-option label="分发" :value="1"></el-option>
                <el-option label="领用" :value="2"></el-option>
                <el-option label="借用" :value="3"></el-option>
                <el-option label="报废" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归还期限" class="w-100" prop="applyLimitTime" v-if="passInfo.sign === 'apply'">
              <el-date-picker v-model="addSuppliesForm.applyLimitTime" type="datetime" placeholder="选择日期" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item label="申请类别" class="w-100" prop="applyType" v-if="passInfo.sign === 'apply'">
              <!--申请类别 （1.领用 2.借用）-->
              <el-select v-model="addSuppliesForm.applyType" placeholder="请选择" size="small">
                <el-option label="领用" :value="1"></el-option>
                <el-option label="借用" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="待领取时间" class="w-100" prop="receiveTime" v-if="passInfo.sign === 'apply'">
              <el-date-picker v-model="addSuppliesForm.receiveTime" type="datetime" placeholder="选择日期" size="small"></el-date-picker>
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
          limitTime: '',
          limitType: '',
          unit: '',
          wareHouseNumber: '',
          shelvesNumber: '',
          materialTypeName: '',
          materialTypeId: '',
          materialName: '',
          materialId: '',
          type: '',
          count: '',
          inputType: '',
          outputType: '',
          applyType: '',
          applyLimitTime: '',
          receiveTime: ''
        },
        rules: {
          materialName: [
            {required: true, message: '请输入物料名称', trigger: 'blur'}
          ],
          count: [
            {required: true, message: '请输入数量', trigger: 'blur'}
          ],
          shelvesNumber: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          wareHouseNumber: [
            {required: true, message: '请输入货架编号', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          materialTypeName: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          limitType: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          limitTime: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          inputType: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          outputType: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          applyType: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          applyLimitTime: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          receiveTime: [
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
        this.addSuppliesForm.materialTypeName = this.passInfo.row.materialTypeName;
        this.addSuppliesForm.materialTypeId = this.passInfo.row.materialTypeId;
        this.addSuppliesForm.materialName = this.passInfo.row.materialName;
        this.addSuppliesForm.materialId = this.passInfo.row.id;
        this.addSuppliesForm.wareHouseNumber = this.passInfo.row.wareHouseNumber;
        this.addSuppliesForm.shelvesNumber = this.passInfo.row.shelvesNumber;
        this.addSuppliesForm.unit = this.passInfo.row.unit;
        this.addSuppliesForm.limitTime = this.passInfo.row.limitTime;
        this.addSuppliesForm.limitType = this.passInfo.row.limitType;
      },
      submit (addSuppliesForm) {
        this.$refs[addSuppliesForm].validate((valid) => {
          if (valid) {
            this.addSuppliesSave();
          } else {
            return false;
          }
        });
      },
      addSuppliesSave () {
        let vm = this;
        // 操作类型 1：入库 2：出库 3：申请
        if (this.passInfo.sign === 'in') {
          this.addSuppliesForm.type = 1;
        } else if (this.passInfo.sign === 'out') {
          this.addSuppliesForm.type = 2;
        } else if (this.passInfo.sign === 'apply') {
          this.addSuppliesForm.type = 3;
        }
        this.addSuppliesForm.count = parseInt(this.addSuppliesForm.count);
        this.$Service.materialInventoryMessage(this.addSuppliesForm).then(function (res) {
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
