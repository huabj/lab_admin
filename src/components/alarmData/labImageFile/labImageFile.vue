<template>
  <div class="labImageFilePage">
    <div class="title">
      <span class="span-l">实训室影像档案</span>
      <div class="button">
        <el-button type="primary" size="small" @click="batchOperate('delete')">批量删除</el-button>
        <el-button type="primary" size="small" @click="batchOperate('export')">批量导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="margin-t-20">
      <el-table :data="labVideoList.records" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="档案编号"></el-table-column>
        <el-table-column prop="laboratoryName" label="实训室"></el-table-column>
        <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column prop="cameraNumber" label="监控编号"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="建档日期"></el-table-column>
        <el-table-column prop="icon" label="影像档案">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="查看" class="export f14" @click="goLabImageFileDetail(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="导出" class="export f14" @click="batchOperate('export', scope.row)">导出</a>
            <a href="javascript:void(0);" title="删除" class="delete f14" @click="batchOperate('delete', scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="labVideoForm.current" :page-size="labVideoForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>
      </div>
    </div>
    <img src="../../../assets/img/rt.png" class="triangle">
  </div>
</template>

<script>
  export default {
    name: 'labImageFile',
    data () {
      return {
        labVideoForm: {
          current: 0,
          size: 10
        },
        totalPages: 1,
        labVideoList: {
          current: '',
          orders: [],
          pages: '',
          records: [],
          searchCount: true,
          size: '',
          total: ''
        },
        batchList: []
      };
    },
    created () {
      this.getLabVideoList();
    },
    methods: {
      goLabImageFileDetail (row) {
        let currentMenu = {
          component: 'labImageFileDetail',
          row: row
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      // 列表分页
      handleCurrentChange (val) {
        this.labVideoForm.current = parseInt(`${val}`);
        this.getLabVideoList();
      },
      // 获取列表
      getLabVideoList () {
        let vm = this;
        this.$Service.labVideo(this.labVideoForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.labVideoList = res.data.data;
            vm.totalPages = vm.labVideoList.total;
          }
        });
      },
      // 多选框
      handleSelectionChange (val) {
        this.batchList = val;
      },
      // 删除操作
      remove (batchList) {
        let vm = this;
        this.$Service.deleteVideo(batchList).then(function (res) {
          vm.$message({
            message: '删除成功',
            type: 'success'
          });
          vm.getLabVideoList();
        });
      },
      batchOperate (sign, row) {
        if (sign === 'delete') {
          if (row === undefined) {
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
          } else {
            this.$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let batchList = [];
              batchList.push(row.id);
              this.remove(batchList);
            }).catch(() => {
            });
          }
        } else if (sign === 'export') {
          if (row === undefined) {
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
          } else {
            this.$confirm('是否确认导出?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let batchList = [];
              batchList.push(row.id);
              this.export(batchList);
            }).catch(() => {
            });
          }
        }
      },
      // 导出方法
      export (batchList) {
        let data = {};
        data['ids'] = batchList;
        let vm = this;
        this.$axios({
          url: this.$Config.POST_URL + '/api/laboratory/video/download',
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          params: data,
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '实训室影像档案';
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
