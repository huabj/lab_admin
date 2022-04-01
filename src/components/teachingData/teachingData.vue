<template>
  <div class="teachingDataPage">
    <div class="teachingData-l w-100">
      <div class="teachingData-l-1">
        <div class="teachingData-l-1-l w-50">
          <TeachingDataL2 v-bind:oneResult="oneResult" v-if="oneResult !== ''"></TeachingDataL2>
        </div>
        <div class="teachingData-l-1-r w-50">
          <TeachingDataL4 v-bind:twoResult="twoResult" v-if="twoResult !== ''"></TeachingDataL4>
        </div>
      </div>
      <div class="teachingData-l-2 margin-t-20">
        <div class="teachingData-l-2-l w-100">
          <TeachingDataL1></TeachingDataL1>
        </div>
      </div>
    </div>
    <div class="teachingData-r w-25">
      <ClockStatistics v-bind:threeResult="threeResult" v-if="threeResult !== ''"></ClockStatistics>
    </div>
  </div>
</template>

<script>
  import ClockStatistics from './pages/clockStatistics.vue';
  import TeachingDataL1 from './pages/teachingDataL1.vue';
  import TeachingDataL2 from './pages/teachingDataL2.vue';
  import TeachingDataL3 from './pages/teachingDataL3.vue';
  import TeachingDataL4 from './pages/teachingDataL4.vue';
  export default {
    name: 'teachingData',
    components: {
      ClockStatistics,
      TeachingDataL1,
      TeachingDataL2,
      TeachingDataL3,
      TeachingDataL4
    },
    data () {
      return {
        oneResult: '',
        twoResult: '',
        threeResult: ''
      };
    },
    created () {
      this.getInitData();
    },
    methods: {
      getInitData () {
        let vm = this;
        this.$Service.statisticsTwo().then(function (res) {
          if (res.data.data !== undefined) {
            vm.oneResult = res.data.data.oneResult;
            vm.twoResult = res.data.data.twoResult;
            vm.threeResult = res.data.data.threeResult;
          }
        });
      }
    }
  };
</script>
