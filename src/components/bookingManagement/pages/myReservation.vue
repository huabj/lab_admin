<template>
  <div class="myReservationPage">
    <div class="screening">
      <ul>
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
        <li>
          <span class="span f-bolder">预约时间</span>
          <el-date-picker v-model="mySubscribeForm.currentDate" type="date" placeholder="选择日期" size="small" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeCurrentDate()"></el-date-picker>
          <div class="checked">
            <el-checkbox v-model="mySubscribeForm.isCurrentTeamFlag" @change="changeCurrentTeam()">本学期</el-checkbox>
          </div>
        </li>
      </ul>
    </div>
    <p style="color: #a2a2a2; margin: 20px 0 20px 20px;">查询到<span class="margin-lr-5 color-blue">{{suppliesList.length}}</span>个结果</p>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in suppliesList" :key="item.id">
          <h2>{{item.name}}</h2>
          <h3>{{item.address}}</h3>
          <p v-for="(ite, index) in item.subscribeList" :key="ite.id" v-if="index <= 1">
            <span>预约时间段：</span>
            <span class="color-blue">{{ite.subscribeTime}}</span>
            <span class="color-blue margin-lr-5">{{ite.courseName}}</span>
            <span class="color-blue">{{ite.subscribeStartTime}}-{{ite.subscribeEndTime}}</span>
          </p>
          <p class="text-c color-blue" v-if="item.subscribeList.length > 2" @click="bookDetailsModallShow(item)">查看更多预约情况>></p>
          <p class="text-c color-gray" v-else>查看更多预约情况>></p>
          <p>请按时到达上课实训室</p>
          <div class="text-r">
            <el-button type="primary" size="mini" round @click="cancelBookModalShow(item, 'x')">重新预约</el-button>
            <el-button type="primary" size="mini" round plain @click="cancelBookModalShow(item, 'q')">取消预约</el-button>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <CancelBook v-if="cancelBookModal" @cancelBookModalClose="cancelBookModalClose" v-bind:passInfo="passInfo"></CancelBook>
    <BookDetails v-if="bookDetailsModal" @bookDetailsModalClose="bookDetailsModalClose" v-bind:passInfo="passInfo"></BookDetails>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import CancelBook from './cancelBook.vue';
  import BookDetails from './bookDetails.vue';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'myReservation',
    components: {
      CancelBook,
      BookDetails
    },
    data () {
      return {
        cancelBookModal: false,
        bookDetailsModal: false,
        labTypeIndex: '',
        configIndex: 0,
        labPeopleIndex: '',
        mySubscribeForm: {
          laboratoryType: '',
          laboratoryPeopleLimit: '',
          currentDate: '',
          isCurrentTeamFlag: false
        },
        suppliesList: [],
        passInfo: {}
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
      this.getMySubscribe();
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
      getMySubscribe () {
        let vm = this;
        this.$Service.mySubscribe(this.mySubscribeForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.suppliesList = res.data.data;
          }
        });
      },
      selectLabType (index, value) {
        if (index === '') {
          this.labTypeIndex = '';
          this.mySubscribeForm.laboratoryType = '';
          this.getMySubscribe();
        } else {
          this.labTypeIndex = index;
          this.mySubscribeForm.laboratoryType = value;
          this.getMySubscribe();
        }
      },
      selectConfig (index) {
        this.configIndex = index;
      },
      selectLabPeople (index, value) {
        if (index === '') {
          this.labPeopleIndex = '';
          this.mySubscribeForm.laboratoryPeopleLimit = '';
          this.getMySubscribe();
        } else {
          this.labPeopleIndex = index;
          this.mySubscribeForm.laboratoryPeopleLimit = value;
          this.getMySubscribe();
        }
      },
      cancelBookModalShow (item, sign) {
        if (sign === 'x') {
          this.$confirm('是否确认要重新预约?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let cancelBookList = [];
            for (let i = 0; i < item.subscribeList.length; i++) {
              cancelBookList.push(item.subscribeList[i].id);
            }
            let vm = this;
            this.$Service.deleteSubscribe(cancelBookList).then(function (res) {
              if (res.data.data !== undefined) {
                vm.$message({
                  message: '操作成功',
                  type: 'success'
                });
                vm.getMySubscribe();
              }
            });
          }).catch(() => {
          });
        } else if (sign === 'q') {
          this.cancelBookModal = true;
          this.passInfo = item;
        }
      },
      cancelBookModalClose (sign) {
        this.cancelBookModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.getMySubscribe();
        }
      },
      changeCurrentTeam () {
        if (this.mySubscribeForm.isCurrentTeamFlag === true) {
          this.mySubscribeForm.currentDate = '';
        }
        this.getMySubscribe();
      },
      changeCurrentDate () {
        if (this.mySubscribeForm.currentDate !== '') {
          this.mySubscribeForm.isCurrentTeamFlag = false;
        }
        this.getMySubscribe();
      },
      bookDetailsModallShow (item) {
        this.bookDetailsModal = true;
        this.passInfo = item;
      },
      bookDetailsModalClose () {
        this.bookDetailsModal = false;
        this.passInfo = {};
      }
    }
  };
</script>
