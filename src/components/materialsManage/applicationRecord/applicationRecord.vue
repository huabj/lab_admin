<template>
  <div class="applicationRecordPage">
    <div class="title">
      <span class="span-l">申请档案</span>
      <div class="button">
<!--        <el-button type="primary" size="small" @click="applicationMaterialsModalShow()">物料申请</el-button>-->
<!--        <el-button type="primary" size="small" @click="batchOperate('delete')">批量删除</el-button>-->
        <el-button type="primary" plain size="small" @click="getLabRecord()">刷新</el-button>
        <el-button type="primary" size="small" @click="batchOperate('export')">导出</el-button>
<!--        <el-input style="margin: 0 0 0 20px;" placeholder="请输入内容" size="small" prefix-icon="el-icon-search"></el-input>-->
<!--        <el-button type="primary" size="small" @click="getLabRecord()">查询</el-button>-->
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
        <el-button type="primary" icon="el-icon-search" class="fl" size="small" style="margin: 5px 0 0 20px;" @click="getLabRecord">查询</el-button>
        <div class="clearfix"></div>
      </el-form>
    </div>
    <div class="margin-t-20">
      <el-table :data="applicationRecordData" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="materialTypeName" label="物料类型"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="applyCount" label="申请数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="createName" label="申请人"></el-table-column>
        <el-table-column prop="receiveTime" label="待领取时间"></el-table-column>
        <el-table-column prop="receiveStatus" label="领取状态">
          <template slot-scope="scope">
            <!--领取状态（1：待领取 2：已领取）-->
            <el-tag size="small" v-if="scope.row.receiveStatus === 1" type="success">待领取</el-tag>
            <el-tag size="small" v-if="scope.row.receiveStatus === 2" type="danger">已领取</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="returnStatus" label="状态">
          <template slot-scope="scope">
            <!--归还状态（1：无<默认> 2：无需归还 3：未领取 4：待归还 5：未归还 6：部分归还 7：全部归还）-->
            <!--<el-tag size="small" v-if="scope.row.returnStatus === 1" type="success">无</el-tag>-->
            <el-tag size="small" v-if="scope.row.returnStatus === 2" type="success">无需归还</el-tag>
            <el-tag size="small" v-if="scope.row.returnStatus === 3" type="danger">未领取</el-tag>
            <el-tag size="small" v-if="scope.row.returnStatus === 4" type="danger">待归还</el-tag>
            <el-tag size="small" v-if="scope.row.returnStatus === 5" type="danger">未归还</el-tag>
            <el-tag size="small" v-if="scope.row.returnStatus === 6" type="danger">部分归还</el-tag>
            <el-tag size="small" v-if="scope.row.returnStatus === 7" type="success">全部归还</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="退回" class="remove f14" @click="batchOperate('back', scope.row)"  v-if="scope.row.receiveStatus === 1">退回</a>
            <a href="javascript:void(0);" title="归还" class="update f14" @click="batchOperate('return', scope.row)" v-if="scope.row.receiveStatus === 2">归还</a>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="80">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="查看" class="export f14" @click="detailModalShow(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
      <!--        <div class="pages">-->
      <!--          <el-pagination @current-change="handleCurrentChange" :current-page.sync="labRecordForm.current" :page-size="labRecordForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
      <!--        </div>-->
      <img src="../../../assets/img/rt.png" class="triangle">
    </div>
    <ApplicationMaterials v-if="applicationMaterialsModal" @applicationMaterialsModalClose="applicationMaterialsModalClose" v-bind:passInfo="passInfo"></ApplicationMaterials>
    <DetailModal v-if="detailModal" @detailModalClose="detailModalClose" v-bind:passInfo="passInfo"></DetailModal>
  </div>
</template>

<script>
  import ApplicationMaterials from './pages/applicationMaterials.vue';
  import DetailModal from './pages/detailModal.vue';
  import {mapState} from 'vuex';
  export default {
    name: 'applicationRecord',
    components: {
      ApplicationMaterials,
      DetailModal
    },
    data () {
      return {
        getDataForm: {
          materialTypeId: '',
          materialName: ''
        },
        totalPages: 1,
        applicationRecordData: [],
        batchList: [],
        applicationMaterialsModal: false,
        detailModal: false,
        passInfo: {}
      };
    },
    computed: {
      ...mapState([
        'materialTypeList'
      ])
    },
    created () {
      this.getLabRecord();
    },
    methods: {
      detailModalShow (row) {
        this.detailModal = true;
        this.passInfo = row;
      },
      detailModalClose () {
        this.detailModal = false;
        this.passInfo = {};
      },
      getLabRecord () {
        let vm = this;
        this.$Service.materialInventoryApplyList(this.getDataForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.applicationRecordData = res.data.data;
          }
        });
      },
      applicationMaterialsModalShow () {
        this.applicationMaterialsModal = true;
      },
      applicationMaterialsModalClose (sign) {
        this.applicationMaterialsModal = false;
        if (sign === 'add') {
          this.getLabRecord();
        }
      },
      batchOperate (sign, row) {
        console.log(sign, row);
        if (sign === 'back') {
          this.$confirm('是否确认退回吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let vm = this;
            let form = {
              materialInventoryApplyId: row.id
            };
            this.$Service.materialInventoryReturn(form).then(function (res) {
              if (res.data.data !== undefined) {
                vm.$message({
                  message: '操作成功',
                  type: 'success'
                });
                vm.getLabRecord();
              }
            });
          }).catch(() => {
          });
        } else if (sign === 'return') {
          this.passInfo = row;
          this.applicationMaterialsModalShow();
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
      handleSelectionChange (val) {
        this.batchList = val;
      },
      // 导出方法
      export (batchList) {
        let data = {};
        data['ids'] = batchList;
        let vm = this;
        this.$axios({
          url: this.$Config.POST_URL + '/api/materialInventoryApply/downloadMaterialInventoryApplyData',
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          params: data,
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '申请档案';
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
