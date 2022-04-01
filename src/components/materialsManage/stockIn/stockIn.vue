<template>
  <div class="stockInPage">
    <div class="title">
      <span class="span-l">入库单</span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="getSuppliesData()">刷新</el-button>
        <el-button type="primary" plain size="small" @click="batchOperate('delete')">删除</el-button>
        <el-button type="primary" plain size="small" @click="batchOperate('export')">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="search margin-t-10">
      <el-form label-width="80px" :model="getSuppliesDataForm">
        <el-form-item label="物料类型" class="fl w-15" prop="type">
          <el-select v-model="getSuppliesDataForm.type" size="small" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="消耗品" :value="1"></el-option>
            <el-option label="非消耗品" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" class="fl w-30" prop="name">
          <el-input placeholder="请输入名称" size="small" v-model="getSuppliesDataForm.name"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" class="fl" size="small" style="margin: 5px 0 0 20px;" @click="getSuppliesData">查询</el-button>
        <div class="clearfix"></div>
      </el-form>
    </div>
    <div class="margin-t-20">
      <el-table :data="suppliesData.records" ref="multipleTable" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="typeName" label="物料类型"></el-table-column>
        <el-table-column prop="storageNumber" label="仓库编号"></el-table-column>
        <el-table-column prop="warehouseNumber" label="货架编号"></el-table-column>
        <el-table-column prop="number" label="物料编号"></el-table-column>
        <el-table-column prop="name" label="物料名称"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="unitName" label="单位"></el-table-column>
        <el-table-column label="有效期" width="290">
          <template slot-scope="scope">{{scope.row.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{scope.row.endTime}}</template>
        </el-table-column>
        <el-table-column prop="safeTypeName" label="安全系数"></el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="getSuppliesDataForm.current" :page-size="getSuppliesDataForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stockIn',
    data () {
      return {
        getSuppliesDataForm: {
          type: '',
          name: '',
          status: 1,
          current: 0,
          size: 10
        },
        totalPages: 1,
        suppliesData: {
          current: 1,
          orders: [],
          pages: 1,
          records: [],
          searchCount: true,
          size: 10,
          total: 3
        },
        batchList: []
      };
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
        this.$Service.supplies(this.getSuppliesDataForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.suppliesData = res.data.data;
            vm.totalPages = vm.suppliesData.total;
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
        let data = {};
        data['ids'] = batchList;
        let vm = this;
        this.$axios({
          url: this.$Config.POST_URL + '/api/supplies/download',
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          params: data,
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '物料信息';
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
