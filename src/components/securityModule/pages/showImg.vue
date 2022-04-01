<template>
  <div class="showImgPage">
    <div class="modal-bg">
      <div class="modal w-50" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">照片</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <img src="../../../assets/img/img-1.png" v-if="passInfo === 0" class="w-100">
          <img src="../../../assets/img/img-2.png" v-else-if="passInfo === 1" class="w-100">
          <img src="../../../assets/img/img-3.png" v-else-if="passInfo === 2" class="w-100">
          <img src="../../../assets/img/img-4.png" v-else-if="passInfo === 3" class="w-100">
          <img src="../../../assets/img/img-5.png" v-else-if="passInfo === 4" class="w-100">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'showImg',
    data () {
      return {
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    props: [
      'passInfo'
    ],
    created () {
    },
    methods: {
      cancelModal (sign) {
        this.$emit('securityModuleDetailClose', sign);
      }
    }
  };
</script>
