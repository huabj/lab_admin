<template>
  <div class="bookingManagementPage">
    <img src="../../assets/img/rt.png" class="triangle">
    <img src="../../assets/img/lb.png" class="triangle2">
    <div class="title">
      <span class="span-l">预约实训室</span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="selectModule('subscribeLab')">下载模板</el-button>
        <el-button type="primary" plain size="small" @click="selectModule('batchProcess')">批量排课</el-button>
        <el-button type="primary" plain size="small" @click="selectModule('myReservation')" v-if="module === 'subscribeLab'">我的预约</el-button>
        <el-button type="primary" plain size="small" @click="selectModule('book')" v-if="module === 'myReservation'">预约实训室</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <component v-bind:is="module" ref="child"></component>
    <BatchProcess v-if="batchProcessModal" @batchProcessModalClose="batchProcessModalClose" v-bind:passInfo="passInfo"></BatchProcess>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import MyReservation from './pages/myReservation.vue';
  import SubscribeLab from './pages/subscribeLab.vue';
  import BatchProcess from './pages/batchProcess.vue';
  export default {
    name: 'bookingManagement',
    data () {
      return {
        module: 'subscribeLab',
        batchProcessModal: false,
        passInfo: {}
      };
    },
    components: {
      MyReservation,
      SubscribeLab,
      BatchProcess
    },
    created () {
    },
    methods: {
      selectModule (sign) {
        switch (sign) {
          case 'myReservation':
            this.module = sign;
            break;
          case 'subscribeLab':
            this.download();
            break;
          case 'batchProcess':
            this.batchProcessModalShow();
            break;
          case 'book':
            this.module = 'subscribeLab';
            break;
        }
      },
      download () {
        this.$confirm('是否确认下载模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let vm = this;
          this.$Service.subscribeDownload().then(function (res) {
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
      batchProcessModalShow () {
        this.batchProcessModal = true;
      },
      batchProcessModalClose (sign) {
        this.batchProcessModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.$refs.child.getSubscribe();
        }
      }
    }
  };
</script>
