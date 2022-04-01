<template>
  <div class="lookLabC1Page">
    <div class="w-100 gray-bg" :style="{'height': (screenHeight / 2 - 170) + 'px'}">
      <div class="image w-100" v-if="resourceData.image !== undefined && resourceData.video !== undefined"
           :style="{'height': (screenHeight / 2 - 170) + 'px', 'background-image': 'url('+ $Config.POST_URL + '/file/图片/' + resourceData.image[0].realName +')'}"></div>
      <div class="image w-100" v-if="resourceData.image !== undefined && resourceData.video === undefined"
           :style="{'height': (screenHeight / 2 - 170) + 'px', 'background-image': 'url('+ $Config.POST_URL + '/file/图片/' + resourceData.image[0].realName +')'}"></div>
      <div class="image w-100" :style="{'height': (screenHeight / 2 - 170) + 'px'}" v-if="resourceData.image === undefined && resourceData.video !== undefined">
        <video class="w-100" :style="{'height': (screenHeight / 2 - 170) + 'px'}" :src="$Config.POST_URL + '/file/视频/' + resourceData.video[0].realName" controls="controls">您的浏览器不支持 video 标签。</video>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'lookLabC1',
    data () {
      return {
        labList: [],
        resourceData: {}
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    props: [
      'labData'
    ],
    created () {
      this.resourceData = this.labData.labList[0].resourceData;
    },
    methods: {
    },
    watch: {
      'labData': function (val, oldval) {
        if (val !== oldval) {
          for (let i = 0; i < this.labData.labList.length; i++) {
            if (val.labId === this.labData.labList[i].id) {
              this.resourceData = this.labData.labList[i].resourceData;
            }
          }
        }
      }
    }
  };
</script>
