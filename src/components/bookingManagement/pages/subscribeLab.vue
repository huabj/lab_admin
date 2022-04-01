<template>
  <div class="subscribeLabPage">
    <div class="screening">
      <ul>
        <li>
          <span class="span f-bolder">预约时间</span>
          <el-date-picker v-model="subscribeForm.currentDate" @change="getSubscribe()" type="date" placeholder="选择日期" size="small" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </li>
        <li>
          <span class="span f-bolder">实训室类别</span>
          <span class="span" :class="{'active': labTypeIndex === ''}" @click="selectLabType('', {})">全部</span>
          <span class="span" v-for="(item, index) in labTypeList" :key="item.id" :class="{'active': labTypeIndex === index}" @click="selectLabType(index, item.value)">{{item.label}}</span>
        </li>
        <li>
          <span class="span f-bolder">设备数量</span>
          <span class="span" v-for="(item, index) in configList" :key="item.id" :class="{'active': configIndex === index}" @click="selectConfig(index)">{{item.num}}</span>
        </li>
        <li>
          <span class="span f-bolder">实训室容纳人数</span>
          <span class="span" :class="{'active': labPeopleIndex === ''}" @click="selectLabPeople('', {})">全部</span>
          <span class="span" v-for="(item, index) in peopleLimitList" :key="item.id" :class="{'active': labPeopleIndex === index}" @click="selectLabPeople(index, item.value)">{{item.label}}</span>
        </li>
      </ul>
    </div>
    <p style="color: #a2a2a2; margin: 30px 0 20px 20px;">查询到<span class="margin-lr-5 color-blue">{{suppliesList.length}}</span>个结果</p>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in suppliesList" :key="item.id">
          <h2>{{item.name}}</h2>
          <h3>{{item.address}}</h3>
          <p>当前预约数：<span class="color-blue margin-r-5 f14 f-bolder">{{item.subscribeList.length}}</span>个</p>
          <div style="width: 100%; height: 35px; overflow: hidden;">
            <p v-for="ite in item.unSubscribeList" :key="ite.id" v-if="currentTime < ite.dataTime">
              <span>当前空闲时段：</span>
              <span class="color-blue">{{ite.courseName}}</span>
            </p>
          </div>
          <div class="text-r">
            <el-button type="primary" size="mini" round @click="bookingModalShow(item)">在线预约</el-button>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <Booking v-if="bookingModal" @bookingModalClose="bookingModalClose" v-bind:passInfo="passInfo"></Booking>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Booking from './booking.vue';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'subscribeLab',
    components: {
      Booking
    },
    data () {
      return {
        bookingModal: false,
        labTypeIndex: '',
        configIndex: 0,
        labPeopleIndex: '',
        subscribeForm: {
          laboratoryType: '',
          laboratoryPeopleLimit: '',
          currentDate: ''
        },
        suppliesList: [],
        currentTime: ''
      };
    },
    computed: {
      ...mapState([
        'courseList',
        'configList',
        'peopleLimitList',
        'labTypeList'
      ])
    },
    created () {
      this.getCurrentTime();
    },
    mounted () {
      let mySwiper = new Swiper('.swiper-container', {
        // 如果需要分页器
        pagination: '.swiper-pagination',
        direction: 'horizontal',
        slidesPerView: 4,
        slidesPerColumn: 2,
        paginationClickable: true,
        spaceBetween: 35,
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
      // 获取当前时间
      getCurrentTime () {
        let _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        if (mm >= 1 && mm <= 9) {
          mm = '0' + mm;
        }
        if (dd >= 0 && dd <= 9) {
          dd = '0' + dd;
        }
        let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        _this.currentTime = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss;
        this.subscribeForm.currentDate = yy + '-' + mm + '-' + dd;
        this.getSubscribe();
      },
      getSubscribe () {
        let vm = this;
        this.$Service.subscribe(this.subscribeForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.suppliesList = res.data.data;
            for (let i = 0; i < vm.suppliesList.length; i++) {
              for (let j = 0; j < vm.suppliesList[i].unSubscribeList.length; j++) {
                let temp = vm.subscribeForm.currentDate.split('-');
                let data = temp[0] + temp[1] + temp[2];
                let temp2 = vm.suppliesList[i].unSubscribeList[j].subscribeStartTime.split(':');
                let time = temp2[0] + temp2[1] + '00';
                let dataTime = data + time;
                vm.$set(vm.suppliesList[i].unSubscribeList[j], 'dataTime', dataTime);
              }
            }
          }
        });
      },
      selectLabType (index, value) {
        if (index === '') {
          this.labTypeIndex = '';
          this.subscribeForm.laboratoryType = '';
          this.getSubscribe();
        } else {
          this.labTypeIndex = index;
          this.subscribeForm.laboratoryType = value;
          this.getSubscribe();
        }
      },
      selectConfig (index) {
        this.configIndex = index;
      },
      selectLabPeople (index, value) {
        if (index === '') {
          this.labPeopleIndex = '';
          this.subscribeForm.laboratoryPeopleLimit = '';
          this.getSubscribe();
        } else {
          this.labPeopleIndex = index;
          this.subscribeForm.laboratoryPeopleLimit = value;
          this.getSubscribe();
        }
      },
      // 模态框显示
      bookingModalShow (item) {
        let data = {
          item: item,
          currentDate: this.subscribeForm.currentDate
        };
        this.passInfo = data;
        this.bookingModal = true;
      },
      // 模态框关闭
      bookingModalClose (sign) {
        this.bookingModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.getSubscribe();
        }
      }
    }
  };
</script>
