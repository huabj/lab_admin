<template>
  <div class="accountAuthPage">
    <iframe src="http://124.70.210.118:8062/SysModules/SystemEmpAgen/EmpAgenList.aspx" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'accountAuth',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    }
  };
</script>
