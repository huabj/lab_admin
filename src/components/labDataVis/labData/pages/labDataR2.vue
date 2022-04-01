<template>
  <div class="labDataR2Page">
    <div class="title">
      <span class="span-l">使用率数据</span>
      <div class="selected fl margin-l-20">
        <el-select placeholder="请选择" size="mini" v-model="form.dateType" @change="getData">
          <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="button margin-l-10" style="width: auto;">
        <el-button type="primary" size="mini" @click="exportData()">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 labDataR2" id="labDataR2" :style="{'height': (screenHeight / 2 - 200) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../../assets/js/theme.js';
  export default {
    name: 'labDataR2',
    data () {
      return {
        form: {
          weekNum: '40',
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
    props: [
      'passInfo'
    ],
    mounted () {
      this.getData();
    },
    methods: {
      exportData () {
        let vm = this;
        let url = '/api/statisticsTwo/laboratoryUseStatistics/download';
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '使用率数据';
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
      getData () {
        let vm = this;
        this.$Service.laboratoryUseStatistics(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.getInitData(res.data.data);
          }
        });
      },
      getInitData (data) {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('labDataR2'), 'theme');
        let xAxis = [];
        let series = [];
        for (let i = 0; i < data.length; i++) {
          xAxis.push(data[i].laboratoryName);
          series.push(Math.round(data[i].userPercentage));
        }
        myChart.setOption({
          color: ['#f1b553'],
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
              },
              interval: 0,
              rotate: 90
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
