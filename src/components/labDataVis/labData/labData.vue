<template>
  <div class="labDataPage">
    <div class="labData-l w-25">
      <div class="labData-l-1 margin-b-20">
        <LabDataL1 v-bind:passInfo="passInfo" v-if="passInfo !== null"></LabDataL1>
      </div>
      <div class="labData-l-2">
        <LabDataL2 v-bind:passInfo="passInfo" v-if="passInfo !== null"></LabDataL2>
      </div>
    </div>
    <div class="labData-r w-75">
      <div class="labData-r-1 w-100">
        <LabDataR1L v-bind:passInfo="passInfo" v-if="passInfo !== null"></LabDataR1L>
      </div>
      <div class="labData-r-2 margin-t-20">
        <LabDataR2></LabDataR2>
      </div>
    </div>
  </div>
</template>

<script>
  import LabDataL1 from './pages/labDataL1.vue';
  import LabDataL2 from './pages/labDataL2.vue';
  import LabDataR1L from './pages/labDataR1L.vue';
  import LabDataR1R from './pages/labDataR1R.vue';
  import LabDataR2 from './pages/labDataR2.vue';
  export default {
    name: 'labData',
    data () {
      return {
        passInfo: null
      };
    },
    created () {
      this.getInitData();
    },
    components: {
      LabDataL1,
      LabDataL2,
      LabDataR1L,
      LabDataR1R,
      LabDataR2
    },
    methods: {
      getInitData () {
        let vm = this;
        this.$Service.laboratoryStatisticsData().then(function (res) {
          if (res.data.data !== undefined) {
            vm.passInfo = res.data.data;
          }
        });
      }
    }
  };
</script>
