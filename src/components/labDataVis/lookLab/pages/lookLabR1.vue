<template>
  <div class="lookLabR1Page">
    <div class="title">
      <span class="span-l">故障信息</span>
      <div class="button flex">
        <span class="button-span margin-r-10" :class="{'active': form.dateType === 1}" @click="changeActive(1)">月</span>
        <span class="button-span margin-r-20" :class="{'active': form.dateType === 2}" @click="changeActive(2)">年</span>
<!--        <el-button type="primary" size="mini">查看详细</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="lookLabR1 w-100" :style="{'height': (screenHeight / 2 - 248) + 'px'}">
      <ul>
        <li v-for="item in laboratoryList" :key="item.id">
          <h2>
            <span>{{item.createTime}}</span>
            <span>{{item.createTimeStr}}</span>
          </h2>
          <p>{{item.equipmentName}}&nbsp;&nbsp;出现故障</p>
        </li>
        <p v-if="laboratoryList.length <= 0">暂无数据...</p>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'lookLabR1',
    data () {
      return {
        laboratoryList: [],
        form: {
          laboratoryId: '',
          // 1:月 2：年
          dateType: 1
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    props: [
      'passInfo'
    ],
    created () {
    },
    methods: {
      changeActive (index) {
        this.form.dateType = index;
        this.getInitDataR1();
      },
      getInitDataR1 () {
        let vm = this;
        this.form.laboratoryId = this.passInfo;
        this.$Service.laboratoryEquipmentFaultStatistics(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.laboratoryList = res.data.data;
          }
        });
      }
    }
  };
</script>
