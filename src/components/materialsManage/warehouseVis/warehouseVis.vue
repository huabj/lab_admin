<template>
  <div class="warehouseVisPage">
    <iframe src="http://124.70.210.118:8062/yanshi/27/index.html" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'warehouseVis',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    }
  };
</script>
