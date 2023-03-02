<template>
  <div class="stockInPage">
    <div class="title">
      <span class="span-l">入库统计</span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="getSuppliesData()">刷新</el-button>
<!--        <el-button type="primary" plain size="small" @click="batchOperate('delete')">删除</el-button>-->
        <el-button type="primary" plain size="small" @click="batchOperate('export')">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="search margin-t-10">
      <el-form label-width="80px" :model="getSuppliesDataForm">
        <el-form-item label="物料类型" class="fl" prop="materialTypeId">
          <el-select v-model="getSuppliesDataForm.materialTypeId" size="small" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in materialTypeList" :key="item.id" :label="item.materialTypeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料名称" class="fl" prop="materialName">
          <el-input placeholder="请输入物料名称" size="small" v-model="getSuppliesDataForm.materialName"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" class="fl" size="small" style="margin: 5px 0 0 20px;" @click="getSuppliesData">查询</el-button>
        <div class="clearfix"></div>
      </el-form>
    </div>
    <div class="margin-t-20">
      <el-table :data="suppliesData" ref="multipleTable" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="materialTypeName" label="物料类型"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="wareHouseNumber" label="仓库编号"></el-table-column>
        <el-table-column prop="shelvesNumber" label="货架编号"></el-table-column>
        <el-table-column prop="inputCount" label="入库数"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="createName" label="操作人员"></el-table-column>
        <el-table-column prop="limitType" label="有效期限">
          <!--有效期类型（1：限期 2：长期-->
          <template slot-scope="scope">
            <span v-if="scope.row.limitType === 1">{{scope.row.limitTime}}</span>
            <span v-if="scope.row.limitType === 2">长期</span>
          </template>
        </el-table-column>
        <el-table-column prop="safeTypeName" label="入库性质"></el-table-column>
        <el-table-column prop="createTime" label="入库时间"></el-table-column>
      </el-table>
<!--      <div class="pages">-->
<!--        <el-pagination @current-change="handleCurrentChange" :current-page.sync="getSuppliesDataForm.current" :page-size="getSuppliesDataForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    name: 'stockIn',
    data () {
      return {
        getSuppliesDataForm: {
          materialTypeId: '',
          materialName: ''
        },
        suppliesData: [],
        batchList: []
      };
    },
    computed: {
      ...mapState([
        'materialTypeList'
      ])
    },
    created () {
      this.getSuppliesData();
    },
    methods: {
      // 列表分页
      handleCurrentChange (val) {
        this.getSuppliesDataForm.current = parseInt(`${val}`);
        this.getSuppliesData();
      },
      // 获取列表
      getSuppliesData () {
        let vm = this;
        this.$Service.materialInventoryInputList(this.getSuppliesDataForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.suppliesData = res.data.data;
          }
        });
      },
      // 多选框
      handleSelectionChange (val) {
        this.batchList = val;
      },
      batchOperate (sign) {
        if (sign === 'delete') {
          if (this.batchList.length <= 0) {
            this.$alert('请选择您要删除的数据！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else {
            this.$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let batchList = [];
              for (let i = 0; i < this.batchList.length; i++) {
                batchList.push(this.batchList[i].id);
              }
              this.remove(batchList);
            }).catch(() => {
            });
          }
        } else if (sign === 'export') {
          if (this.batchList.length <= 0) {
            this.$alert('请选择您要导出的数据！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else {
            this.$confirm('是否确认导出?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let batchList = [];
              for (let i = 0; i < this.batchList.length; i++) {
                batchList.push(this.batchList[i].id);
              }
              this.export(batchList);
            }).catch(() => {
            });
          }
        }
      },
      // 删除操作
      remove (batchList) {
        let vm = this;
        this.$Service.deleteSupplies(batchList).then(function (res) {
          vm.$message({
            message: '删除成功',
            type: 'success'
          });
          vm.getSuppliesData();
        });
      },
      // 导出方法
      export (batchList) {
        let vm = this;
        this.$axios({
          url: this.$Config.POST_URL + '/api/materialInventoryInput/downloadMaterialInventoryInputData',
          method: 'post',
          headers: {'Authorization': this.getCookieVal('token')},
          data: batchList,
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '入库统计信息';
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', filename + '.xls');
          document.body.appendChild(link);
          link.click();
          vm.$message({
            message: '导出成功',
            type: 'success'
          });
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  };
</script>
