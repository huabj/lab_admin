<template>
  <div class="labImageFileDetailPage">
    <el-button type="primary" size="small" @click="goLabImageFile">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="labImageFileDetail margin-t-20">
      <div class="title margin-b-20">
        <span class="span-l">实训室影像档案</span>
        <div class="clearfix"></div>
      </div>
      <video class="w-100" :style="{'height': (screenHeight - 380) + 'px'}" :src="$Config.POST_URL + '/file/视频/' + row.resourceUrl" controls="controls">您的浏览器不支持 video 标签。</video>
      <img src="../../../../assets/img/rt.png" class="triangle">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'labImageFileDetail',
    data () {
      return {
        row: {}
      };
    },
    computed: {
      ...mapState([
        'currentMenu',
        'screenHeight'
      ])
    },
    created () {
      this.row = this.currentMenu.row;
    },
    methods: {
      goLabImageFile () {
        let currentMenu = {
          component: 'labImageFile'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
