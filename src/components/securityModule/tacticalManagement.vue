<template>
  <div class="tacticalManagementPage">
    <div class="title">
      <span class="span-l">策略管理</span>
      <div class="button flex">
        <el-button type="primary" size="small" @click="goCreateInspection()">历史任务</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="margin-t-20">
      <iframe src="http://124.70.210.118:8062/PMModules/B_Device/wb/WbConfigList.aspx" style="width: 100%;" :style="{'height': (screenHeight - 350) + 'px'}" frameborder="0"></iframe>
      <img src="../../assets/img/rt.png" class="triangle">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'tacticalManagement',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    methods: {
      goCreateInspection () {
        let currentMenu = {
          component: 'createInspection'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
