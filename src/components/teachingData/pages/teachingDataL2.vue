<template>
  <div class="teachingDataL2Page">
    <div class="title">
      <span class="span-l">上课统计</span>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 teachingDataL2 margin-t-20" id="teachingDataL2" :style="{'height': (screenHeight / 2 - 240) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../assets/js/theme.js';
  export default {
    name: 'teachingDataL2',
    data () {
      return {
        form: {
          queryDateType: 1
        },
        oneResultList: []
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'queryDateTypeList',
        'currentMenu'
      ])
    },
    props: [
      'oneResult'
    ],
    mounted () {
      this.getInitData();
    },
    methods: {
      getInitData () {
        this.getEcharts();
      },
      getEcharts () {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('teachingDataL2'), 'theme');
        let data = [];
        let totalOpenNum = [];
        let totalCloseNum = [];
        let totalCloseExceptionNum = [];
        let totalOpenExceptionNum = [];
        for (let key in this.oneResult) {
          let item = {
            name: key,
            totalOpenNum: this.oneResult[key].totalOpenNum,
            totalCloseNum: this.oneResult[key].totalCloseNum,
            totalCloseExceptionNum: this.oneResult[key].totalCloseExceptionNum,
            totalOpenExceptionNum: this.oneResult[key].totalOpenExceptionNum
          };
          this.oneResultList.push(item);
        };
        if (this.oneResultList.length > 5) {
          for (let i = 0; i < 5; i++) {
            data.push(this.oneResultList[i].name);
            totalOpenNum.push(this.oneResultList[i].totalOpenNum);
            totalCloseNum.push(this.oneResultList[i].totalCloseNum);
            totalCloseExceptionNum.push(this.oneResultList[i].totalCloseExceptionNum);
            totalOpenExceptionNum.push(this.oneResultList[i].totalOpenExceptionNum);
          };
        } else {
          for (let i = 0; i < this.oneResultList.length; i++) {
            data.push(this.oneResultList[i].name);
            totalOpenNum.push(this.oneResultList[i].totalOpenNum);
            totalCloseNum.push(this.oneResultList[i].totalCloseNum);
            totalCloseExceptionNum.push(this.oneResultList[i].totalCloseExceptionNum);
            totalOpenExceptionNum.push(this.oneResultList[i].totalOpenExceptionNum);
          };
        }
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
              axisPointer: {
              type: 'shadow'
            }
          },
          color: ['#469cf3', '#cb88f9', '#abec9a', '#65d4e5'],
          legend: {
            data: ['上课打卡总次数', '下课打卡总次数', '上课异常总次数', '下课异常总次数']
          },
          grid: {
            top: '20%',
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
            data: data
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
            name: '上课打卡总次数',
            data: totalOpenNum,
            smooth: false,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            barMaxWidth: 15,
            type: 'bar'
          },
            {
            name: '下课打卡总次数',
            data: totalCloseNum,
            smooth: false,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            barMaxWidth: 15,
            type: 'bar'
          },
            {
            name: '上课异常总次数',
            data: totalCloseExceptionNum,
            smooth: false,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            barMaxWidth: 15,
            type: 'bar'
          },
            {
            name: '下课异常总次数',
            data: totalOpenExceptionNum,
            smooth: false,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            barMaxWidth: 15,
            type: 'bar'
          }]
        });
      }
    }
  };
</script>
