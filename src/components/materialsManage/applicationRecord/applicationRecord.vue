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
        <el-table-column prop="receiveStatus" label="领取状态"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="删除" class="delete f14" @click="batchOperate('delete', scope.row)">删除</a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="详情"></el-table-column>
      </el-table>
      <!--        <div class="pages">-->
      <!--          <el-pagination @current-change="handleCurrentChange" :current-page.sync="labRecordForm.current" :page-size="labRecordForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
      <!--        </div>-->
      <img src="../../../assets/img/rt.png" class="triangle">
    </div>
    <ApplicationMaterials v-if="applicationMaterialsModal" @applicationMaterialsModalClose="applicationMaterialsModalClose"></ApplicationMaterials>
  </div>
</template>

<script>
  import ApplicationMaterials from './pages/applicationMaterials.vue';
  import {mapState} from 'vuex';
  export default {
    name: 'applicationRecord',
    components: {
      ApplicationMaterials
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
        applicationMaterialsModal: false
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
      applicationMaterialsModalClose () {
        this.applicationMaterialsModal = false;
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
            }).catch(() => {
            });
          }
        } else if (sign === 'export') {
          this.$confirm('是否确认导出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.href = this.$Config.POST_URL + '/file/安全模块档案.xlsx';
            this.$message({
              message: '导出成功',
              type: 'success'
            });
          }).catch(() => {
          });
        }
      },
      handleSelectionChange (val) {
        this.batchList = val;
      }
    }
  };
</script>
