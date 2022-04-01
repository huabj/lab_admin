<template>
  <div class="viewDetailsPage">
    <div class="modal-bg">
      <div class="modal w-50" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header" style="border: 0;">
          <span class="f24 f-bolder" style="border: 0; display: block; text-align: center; margin: 20px 0 0 0; ">{{passInfo.title}}</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <p class="f14" style="text-indent: 2rem; line-height: 24px;" v-html="passInfo.content"></p>
        </div>
        <div class="modal-foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'viewDetails',
    data () {
      return {
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
      cancelModal (sign) {
        this.$emit('viewDetailsModalClose', sign);
      }
    }
  };
</script>
