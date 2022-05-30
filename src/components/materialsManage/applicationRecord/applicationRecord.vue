<template>
  <div class="applicationRecordPage">
    <div class="title">
      <span class="span-l">申请档案</span>
      <div class="button flex">
        <el-button type="primary" size="small" @click="applicationMaterialsModalShow()">物料申请</el-button>
        <el-button type="primary" size="small" @click="batchOperate('delete')">批量删除</el-button>
        <el-button type="primary" size="small" @click="batchOperate('export')">批量导出</el-button>
        <el-input style="margin: 0 0 0 20px;" placeholder="请输入内容" size="small" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" size="small" @click="getLabRecord()">查询</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="margin-t-20">
      <el-table :data="applicationRecordData.records" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="laboratoryName" label="物料名称"></el-table-column>
        <el-table-column prop="clientMacAddress" label="类别"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="createUsername" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="申请日期"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="删除" class="delete f14" @click="batchOperate('delete', scope.row)">删除</a>
          </template>
        </el-table-column>
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
  export default {
    name: 'applicationRecord',
    components: {
      ApplicationMaterials
    },
    data () {
      return {
        applicationRecordForm: {
          laboratoryName: '',
          current: 0,
          size: 10
        },
        totalPages: 1,
        applicationRecordData: {
          current: '',
          orders: [],
          pages: '',
          records: [
            {
              laboratoryName: '粉笔',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 11:04:16'
            },
            {
              laboratoryName: '三角尺',
              num: '1',
              clientMacAddress: '教具',
              createUsername: '王夫国',
              createTime: '2021-08-15 10:04:16'
            },
            {
              laboratoryName: '键盘',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 10:01:21'
            },
            {
              laboratoryName: '鼠标',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 15:01:08'
            },
            {
              laboratoryName: '零件',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 14:20:28'
            },
            {
              laboratoryName: '粉笔',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '王夫国',
              createTime: '2021-08-14 13:30:44'
            },
            {
              laboratoryName: '三角尺',
              num: '1',
              clientMacAddress: '教具',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 12:50:34'
            },
            {
              laboratoryName: '键盘',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '王夫国',
              createTime: '2021-08-14 11:22:58'
            },
            {
              laboratoryName: '粉笔',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 11:04:16'
            },
            {
              laboratoryName: '三角尺',
              num: '1',
              clientMacAddress: '教具',
              createUsername: '王夫国',
              createTime: '2021-08-15 10:04:16'
            },
            {
              laboratoryName: '键盘',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 10:01:21'
            },
            {
              laboratoryName: '鼠标',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 15:01:08'
            },
            {
              laboratoryName: '零件',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 14:20:28'
            },
            {
              laboratoryName: '粉笔',
              num: '1',
              clientMacAddress: '消耗品',
              createUsername: '王夫国',
              createTime: '2021-08-14 13:30:44'
            },
            {
              laboratoryName: '三角尺',
              num: '1',
              clientMacAddress: '教具',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 12:50:34'
            },
            {
              laboratoryName: '键盘',
              num: '1',
              clientMacAddress: '电子产品',
              createUsername: '王夫国',
              createTime: '2021-08-14 11:22:58'
            }
          ],
          searchCount: true,
          size: '',
          total: ''
        },
        batchList: [],
        applicationMaterialsModal: false
      };
    },
    created () {
    },
    methods: {
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
