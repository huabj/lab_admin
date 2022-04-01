<template>
  <div class="dataManagementPage">
    <iframe src="http://124.70.210.118:8062/SysModules/SystemBackUp/SystemBackUp.aspx" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'dataManagement',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    }
  };
</script>

<style scoped>

</style>
