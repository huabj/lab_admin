<template>
  <div class="labDataR1LPage">
    <div class="title">
      <span class="span-l">设备使用情况</span>
      <div class="selected fl margin-l-20">
        <el-select placeholder="请选择" size="mini" v-model="form.laboratoryId" @change="goDetail">
          <el-option v-for="item in laboratoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="button margin-l-10" style="width: auto;">
        <el-button type="primary" size="mini" @click="exportData()">导出</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="w-100 labDataR1L" id="labDataR1L" :style="{'height': (screenHeight / 2 - 200) + 'px'}"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../../assets/js/theme.js';
  export default {
    name: 'labDataR1L',
    data () {
      return {
        form: {
          laboratoryId: ''
        },
        laboratoryList: []
      };
    },
    props: [
      'passInfo'
    ],
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    mounted () {
      let vm = this;
      this.$Service.getLaboratoryList().then(function (res) {
        if (res.data.data !== undefined) {
          vm.laboratoryList = res.data.data;
          if (res.data.data.length > 0) {
            vm.form.laboratoryId = res.data.data[0].id;
            vm.goDetail();
          }
        }
      });
      // if (this.passInfo.laboratoryData.length > 0) {
      //   this.form.laboratoryId = this.passInfo.laboratoryData[0].laboratoryId;
      // }
    },
    methods: {
      exportData () {
        let vm = this;
        let url = '/api/statisticsTwo/laboratoryEquipmentTimeStatistics/download?laboratoryId=' + this.form.laboratoryId;
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = '设备使用情况';
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
      goDetail () {
        let vm = this;
        this.$Service.laboratoryEquipmentTimeStatistics(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.getInitData(res.data.data);
          }
        });
      },
      getInitData (data) {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('labDataR1L'), 'theme');
        let xAxis = [];
        let seriesOne = [];
        let seriesTwo = [];
        for (let i = 0; i < data.length; i++) {
          xAxis.push(data[i].equipmentName);
          seriesOne.push(data[i].totalTime);
          seriesTwo.push(data[i].totalFault);
        }
        myChart.setOption({
          legend: {
            textStyle: {
              color: '#333'
            },
            right: 0,
            top: 10,
            align: 'left',
            data: ['设备使用时长', '设备故障次数']
          },
          color: ['#469cf3', '#cdcdcd'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
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
              }
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
            name: '设备使用时长',
            data: seriesOne,
            type: 'bar',
            barMaxWidth: 15,
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            }
          }, {
            name: '设备故障次数',
            data: seriesTwo,
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
