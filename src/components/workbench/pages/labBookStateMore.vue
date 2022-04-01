<template>
  <div class="labBookStateMorePage">
    <div class="modal-bg">
      <div class="modal" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder fl">实训室预约情况</span>
          <div class="selected fl margin-l-20">
            <el-select v-model="getMySubscribeForm.queryDateType" placeholder="请选择" size="mini" @change="getMySubscribe()">
              <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="clearfix"></div>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <div class="info-list">
            <p v-if="mySubscribeList.length <= 0">暂无数据...</p>
            <ul v-else v-for="(item, index) in mySubscribeList" :key="item.id">
              <li>
                <div class="info-list-l"></div>
                <div class="info-list-r">
                  <h2><span class="blueCircle blue-bg"></span>{{index}}</h2>
                </div>
              </li>
              <li v-for="(ite, ind) in item" :key="ite.id">
                <div class="info-list-l"></div>
                <div class="info-list-r">
                  <p>
                    <span class="blueCircle top-8" :class="{'blue-bg': ind === 0}"></span>您好，您申请的
                    <span class="color-blue margin-lr-5">{{ite.laboratoryName}}</span>已经提交成功，
                    <span class="color-blue">时间段为：{{ite.subscribeTime}}&nbsp;&nbsp;{{ite.startTime}}-{{ite.endTime}}</span>，
                    <!--              状态，1-待审批，2-成功，3-失败，4-取消，默认传1-->
                    <span class="color-blue" v-if="ite.status === 1">待审批</span>
                    <span class="color-green" v-if="ite.status === 2">已同意</span>
                    <span class="color-red" v-if="ite.status === 3">已拒绝</span>
                    <span class="color-green" v-if="ite.status === 4">已自动审批</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-foot">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'labBookStateMore',
    data () {
      return {
        getMySubscribeForm: {
          queryDateType: 1
        },
        mySubscribeList: []
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'queryDateTypeList'
      ])
    },
    props: [
      'passInfo'
    ],
    created () {
      this.getMySubscribe();
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
      // 获取列表
      getMySubscribe () {
        let vm = this;
        this.$Service.subscribeWork(this.getMySubscribeForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.mySubscribeList = res.data.data;
            for (let key in res.data.data) {
              for (let i = 0; i < res.data.data[key].length; i++) {
                let temp = res.data.data[key][i].subscribeTime.split('-');
                let data = temp[0] + temp[1] + temp[2];
                let temp2 = res.data.data[key][i].startTime.split(':');
                let time = temp2[0] + temp2[1] + '00';
                let dataTime = data + time;
                if (vm.currentDate > dataTime && res.data.data[key][i].status === 1) {
                  res.data.data[key][i].status = 4;
                }
              }
            }
          }
        });
      },
      cancelModal (sign) {
        this.$emit('labBookStateMoreClose', sign);
      }
    }
  };
</script>
