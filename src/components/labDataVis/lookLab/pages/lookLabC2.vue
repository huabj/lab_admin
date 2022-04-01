<template>
  <div class="lookLabC2Page">
    <div class="title">
      <span class="span-l">设备使用时长排名</span>
<!--      <div class="button">-->
<!--        <el-select v-model="value" placeholder="请选择" size="mini">-->
<!--          <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->
      <div class="clearfix"></div>
    </div>
    <div class="w-100 lookLabC2" id="lookLabC2" :style="{'height': (screenHeight / 2 - 250) + 'px'}"></div>
    <div class="text">
      <span class="span"></span>
<!--      <el-button type="primary" size="mini">查看详细</el-button>-->
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../../assets/js/theme.js';
  export default {
    name: 'lookLabC2',
    data () {
      return {
        value: 1,
        laboratoryRanking: {
          series: [],
          xAxis: []
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu',
        'queryDateTypeList'
      ])
    },
    props: [
      'passData'
    ],
    created () {
      this.laboratoryRanking = this.passData.laboratoryRanking;
    },
    mounted () {
      this.getInitData();
    },
    methods: {
      goDetail (sign) {
        let currentMenu = {
          component: 'teachingDataDetail',
          sign: sign
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      getInitData () {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('lookLabC2'), 'theme');
        let xAxis = this.laboratoryRanking.xAxis;
        let series = this.laboratoryRanking.series;
        myChart.setOption({
          color: ['#469af2'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '1%',
            bottom: '2%',
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
              },
              interval: 0,
              rotate: '45'
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#dfdfdf'
              }
            },
            nameLocation: 'end',
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
    },
    watch: {
      'passData': function (val, oldval) {
        if (val !== oldval) {
          this.laboratoryRanking = val.laboratoryRanking;
          this.getInitData();
        }
      }
    }
  };
</script>
