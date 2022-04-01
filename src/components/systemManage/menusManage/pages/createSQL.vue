<template>
  <div class="createSQLPage">
    <el-button type="primary" size="small" @click="goMenusManage">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="createSQL margin-t-20">
      <iframe src="http://124.70.210.118:8062/SysModules/SysMenu/SysMenuList.aspx" style="width: 100%;" :style="{'height': (screenHeight - 350) + 'px'}" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'createSQL',
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
      goMenusManage () {
        let currentMenu = {
          component: 'menusManage'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
