<template>
  <div class="schoolNoticePage">
    <div class="title">
      <span class="span-l">学校公告</span>
      <div class="selected">
        <el-select v-model="getNoticeListForm.queryDateType" placeholder="请选择" size="mini" @change="getNoticeList()">
          <el-option v-for="item in queryDateTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="info-list" :style="{'height': ((screenHeight / 2) - 270) + 'px'}">
      <p v-if="noticeList.length <= 0">暂无数据...</p>
      <ul v-else>
        <li v-for="item in noticeList" :key="item.id">
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>{{item.issueTime}}</h2>
            <p class="text-indent-2">{{item.title}}</p>
            <p class="text-r w-100 margin-b-10"><a href="javascript:void(0);" @click="viewDetailsModalShow(item)">查看详请</a></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="surplus">
      <span>共计{{noticeList.length}}条消息</span>
    </div>
    <ViewDetails v-if="viewDetailsModal" @viewDetailsModalClose="viewDetailsModalClose"  v-bind:passInfo="passInfo"></ViewDetails>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import ViewDetails from './viewDetails.vue';
  export default {
    name: 'schoolNotice',
    components: {
      ViewDetails
    },
    data () {
      return {
        getNoticeListForm: {
          queryDateType: 1
        },
        noticeList: [],
        viewDetailsModal: false,
        passInfo: {}
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'queryDateTypeList'
      ])
    },
    created () {
      this.getNoticeList();
    },
    methods: {
      // 获取列表
      getNoticeList () {
        let vm = this;
        this.$Service.notice(this.getNoticeListForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.noticeList = res.data.data;
          }
        });
      },
      viewDetailsModalShow (item) {
        this.viewDetailsModal = true;
        this.passInfo = item;
      },
      viewDetailsModalClose () {
        this.viewDetailsModal = false;
      }
    }
  };
</script>
