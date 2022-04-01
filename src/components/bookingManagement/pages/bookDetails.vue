<template>
  <div class="bookDetailsPages">
    <div class="modal-bg">
      <div class="modal w-20" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">{{passInfo.name}}</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <p class="f14 margin-b-10" v-for="ite in item.subscribeList" :key="ite.id">
            <span>预约时间段：</span>
            <span class="color-blue">{{ite.subscribeTime}}</span>
            <span class="color-blue margin-lr-5">{{ite.courseName}}</span>
            <span class="color-blue">{{ite.subscribeStartTime}}-{{ite.subscribeEndTime}}</span>
          </p>
        </div>
        <div class="modal-foot">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'bookDetails',
    data () {
      return {
        item: {},
        currentDate: ''
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
      this.item = this.passInfo;
    },
    methods: {
      cancelModal (sign) {
        this.$emit('bookDetailsModalClose', sign);
      }
    }
  };
</script>
