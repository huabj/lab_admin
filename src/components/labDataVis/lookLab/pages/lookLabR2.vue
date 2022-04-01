<template>
  <div class="lookLabR2Page">
    <div class="title">
      <span class="span-l">实训室信息公告</span>
      <div class="button">
<!--        <el-button type="primary" size="mini">查看详细</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="lookLabR2 w-100" :style="{'height': (screenHeight / 2 - 248) + 'px'}">
      <ul>
<!--        1-预约信息，2-故障信息-->
        <li v-for="item in list" :key="item.id">
          <div v-if="item.dataType === 1">
            <span class="span-1 blue-bg"></span>
            <span class="span-2">{{item.title}}</span>
            <span class="span-3 margin-r-10 color-blue">{{item.date}}</span>
            <span class="span-3" v-if="item.dateType === -1">未知（{{item.time}}）</span>
            <span class="span-3 color-red" v-if="item.dateType === 1">正在授课（{{item.time}}）</span>
            <span class="span-3 color-orange" v-if="item.dateType === 2">授课结束（{{item.time}}）</span>
            <span class="span-3 color-green" v-if="item.dateType === 3">即将授课（{{item.time}}）</span>
            <span class="span-3 color-blue" v-if="item.dateType === 4">未开始授课（{{item.time}}）</span>
          </div>
          <div v-if="item.dataType === 2">
            <span class="span-1 red-bg"></span>
            <span class="span-2">{{item.title}}</span>
            <span class="span-3 margin-r-10 color-blue">{{item.date}}</span>
            <span class="span-3">（{{item.time}}）</span>
          </div>
        </li>
<!--        <li v-for="item in list" :key="item.id" v-else-if="item.dataType === 2">-->
<!--          <span class="span-1 red-bg"></span>-->
<!--          <span class="span-2">{{item.title}}</span>-->
<!--          <span class="span-3" v-if="item.dateType === -1 && item.dataType === 1">未知（{{item.time}}）</span>-->
<!--          <span class="span-3 color-red" v-if="item.dateType === 1 && item.dataType === 1">正在授课（{{item.time}}）</span>-->
<!--          <span class="span-3 color-orange" v-if="item.dateType === 2 && item.dataType === 1">授课结束（{{item.time}}）</span>-->
<!--          <span class="span-3 color-green" v-if="item.dateType === 3 && item.dataType === 1">即将授课（{{item.time}}）</span>-->
<!--          <span class="span-3 color-blue" v-if="item.dateType === 4 && item.dataType === 1">未开始授课（{{item.time}}）</span>-->
<!--        </li>-->
        <p v-if="list.length <= 0">暂无数据...</p>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'lookLabR2',
    data () {
      return {
        list: [],
        form: {
          laboratoryId: ''
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
      'passInfo'
    ],
    created () {
    },
    methods: {
      getInitDataR2 () {
        let vm = this;
        this.form.laboratoryId = this.passInfo;
        this.$Service.laboratorySynthesizeStatistics(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.list = res.data.data;
          }
        });
      }
    }
  };
</script>
