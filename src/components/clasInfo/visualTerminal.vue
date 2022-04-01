<template>
  <div class="visualTerminalPage">
    <iframe src="http://124.70.210.118:8062/yanshi/1/2/tab3.html" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'visualTerminal',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    }
  };
</script>
