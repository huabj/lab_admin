<template>
  <div class="authManagePage">
    <div class="title">
      <span class="span-l">管理授权日记</span>
      <div class="button color-gray">共计<span class="margin-lr-5">{{authorizationData.total}}</span>条消息</div>
      <div class="clearfix"></div>
    </div>
    <div class="search margin-t-20">
      <el-select v-model="authorizationForm.queryDateType" placeholder="请选择" size="mini" @change="getAuthorization()">
        <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="currentState margin-t-20">
        <span>当前状态</span>
        <span v-for="(item, index) in currentStateList" :key="item.id" :class="{'active': currentIndex === index}" @click="selectState(item, index)">{{item.label}}</span>
        <span class="flex-1"></span>
<!--        <span class="color-blue">排序<i class="el-icon-sort margin-l-5 f16"></i></span>-->
      </div>
    </div>
    <div class="margin-t-20">
      <el-table :data="authorizationData.records" class="w-100">
        <el-table-column prop="laboratoryName" label="实训室名称"></el-table-column>
        <el-table-column prop="floorAddressName" label="实训室位置"></el-table-column>
        <el-table-column prop="laboratoryPeopleLimitName" label="实训室容量"></el-table-column>
        <el-table-column prop="subscribeTeacherName" label="预约上课老师"></el-table-column>
        <el-table-column prop="subscribeTime" label="申请课时" width="200">
          <template slot-scope="scope">{{scope.row.subscribeTime}}&nbsp;&nbsp;{{scope.row.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{scope.row.endTime}}</template>
        </el-table-column>
        <el-table-column prop="status" label="审批结果">
          <template slot-scope="scope">
<!--            状态：1-待处理，2-同意，3-拒绝-->
            <el-tag size="small" v-if="scope.row.status === 1">待审批</el-tag>
            <el-tag size="small" v-if="scope.row.status === 2" type="success">已同意</el-tag>
            <el-tag size="small" v-if="scope.row.status === 3" type="danger">已拒绝</el-tag>
            <el-tag size="small" v-if="scope.row.status === 4" type="success">已自动审批</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="130" v-if="authorizationForm.status !== 3">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="强制拒绝" class="delete f14" v-if="scope.row.status === 2" @click="refuseModalModalShow(scope.row)">强制拒绝</a>
            <a href="javascript:void(0);" title="同意" class="export f14" v-if="scope.row.status === 1" @click="approval(scope.row)">同意</a>
            <a href="javascript:void(0);" title="拒绝" class="delete f14" v-if="scope.row.status === 1" @click="refuseModalModalShow(scope.row)">拒绝</a>
          </template>
        </el-table-column>
        <el-table-column label="拒绝理由" prop="acceptMessage" v-else>
          <template slot-scope="scope"><span class="color-orange">{{scope.row.acceptMessage}}</span></template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="authorizationForm.current" :page-size="authorizationForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>
      </div>
      <Refuse v-if="refuseModal" @refuseModalModalClose="refuseModalModalClose" v-bind:passInfo="passInfo"></Refuse>
    </div>
    <img src="../../assets/img/rt.png" class="triangle">
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Refuse from './pages/refuse.vue';
  export default {
    name: 'authManage',
    components: {
      Refuse
    },
    data () {
      return {
        currentIndex: 0,
        authorizationForm: {
          queryDateType: 1,
          status: '',
          current: 0,
          size: 10
        },
        // 状态，1-待处理，2-同意，3-拒绝
        currentStateList: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '待审批',
            value: 1
          },
          {
            label: '已同意',
            value: 2
          },
          {
            label: '已拒绝',
            value: 3
          }
        ],
        totalPages: 1,
        authorizationData: {
          current: '',
          orders: [],
          pages: '',
          records: [
            {
              acceptMessage: '',
              endTime: '09:50',
              equipmentNum: '25',
              equipmentTypeName: '电脑投影仪',
              floorAddressName: '教学楼地址',
              id: '1422366929762521089',
              laboratoryId: '1422032077083250688',
              laboratoryName: 'LZR_TEST',
              laboratoryPeopleLimitName: '20-30人',
              startTime: '09:10',
              status: 1,
              subscribeTeacherName: '管理员',
              subscribeTime: '2021-08-03'
            }
          ],
          searchCount: true,
          size: '',
          total: ''
        },
        subscribeForm: {
          id: '',
          laboratoryId: '',
          courseTimeId: '',
          acceptUserId: '',
          acceptMessage: '',
          status: ''
        },
        passInfo: {},
        refuseModal: false,
        currentDate: ''
      };
    },
    computed: {
      ...mapState([
        'queryDateTypeList'
      ])
    },
    created () {
      this.getAuthorization();
      this.getCurrentTime();
    },
    methods: {
      // 获取当前时间
      getCurrentTime () {
        let _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        if (mm >= 1 && mm <= 9) {
          mm = '0' + mm;
        }
        if (dd >= 0 && dd <= 9) {
          dd = '0' + dd;
        }
        let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        _this.currentDate = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss;
      },
      // 列表分页
      handleCurrentChange (val) {
        this.authorizationForm.current = parseInt(`${val}`);
        this.getAuthorization();
      },
      // 获取列表
      getAuthorization () {
        let vm = this;
        this.$Service.authorization(this.authorizationForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.authorizationData = res.data.data;
            vm.totalPages = vm.authorizationData.total;
            for (let i = 0; i < vm.authorizationData.records.length; i++) {
              let temp = vm.authorizationData.records[i].subscribeTime.split('-');
              let data = temp[0] + temp[1] + temp[2];
              let temp2 = vm.authorizationData.records[i].startTime.split(':');
              let time = temp2[0] + temp2[1] + '00';
              let dataTime = data + time;
              // console.log('---currentDate----');
              // console.log(vm.currentDate);
              // console.log('---dataTime----');
              // console.log(dataTime);
              if (vm.currentDate > dataTime && vm.authorizationData.records[i].status === 1) {
                vm.authorizationData.records[i].status = 4;
              }
            }
          }
        });
      },
      selectState (item, index) {
        this.authorizationForm.status = item.value;
        this.authorizationForm.current = 0;
        this.authorizationForm.size = 10;
        this.currentIndex = index;
        this.getAuthorization();
      },
      approval (row) {
        this.$confirm('是否确认同意?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let vm = this;
          this.subscribeForm.id = row.id;
          this.subscribeForm.status = 2;
          this.subscribeForm.laboratoryId = row.laboratoryId;
          this.$Service.updateSubscribe(this.subscribeForm).then(function (res) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.getAuthorization();
          });
        }).catch(() => {
        });
      },
      refuseModalModalShow (row) {
        this.refuseModal = true;
        this.passInfo = row;
      },
      refuseModalModalClose (sign) {
        this.refuseModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.getAuthorization();
        }
      }
    }
  };
</script>
