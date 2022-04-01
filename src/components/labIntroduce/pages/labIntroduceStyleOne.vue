<template>
  <div class="labIntroduceStyleOnePage">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in labList" :key="item.id" @mouseover="mouseOver(index)">
          <img src="../../../assets/img/rt.png" class="rt" :class="{'block': block === index}">
          <div class="title margin-b-20">
            <span class="span-l">{{item.name}}</span>
          </div>
          <div v-if="item.resourceData.image !== undefined" class="labImg"
               :style="{'background-image': 'url('+ $Config.POST_URL + '/file/图片/' + item.resourceData.image[0].realName +')'}"></div>
          <div class="info" :class="{'block': block === index}">
            <h2>{{item.name}}</h2>
            <p>{{item.remark}}</p>
            <p class="margin-t-20 flex">
              <span class="flex-1">{{item.floorName}}-{{item.floorAddress}}</span>
              <el-button type="primary" size="mini" @click="goRrealTime(item)">实时监控</el-button>
            </p>
          </div>
        </div>
        <p v-if="labList.length <= 0">暂无数据...</p>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" :class="{'none': labList.length <= 0}"></div>
      <div class="swiper-button-next" :class="{'none': labList.length <= 0}"></div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'labIntroduceStyleOne',
    data () {
      return {
        labList: [],
        block: '',
        floorId: ''
      };
    },
    components: {
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
    },
    mounted () {
      let mySwiper = new Swiper('.swiper-container', {
        // 如果需要分页器
        pagination: '.swiper-pagination',
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerColumn: 2,
        paginationClickable: true,
        spaceBetween: 36,
        loop: false,
        // 异步情况下数据渲染完成，再次初始化轮播图
        observer: true,
        // 异步情况下数据渲染完成，再次初始化轮
        observeParents: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      });
    },
    methods: {
      mouseOver (index) {
        this.block = index;
      },
      goRrealTime (item) {
        let currentMenu = {
          component: 'realTime',
          sign: 'labIntroduceStyleOne',
          item: item,
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
</script>>

