<template>
  <div class="teachingDataL1Page">
    <div class="title">
      <span class="span-l">周期性课时统计</span>
      <div class="selected fr">
        <el-select placeholder="请选择" size="mini" v-model="form.dateType" @change="getCourseAllTime">
          <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value" v-if="item.value !== 3"></el-option>
        </el-select>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 teachingDataL1" id="teachingDataL1" :style="{'height': (screenHeight / 2 - 190) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../assets/js/theme.js';
  export default {
    name: 'teachingDataL1',
    data () {
      return {
        form: {
          dateType: 1
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
    mounted () {
      this.getCourseAllTime();
    },
    methods: {
      // 获取列表
      getCourseAllTime () {
        let vm = this;
        this.$Service.statisticsOne(this.form).then(function (res) {
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
        let myChart = this.$echarts.init(document.getElementById('teachingDataL1'), 'theme');
        let xAxis = [];
        let series = [];
        for (let key in data) {
          xAxis.push(key);
          series.push(data[key]);
        };
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
            bottom: '1%',
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
            name: '次数',
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
            data: series,
            type: 'line',
            smooth: false,
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
