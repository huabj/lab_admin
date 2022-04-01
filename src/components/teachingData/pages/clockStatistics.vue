<template>
  <div class="clockStatisticsPage">
    <div class="title">
      <span class="span-l">打卡统计</span>
      <div class="button">
        <el-button type="primary" size="mini" @click="exportData">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 clockStatistics" id="clockStatistics" :style="{'height': (screenHeight - 315) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../assets/js/theme.js';
  export default {
    name: 'clockStatistics',
    data () {
      return {
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    props: [
      'threeResult'
    ],
    mounted () {
      this.getInitData();
    },
    methods: {
      exportData () {
        let vm = this;
        let url = '/api/statisticsTwo/statistics/download';
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '打卡统计';
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
        let myChart = this.$echarts.init(document.getElementById('clockStatistics'), 'theme');
        let colorList = ['#6cb2fa', '#cb88fb'];
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            data: ['正常打卡', '异常打卡'],
            textStyle: {
              color: '#333'
            },
            left: 50,
            top: 50,
            align: 'left'
          },
          series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['28%', '38%'],
            minAngle: 2,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              color: (params) => {
                return colorList[params.dataIndex];
              }
            },
            label: {
              show: true,
              alignTo: 'labelLine',
              height: 0,
              width: 0,
              lineHeight: 0,
              distanceToLabelLine: 0,
              borderRadius: 2.5,
              padding: [2.5, -2.5, 2.5, -2.5],
              formatter: '{b}',
              rich: {
                a: {
                  padding: [0, 0, 0, 10]
                },
                b: {
                  padding: [0, 10, 0, 0]
                }
              }
            },
            data: [
              {
                name: '正常打卡',
                value: this.threeResult.norNum
              }, {
                name: '异常打卡',
                value: this.threeResult.exceptionNum
              }]
          }]
        });
      }
    }
  };
</script>
