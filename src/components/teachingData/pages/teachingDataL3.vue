<template>
  <div class="teachingDataL3Page">
    <div class="title" v-if="currentMenu.component === 'teachingData'">
      <span class="span-l">物料申请统计</span>
      <div class="clearfix"></div>
      <div class="info">
        <span class="span-1"></span>
        <span class="margin-r-10">前三名</span>
        <span class="span-2"></span>
        <span>后七名</span>
      </div>
    </div>
    <div class="w-100 teachingDataL3" id="teachingDataL3" :style="{'height': (screenHeight / 2 - 260) + 'px'}"></div>
    <div class="text" v-if="currentMenu.component === 'teachingData'">
      <span class="span">老师物料申请前10名</span>
<!--      <el-button type="primary" size="mini" @click="goDetail('teachingDataL3')">查看详细</el-button>-->
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../assets/js/theme.js';
  export default {
    name: 'teachingDataL3',
    data () {
      return {
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    mounted () {
      this.getSuppliesAllData();
    },
    methods: {
      // 获取列表
      getSuppliesAllData () {
        let vm = this;
        this.$Service.suppliesAllData().then(function (res) {
          if (res.data.data !== undefined) {
            vm.getInitData(res.data.data);
          }
        });
      },
      goDetail (sign) {
        let currentMenu = {
          component: 'teachingDataDetail',
          sign: sign
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      getInitData (data) {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('teachingDataL3'), 'theme');
        let xAxis = data.xaxis;
        let series = data.series;
        myChart.setOption({
          color: ['#469af2'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '1%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            name: '',
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#a7a7a7',
                fontSize: '12'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#dfdfdf'
              }
            },
            data: xAxis
          },
          yAxis: {
            name: '',
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#a7a7a7',
                fontSize: '12'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#dfdfdf'
              }
            },
            axisLine: {
              show: false
            },
            nameTextStyle: {
              color: '#a7a7a7'
            },
            splitArea: {
              show: false
            }
          },
          series: [{
            name: '上课总时长',
            data: series,
            type: 'bar',
            barMaxWidth: 15,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            }
          }]
        });
      }
    }
  };
</script>
