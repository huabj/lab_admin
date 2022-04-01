<template>
  <div class="lookImgPage">
    <div class="modal-bg">
      <div class="modal w-55" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">图片详细</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <img :src="$Config.POST_URL + '/file/图片/' + img" class="w-100">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'lookImg',
    data () {
      return {
        img: ''
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
      this.img = this.passInfo;
    },
    methods: {
      cancelModal (sign) {
        this.$emit('LookImgModalClose', sign);
      }
    }
  };
</script>
