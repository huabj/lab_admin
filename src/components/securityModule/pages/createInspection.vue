<template>
  <div class="createInspectionPage">
    <el-button type="primary" size="small" @click="goInspectionManagement">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="createInspection margin-t-20">
      <iframe src="http://124.70.210.118:8062/PMModules/B_Device/wb/WbActList.aspx" style="width: 100%;" :style="{'height': (screenHeight - 350) + 'px'}" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'createInspection',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    data () {
      return {
      };
    },
    created () {
    },
    methods: {
      goInspectionManagement () {
        let currentMenu = {
          component: 'tacticalManagement'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
