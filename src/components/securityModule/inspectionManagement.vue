<template>
    <div class="inspectionManagementPage">
      <div class="title">
        <span class="span-l">巡检单管理</span>
        <div class="button flex">
          <el-button type="primary" size="small" @click="batchOperate('delete')">批量删除</el-button>
          <el-button type="primary" size="small" @click="batchOperate('export')">批量导出</el-button>
          <el-input style="margin: 0 0 0 20px;" placeholder="请输入内容" size="small" prefix-icon="el-icon-search"></el-input>
          <el-button type="primary" size="small" @click="getLabRecord()">查询</el-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="margin-t-20">
        <el-table :data="inspectionManagementData.records" class="w-100" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="laboratoryName" label="巡检名称"></el-table-column>
          <el-table-column prop="checkingPeople" label="创建人"></el-table-column>
          <el-table-column prop="createUsername" label="巡检人"></el-table-column>
          <el-table-column prop="createTime" label="建档日期"></el-table-column>
          <el-table-column prop="icon" label="档案详情">
            <template slot-scope="scope">
              <a href="javascript:void(0);" title="查看" class="export f14" @click="goInspectionDetail(scope.row)">查看</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="140">
            <template slot-scope="scope">
              <a href="javascript:void(0);" title="编辑" class="export f14" @click="goCreateInspection()">编辑</a>
              <a href="javascript:void(0);" title="删除" class="delete f14" @click="batchOperate('delete', scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="pages">-->
<!--          <el-pagination @current-change="handleCurrentChange" :current-page.sync="labRecordForm.current" :page-size="labRecordForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
<!--        </div>-->
        <img src="../../assets/img/rt.png" class="triangle">
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'inspectionManagement',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    data () {
      return {
        inspectionManagementForm: {
          laboratoryName: '',
          current: 0,
          size: 10
        },
        totalPages: 1,
        inspectionManagementData: {
          current: '',
          orders: [],
          pages: '',
          records: [
            {
              laboratoryName: 'C001巡检',
              checkingPeople: '管理员',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 11:04:16'
            },
            {
              laboratoryName: 'C002巡检',
              checkingPeople: '管理员',
              clientMacAddress: '教具',
              createUsername: '王夫国',
              createTime: '2021-08-15 10:04:16'
            },
            {
              laboratoryName: 'C003巡检',
              clientMacAddress: '电子产品',
              checkingPeople: '管理员',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 10:01:21'
            },
            {
              laboratoryName: 'C004巡检',
              clientMacAddress: '电子产品',
              checkingPeople: '管理员',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 15:01:08'
            },
            {
              laboratoryName: 'C005巡检',
              clientMacAddress: '消耗品',
              checkingPeople: '管理员',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 14:20:28'
            },
            {
              laboratoryName: 'C006巡检',
              checkingPeople: '管理员',
              clientMacAddress: '消耗品',
              createUsername: '王夫国',
              createTime: '2021-08-14 13:30:44'
            },
            {
              laboratoryName: 'C007巡检',
              checkingPeople: '管理员',
              clientMacAddress: '教具',
              createUsername: '蔡杏元',
              createTime: '2021-08-14 12:50:34'
            },
            {
              laboratoryName: 'C008巡检',
              checkingPeople: '管理员',
              clientMacAddress: '电子产品',
              createUsername: '王夫国',
              createTime: '2021-08-14 11:22:58'
            },
            {
              laboratoryName: 'C009巡检',
              checkingPeople: '管理员',
              clientMacAddress: '消耗品',
              createUsername: '蔡杏元',
              createTime: '2021-08-15 11:04:16'
            },
            {
              laboratoryName: 'C010巡检',
              checkingPeople: '管理员',
              clientMacAddress: '教具',
              createUsername: '王夫国',
              createTime: '2021-08-15 10:04:16'
            }
          ],
          searchCount: true,
          size: '',
          total: ''
        },
        batchList: []
      };
    },
    created () {
    },
    methods: {
      goInspectionDetail () {
        let currentMenu = {
          component: 'inspectionDetail'
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      goCreateInspection () {
        // let currentMenu = {
        //   component: 'createInspection'
        // };
        // this.$store.commit('changeUrl', currentMenu);
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
