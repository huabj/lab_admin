<template>
  <div class="teachingDataL4Page">
    <div class="title">
      <span class="span-l">上课总课时</span>
      <div class="button margin-l-10" style="width: auto;">
        <el-button type="primary" size="mini" @click="goDetail()">查看详细</el-button>
      </div>
      <div class="button" style="width: auto;">
        <el-button type="primary" size="mini" @click="exportData">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 teachingDataL4 margin-t-10" id="teachingDataL4" :style="{'height': (screenHeight / 2 - 225) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../assets/js/theme.js';
  export default {
    name: 'teachingDataL4',
    data () {
      return {
        data: {
          xAxis: [],
          series: [],
          series1: []
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
      'twoResult'
    ],
    created () {
    },
    mounted () {
      this.getInitData();
    },
    methods: {
      exportData () {
        let vm = this;
        let url = '/api/statisticsTwo/subscribeStatisticsByUser/download';
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '上课总课时';
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
      goDetail (sign) {
        let currentMenu = {
          component: 'teachingDataDetail',
          sign: sign
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      getInitData () {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('teachingDataL4'), 'theme');
        let dataXAxis = [];
        let dataSeries = [];
        if (this.twoResult.length > 5) {
          for (let i = 0; i < 5; i++) {
            if (this.twoResult[i].username === '-1') {
              dataXAxis.push('无名氏');
            } else {
              dataXAxis.push(this.twoResult[i].username);
            }
            dataSeries.push(this.twoResult[i].totalTime);
          }
        } else {
          for (let i = 0; i < this.twoResult.length; i++) {
            if (this.twoResult[i].username === '-1') {
              dataXAxis.push('无名氏');
            } else {
              dataXAxis.push(this.twoResult[i].username);
            }
            dataSeries.push(this.twoResult[i].totalTime);
          }
        }
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          color: ['#469cf3'],
          grid: {
            left: '0%',
            right: '1%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: {
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
            data: dataXAxis
          },
          yAxis: {
            name: '课时',
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
          series: [
            {
              data: dataSeries,
              barMaxWidth: 15,
              label: {
                show: true,
                position: 'top',
                valueAnimation: true
              },
              type: 'bar'
            }
          ]
        });
      }
    }
  };
</script>
