<template>
  <div class="labIntroduceStyleTwoPage">
    <p v-if="labList.length <= 0">暂无数据...</p>
    <div style=" display: flex;" v-else>
      <div class="labIntroduceStyleTwo-l">
        <div class="title margin-b-20">
          <span class="span-l">{{currentLab.name}}</span>
        </div>
        <div class="image w-100" :style="{'height': (screenHeight - 500) + 'px'}" v-if="currentLab.resourceData.image !== undefined && currentLab.resourceData.video !== undefined">
          <video class="w-100" :style="{'height': (screenHeight - 500) + 'px'}" :src="$Config.POST_URL + '/file/视频/' + currentLab.resourceData.video[0].realName" controls="controls">您的浏览器不支持 video 标签。</video>
        </div>
        <div class="image w-100" v-if="currentLab.resourceData.image !== undefined && currentLab.resourceData.video === undefined"
             :style="{'height': (screenHeight - 500) + 'px', 'background-image': 'url('+ $Config.POST_URL + '/file/图片/' + currentLab.resourceData.image[0].realName +')'}">
        </div>
        <div class="image w-100" :style="{'height': (screenHeight - 500) + 'px'}" v-if="currentLab.resourceData.image === undefined && currentLab.resourceData.video !== undefined">
          <video class="w-100" :style="{'height': (screenHeight - 500) + 'px'}" :src="$Config.POST_URL + '/file/视频/' + currentLab.resourceData.video[0].realName" controls="controls">您的浏览器不支持 video 标签。</video>
        </div>
        <div class="title margin-t-20">
          <span class="span-l">实训室介绍</span>
        </div>
        <p class="p-1">{{currentLab.remark}}</p>
        <p class="p-2">{{currentLab.floorName}}-{{currentLab.floorAddress}}<el-button type="primary" class="fr" size="mini" @click="goRrealTime()">实时监控</el-button></p>
      </div>
      <div class="labIntroduceStyleTwo-r" :style="{'height': (screenHeight - 300) + 'px'}">
        <ul>
          <li v-for="(item, index) in labList" :key="item.id" @click="selectLab(item, index)" :class="{'active': currentIndex === index}">
            <h2 class="margin-b-10">{{item.name}}</h2>
            <div class="labImg" v-if="item.resourceData.image !== undefined" :style="{'background-image': 'url('+ $Config.POST_URL + '/file/图片/' + item.resourceData.image[0].realName +')'}">
<!--              <img v-if="item.resourceData.image !== undefined" :src="$Config.POST_URL + '/file/图片/' + item.resourceData.image[0].realName">-->
            </div>
            <div class="labImg" v-else></div>
<!--            <video :src="item.resourceUrl"></video>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'labIntroduceStyleTwo',
    data () {
      return {
        labList: [],
        currentLab: {},
        currentIndex: 0,
        floorId: ''
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
      this.labList = this.passInfo.labList;
      this.floorId = this.passInfo.floorId;
      if (this.labList.length > 0) {
        this.currentLab = this.labList[0];
      }
    },
    methods: {
      selectLab (item, index) {
        this.currentLab = item;
        this.currentIndex = index;
      },
      goRrealTime () {
        let currentMenu = {
          component: 'realTime',
          sign: 'labIntroduceStyleTwo',
          item: this.currentLab,
          floorId: this.floorId
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    },
    watch: {
      'passInfo': function (val, oldval) {
        if (val !== oldval) {
          this.labList = val.labList;
          this.floorId = val.floorId;
        }
      }
    }
  };
</script>
