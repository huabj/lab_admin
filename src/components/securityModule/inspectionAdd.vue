<template>
  <div class="inspectionAddPage">
    <iframe src="http://124.70.210.118:8062/yanshi/1/2/tab.html" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'inspectionAdd',
    computed: {
      ...mapState([
        'screenHeight'
      ])
    }
  };
</script>
