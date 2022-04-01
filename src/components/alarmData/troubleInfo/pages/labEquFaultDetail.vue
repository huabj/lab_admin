<template>
  <div class="labEquFaultDetailPage">
    <el-button type="primary" size="small" @click="goTroubleInfo">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="labEquFaultDetail margin-t-20">
      <div class="title">
        <span class="span-l">故障信息</span>
        <div class="button">
          <el-button type="primary" size="small" @click="exportEqu()">导出</el-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <table class="table-list w-100 margin-t-10">
        <tbody>
        <tr>
          <th class="text-c">设备名称</th>
          <td>{{labEquFaultDetail.equipmentName}}</td>
          <th class="text-c">设备IP</th>
          <td>{{labEquFaultDetail.equipmentIp}}</td>
          <th class="text-c">设备位置</th>
          <td>{{labEquFaultDetail.laboratoryAddress}}</td>
        </tr>
        <tr>
          <th class="text-c">报修人</th>
          <td>{{labEquFaultDetail.createUserName}}</td>
          <th class="text-c">报修时间</th>
          <td>{{labEquFaultDetail.createTime}}</td>
          <th class="text-c">处理状态</th>
          <td>
            <el-select v-model="labHandleForm.acceptStatus" placeholder="请选择" @change="submit()" :disabled="labEquFaultDetail.acceptStatusId !== '1'">
              <el-option v-for="item in equHandleStatusList" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th class="text-c">故障状态</th>
          <td colspan="5">
            <el-radio-group v-model="labEquFaultDetail.statusId">
              <el-radio v-for="item in equFaultStatusList" :key="item.id" :label="item.value" :disabled="labEquFaultDetail.statusId !== item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <th class="text-c">初步故障原因分析</th>
          <td colspan="5">
            <el-radio-group v-model="labEquFaultDetail.causeId">
              <el-radio v-for="item in equFaultCauseList" :key="item.id" :label="item.value" :disabled="labEquFaultDetail.causeId !== item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <th class="text-c">请修类别</th>
          <td colspan="5">
            <el-radio-group v-model="labEquFaultDetail.typeId">
              <el-radio v-for="item in equMaintainTypeList" :key="item.id" :label="item.value" :disabled="labEquFaultDetail.typeId !== item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <th class="text-c">备注</th>
          <td colspan="5">{{labEquFaultDetail.remark}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'labEquFaultDetail',
    data () {
      return {
        labEquFaultDetail: {},
        labHandleForm: {
          id: '',
          acceptStatus: ''
        }
      };
    },
    computed: {
    ...mapState([
        'currentMenu',
        'equFaultStatusList',
        'equFaultCauseList',
        'equHandleStatusList',
        'equMaintainTypeList'
      ])
    },
    created () {
      this.labEquFaultDetail = this.currentMenu.row;
      this.labHandleForm.acceptStatus = this.labEquFaultDetail.acceptStatusId;
    },
    methods: {
      submit () {
        this.$confirm('是否确认更改处理状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let vm = this;
          this.labHandleForm.id = this.labEquFaultDetail.id;
          this.$Service.labHandle(this.labHandleForm).then(function (res) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.goTroubleInfo();
          });
        }).catch(() => {
        });
      },
      // 导出操作
      exportEqu () {
        this.$confirm('是否确认导出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let removeList = [];
          removeList.push(this.labEquFaultDetail.id);
          this.importEqu(removeList);
        }).catch(() => {
        });
      },
      // 导出方法
      importEqu (removeList) {
        let data = {};
        data['ids'] = removeList;
        let vm = this;
        this.$axios({
          url: this.$Config.POST_URL + '/api/laboratory/equipment_fault/download',
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          params: data,
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '故障信息';
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
      },
      goTroubleInfo () {
        let currentMenu = {
          component: 'troubleInfo'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
