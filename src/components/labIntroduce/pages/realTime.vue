<template>
  <div class="realTimePage">
    <el-button type="primary" size="small" @click="goBack">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="realTime margin-t-20">
      <div class="title margin-b-20">
        <span class="span-l">{{currentMenu.item.name}}</span>
        <div class="clearfix"></div>
      </div>
      <div class="image w-100">
        <video-player ref="videoPlayer" :options="videoOptions" class="vjs-custom-skin videoPlayer" :playsinline="true"
                      @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"></video-player>
      </div>
    </div>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css';
  import {videoPlayer} from 'vue-video-player';
  import 'videojs-flash';
  import {mapState} from 'vuex';
  export default {
    name: 'realTime',
    data () {
      return {
        videoOptions: {
          live: true,
          autoplay: true,
          fluid: true,
          preload: 'auto',
          notSupportedMessage: '暂时无法播放',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true
          },
          techOrder: ['flash'],
          flash: {
            hls: { withCredentials: false },
            swf: 'static/VideoJS.swf'
          },
          sources: [{
            type: 'rtmp/flv',
            src: ''
          }]
        },
        floorId: ''
      };
    },
    components: {
      videoPlayer
    },
    computed: {
      ...mapState([
        'currentMenu',
        'screenHeight'
      ])
    },
    created () {
      this.floorId = this.currentMenu.floorId;
    },
    mounted () {
      if (this.currentMenu.item.streamUrl !== undefined && this.currentMenu.item.streamUrl !== null && this.currentMenu.item.streamUrl !== '') {
        this.videoOptions.sources[0].src = this.currentMenu.item.streamUrl;
      } else {
        this.videoOptions.sources[0].src = 'rtmp://1.116.196.219:20001/live/live0';
      }
    },
    methods: {
      // 播放的回调
      onPlayerPlay (e) {
      },
      // 暂停的回调
      onPlayerPause (e) {
      },
      goBack () {
        let currentMenu = {
          component: 'labIntroduce',
          sign: this.currentMenu.sign,
          floorId: this.floorId
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
