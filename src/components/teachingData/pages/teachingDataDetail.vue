<template>
  <div class="teachingDataDetailPage">
    <div class="button margin-b-20">
      <el-button type="primary" size="small" @click="goTeachingData">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    </div>
    <div class="teachingDataDetail">
      <div class="w-100 teachingDataDetail" id="teachingDataDetail" :style="{'height': (screenHeight / 2 - 125) + 'px'}"></div>
      <el-table class="margin-t-20" :data="list">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="totalTime" label="累计总课时"></el-table-column>
        <el-table-column prop="totalOpenNum" label="累计上课打卡总次数"></el-table-column>
        <el-table-column prop="totalCloseNum" label="累计下课打卡总次数"></el-table-column>
        <el-table-column prop="totalOpenExceptionNum" label="累计上课异常总次数"></el-table-column>
        <el-table-column prop="totalCloseExceptionNum" label="累计下课异常总次数"></el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="导出" class="update" @click="exportData(scope.row)">导出</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import theme from '../../../assets/js/theme.js';
  import {mapState} from 'vuex';
  export default {
    name: 'teachingDataDetail',
    components: {
    },
    data () {
      return {
        list: []
      };
    },
    computed: {
      ...mapState([
        'currentMenu',
        'screenHeight'
      ])
    },
    created () {
    },
    mounted () {
      let vm = this;
      this.$Service.subscribeStatisticsByUser().then(function (res) {
        if (res.data.data !== undefined) {
          vm.list = res.data.data;
          vm.getInitData();
        }
      });
    },
    methods: {
      getInitData () {
        this.$echarts.registerTheme('theme', theme);
        let myChart = this.$echarts.init(document.getElementById('teachingDataDetail'), 'theme');
        let dataXAxis = [];
        let dataSeries = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].username === '-1') {
            dataXAxis.push('无名氏');
          } else {
            dataXAxis.push(this.list[i].username);
          }
          dataSeries.push(this.list[i].totalTime);
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
            },
            min: 0,
            max: 500
          },
          series: [
            {
              data: dataSeries,
              barMaxWidth: 15,
              type: 'bar'
            }
          ]
        });
      },
      exportData (row) {
        let vm = this;
        let url = '/api/statisticsTwo/subscribeStatisticsByUserId/download/' + row.userId;
        this.$axios({
          url: this.$Config.POST_URL + url,
          method: 'get',
          headers: {'Authorization': this.getCookieVal('token')},
          responseType: 'blob'
        }).then(function (res) {
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          let filename = row.username + '--上课总课时';
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
      goTeachingData () {
        let currentMenu = {
          component: 'teachingData',
          hidden: true,
          name: '教学数据分析优化',
          path: '/null'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
