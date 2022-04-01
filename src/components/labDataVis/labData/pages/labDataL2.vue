<template>
  <div class="labDataL2Page">
    <div class="title">
      <span class="span-l">实训室数据</span>
      <div class="button margin-l-10" style="width: auto;">
        <el-button type="primary" size="mini" @click="exportData()">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 labDataL2" id="labDataL2" :style="{'height': (screenHeight - 450) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../../assets/js/theme.js';
  export default {
    name: 'labDataL2',
    data () {
      return {
        laboratoryUseConditionOne: {}
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
    mounted () {
      this.getInitData();
    },
    methods: {
      exportData () {
        let vm = this;
        let url = '/api/statisticsTwo/laboratoryStatisticsOne/download';
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '实训室数据';
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
      getInitData () {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('labDataL2'), 'theme');
        let yAxis = [];
        let series1 = [];
        let series2 = [];
        for (let i = 0; i < this.passInfo.laboratoryData.length; i++) {
          yAxis.push(this.passInfo.laboratoryData[i].laboratoryName);
          series1.push(this.passInfo.laboratoryData[i].laboratoryTotalTime);
          series2.push(this.passInfo.laboratoryData[i].laboratoryTotalNum);
        }
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            textStyle: {
              color: '#333'
            },
            left: 30,
            top: 15,
            align: 'left',
            data: ['实训室累计课时', '故障累计次数']
          },
          color: ['#459bf2', '#abec9c'],
          grid: {
            top: '10%',
            left: '1%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
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
            },
            min: 0,
            max: 500
          },
          yAxis: {
            name: '',
            type: 'category',
            nameLocation: 'end',
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
            data: yAxis
          },
          series: [
            {
              name: '实训室累计课时',
              type: 'bar',
              data: series1,
              barMaxWidth: 15
            },
            {
              name: '故障累计次数',
              type: 'bar',
              data: series2,
              barMaxWidth: 15
            }
          ]
        });
      }
    }
  };
</script>
