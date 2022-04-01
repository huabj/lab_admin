<template>
  <div class="infoStatisticsPage">
    <div class="title">
      <span class="span-l">信息统计</span>
      <div class="date">
        <el-date-picker v-model="form.currentDate" type="month" placeholder="选择日期" size="mini" format="yyyy/MM" value-format="yyyy/MM" @change="getData"></el-date-picker>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="infoStatistics-1">
      <ul>
        <li>
          <h2 class="color-green">{{data[0].totalTime}}H</h2>
          <p>上课总时长</p>
        </li>
<!--        <li>-->
<!--          <h2 class="color-blue">{{data.attendance}}</h2>-->
<!--          <p>出勤总天数</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <h2 class="color-red">{{data.late}}</h2>-->
<!--          <p>迟到次数</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <h2 class="color-orange">{{data.early}}</h2>-->
<!--          <p>早退次数</p>-->
<!--        </li>-->
      </ul>
    </div>
    <div class="infoStatistics-2">
      <ul>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul>
        <li v-for="item in data" :key="item.id"
            :class="{'margin-l-55': item.data.substring(item.data.length - 2) === '01' && item.week === 1,
            'margin-l-110': item.data.substring(item.data.length - 2) === '01' && item.week === 2,
            'margin-l-165': item.data.substring(item.data.length - 2) === '01' && item.week === 3,
            'margin-l-220': item.data.substring(item.data.length - 2) === '01' && item.week === 4,
            'margin-l-275': item.data.substring(item.data.length - 2) === '01' && item.week === 5,
            'margin-l-330': item.data.substring(item.data.length - 2) === '01' && item.week === 6}">
          <h2>{{item.data.substring(item.data.length - 2)}}</h2>
          <p class="color-white" v-if="item.state === 0">●</p>
          <p class="color-green" v-if="item.state === 1">●</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'infoStatistics',
    data () {
      return {
        form: {
          currentDate: ''
        },
        data: [
          {
            data: '2021-01-01',
            state: 0,
            totalTime: 0,
            week: 4
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
      this.getCurrentTime();
    },
    methods: {
      // 获取当前时间
      getCurrentTime () {
        let aData = new Date();
        this.form.currentDate = aData.getFullYear() + '/' + (aData.getMonth() + 1);
        this.getData();
      },
      getData () {
        let vm = this;
        this.form.currentDate = this.form.currentDate + '/1';
        this.$Service.subscribeByTime(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.data = res.data.data;
          }
        });
      }
    }
  };
</script>
