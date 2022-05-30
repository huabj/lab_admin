<template>
  <div class="warehouseManagementPage">
    <div class="title">
      <span class="span-l">仓库管理</span>
      <div class="button">
        <el-button type="primary" size="small" @click="download">下载模板</el-button>
        <el-button type="primary" size="small" @click="importModalShow">导入</el-button>
        <el-button type="primary" size="small" @click="exportMaterial">导出</el-button>
        <el-button type="primary" size="small" @click="addMaterialTypeModalShow">添加新类型</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="search margin-t-10">
      <el-form label-width="80px" :model="getDataForm">
        <el-form-item label="物料类型" class="fl" prop="materialTypeId">
          <el-select v-model="getDataForm.materialTypeId" size="small" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in materialTypeList" :key="item.id" :label="item.materialTypeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料名称" class="fl" prop="materialName">
          <el-input placeholder="请输入物料名称" size="small" v-model="getDataForm.materialName"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" class="fl" size="small" style="margin: 5px 0 0 20px;" @click="getMaterialList">查询</el-button>
        <div class="clearfix"></div>
      </el-form>
    </div>
    <div class="materialList" v-for="item in materialList" :key="item.id">
      <div class="materialList-title">
        <h2><i class="el-icon-caret-bottom"></i>{{item.materialTypeName}}</h2>
        <div>
          <el-button type="primary" plain size="small" style="margin: 15px 0 0 0;" @click="addMaterialModalShow(item, 'add')">添加</el-button>
          <el-button type="primary" plain size="small" style="margin: 15px 0 0 10px;" @click="addMaterialTypeModalShow(item, 'edit')">编辑</el-button>
          <el-button type="success" plain size="small" style="margin: 15px 0 0 10px;" @click="changeMaterialTypeStatus(item)" v-if="item.status === 0">启用</el-button>
          <el-button type="danger" plain size="small" style="margin: 15px 0 0 10px;" @click="changeMaterialTypeStatus(item)" v-if="item.status === 1">停用</el-button>
        </div>
      </div>
      <el-table :data="item.children" ref="multipleTable" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="materialName" label="名称"></el-table-column>
        <el-table-column prop="wareHouseNumber" label="仓库编号"></el-table-column>
        <el-table-column prop="shelvesNumber" label="货架编号"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="limitType" label="有效期限">
          <!--有效期类型（1：限期 2：长期-->
          <template slot-scope="scope">
            <span v-if="scope.row.limitType === 1">{{scope.row.limitTime}}</span>
            <span v-if="scope.row.limitType === 2">长期</span>
          </template>
        </el-table-column>
        <el-table-column prop="isReturn" label="是否需要归还">
          <!--是否需要归还（0-不需要归还 1-需要归还）-->
          <template slot-scope="scope">
            <span v-if="scope.row.isReturn === 0">否</span>
            <span v-if="scope.row.isReturn === 1">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <!--状态 0-启用 1-禁用-->
          <template slot-scope="scope">
            <el-tag size="small" v-if="scope.row.status === 0" type="success">启用</el-tag>
            <el-tag size="small" v-if="scope.row.status === 1" type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="编辑" class="remove f14" @click="addMaterialModalShow(scope.row, 'edit')">编辑</a>
            <a href="javascript:void(0);" title="禁用" class="update f14" v-if="scope.row.status === 0" @click="changeMaterialStatus(scope.row, '禁用')">禁用</a>
            <a href="javascript:void(0);" title="取消禁用" class="update f14" v-if="scope.row.status === 1" @click="changeMaterialStatus(scope.row, '取消禁用')">取消禁用</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddMaterialType v-if="addMaterialTypeModal" @addMaterialTypeModalClose="addMaterialTypeModalClose" v-bind:passInfo="passInfo"></AddMaterialType>
    <AddMaterial v-if="addMaterialModal" @addMaterialModalClose="addMaterialModalClose" v-bind:passInfo="passInfo"></AddMaterial>
    <ImportModal v-if="importModal" @importModalClose="importModalClose" v-bind:passInfo="passInfo"></ImportModal>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import AddMaterialType from './pages/addMaterialType.vue';
import AddMaterial from './pages/addMaterial.vue';
import ImportModal from './pages/import.vue';
export default {
  name: 'warehouseManagement',
  components: {
    AddMaterialType,
    AddMaterial,
    ImportModal
  },
  data () {
    return {
      getDataForm: {
        materialTypeId: '',
        materialName: ''
      },
      materialList: [],
      passInfo: {},
      addMaterialTypeModal: false,
      addMaterialModal: false,
      typeList: '',
      importModal: false
    };
  },
  computed: {
    ...mapState([
      'materialTypeList'
    ])
  },
  created () {
    this.getMaterialList();
  },
  methods: {
    // importModalShow
    importModalShow () {
      this.importModal = true;
    },
    importModalClose (sign) {
      this.importModal = false;
    },
    // 导出
    exportMaterial () {
      this.$confirm('是否确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let removeList = [];
        // removeList.push(this.labEquFaultDetail.id);
        // this.importEqu(removeList);
      }).catch(() => {
      });
    },
    // 导出方法
    importEqu (removeList) {
      // let data = {};
      // data['ids'] = removeList;
      // let vm = this;
      // this.$axios({
      //   url: this.$Config.POST_URL + '/api/laboratory/equipment_fault/download',
      //   method: 'get',
      //   headers: {'Authorization': this.getCookieVal('token')},
      //   params: data,
      //   responseType: 'blob'
      // }).then(function (res) {
      //   let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
      //   let url = window.URL.createObjectURL(blob);
      //   let filename = '故障信息';
      //   let link = document.createElement('a');
      //   link.style.display = 'none';
      //   link.href = url;
      //   link.setAttribute('download', filename + '.xls');
      //   document.body.appendChild(link);
      //   link.click();
      //   vm.$message({
      //     message: '导出成功',
      //     type: 'success'
      //   });
      // }).catch(function (error) {
      //   console.log(error);
      // });
    },
    // 下载模板
    download () {
      this.$confirm('是否确认下载模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let vm = this;
        this.$Service.downloadMaterial().then(function (res) {
          if (res.data.data !== undefined) {
            window.location.href = vm.$Config.POST_URL + res.data.data;
          }
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
        });
      }).catch(() => {
      });
    },
    changeMaterialTypeStatus (row) {
      let vm = this;
      let data = {
        id: row.id,
        status: ''
      };
      if (row.status === 0) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      this.$confirm('是否确认操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let vm = this;
        this.$Service.editMaterialType(data).then(function (res) {
          if (res.data.data !== undefined) {
            vm.getMaterialList();
          }
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
        });
      }).catch(() => {
      });
    },
    // 物料启用禁用
    changeMaterialStatus (row, operation) {
      let vm = this;
      let data = {
        id: row.id,
        status: ''
      };
      if (operation === '禁用') {
        data.status = 1;
      } else {
        data.status = 0;
      }
      this.$confirm('是否确认' + operation + '操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let vm = this;
        this.$Service.editMaterial(data).then(function (res) {
          if (res.data.data !== undefined) {
            vm.getMaterialList();
          }
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
        });
      }).catch(() => {
      });
    },
    addMaterialModalShow (item, sign) {
      this.addMaterialModal = true;
      let data;
      if (sign === 'edit') {
        data = {
          data: item,
          sign: sign
        };
        this.passInfo = data;
      } else {
        this.passInfo = item;
      }
    },
    addMaterialModalClose (sign) {
      this.addMaterialModal = false;
      if (sign === 'add' || sign === 'edit') {
        this.getMaterialList();
      }
    },
    // 多选框
    handleSelectionChange (val) {
      console.log(val);
    },
    addMaterialTypeModalShow (item, sign) {
      this.addMaterialTypeModal = true;
      if (sign === 'edit') {
        this.passInfo = item;
      }
    },
    addMaterialTypeModalClose (sign) {
      this.addMaterialTypeModal = false;
      let vm = this;
      if (sign === 'add') {
        this.getMaterialList();
        this.$Service.materialTypeList().then(function (res) {
          if (res.data.data !== undefined) {
            vm.$store.commit('saveMaterialTypeList', res.data.data);
          }
        });
      }
    },
    // 获取列表
    getMaterialList () {
      let vm = this;
      this.$Service.materialList(this.getDataForm).then(function (res) {
        if (res.data.data !== undefined) {
          vm.materialList = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
