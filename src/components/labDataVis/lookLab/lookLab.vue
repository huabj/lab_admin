<template>
  <div class="lookLabPage">
    <div class="lookLab-button margin-b-20">
      <div class="lookLab-button-l">
        <div class="selected">
          <el-select v-model="floorId" placeholder="请选择" size="small" @change="changeFloor()">
            <el-option v-for="item in floorList" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="labId" placeholder="请选择" size="small" @change="changeLab()">
            <el-option v-for="item in labList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
<!--      <div class="lookLab-button-r">-->
<!--        <el-button type="primary" plain size="small">创建实训室</el-button>-->
<!--        <el-button type="primary" plain size="small">全部导出</el-button>-->
<!--      </div>-->
    </div>
    <div class="lookLab">
      <div class="lookLab-l">
        <div class="lookLab-l-1">
          <lookLabL1 v-bind:passData="passData" v-if="passData !== null"></lookLabL1>
        </div>
        <div class="lookLab-l-2 margin-t-20">
          <lookLabL2 v-bind:passData="passData" v-if="passData !== null"></lookLabL2>
        </div>
      </div>
      <div class="lookLab-c">
        <div class="lookLab-c-1">
          <lookLabC1 v-bind:labData="labData" v-if="labData !== null"></lookLabC1>
        </div>
        <div class="lookLab-c-2 margin-t-20">
          <lookLabC2 v-bind:passData="passData" v-if="passData !== null"></lookLabC2>
        </div>
      </div>
      <div class="lookLab-r">
        <div class="lookLab-r-1">
          <lookLabR1 ref="lookLabR1" v-bind:passInfo="passInfo" v-if="passInfo !== null"></lookLabR1>
        </div>
        <div class="lookLab-r-2 margin-t-20">
          <lookLabR2 ref="lookLabR2" v-bind:passInfo="passInfo" v-if="passInfo !== null"></lookLabR2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import lookLabL1 from './pages/lookLabL1.vue';
  import lookLabL2 from './pages/lookLabL2.vue';
  import lookLabC1 from './pages/lookLabC1.vue';
  import lookLabC2 from './pages/lookLabC2.vue';
  import lookLabR1 from './pages/lookLabR1.vue';
  import lookLabR2 from './pages/lookLabR2.vue';
  export default {
    name: 'lookLab',
    components: {
      lookLabL1,
      lookLabL2,
      lookLabC1,
      lookLabC2,
      lookLabR1,
      lookLabR2
    },
    data () {
      return {
        floorId: '',
        labId: '',
        floorList: [],
        passData: null,
        passInfo: null,
        laboratoryForm: {
          floorId: ''
        },
        labList: [],
        form: {
          laboratoryId: ''
        },
        labData: null
      };
    },
    computed: {
      ...mapState([
        'currentMenu'
      ])
    },
    created () {
      this.getFloorList();
    },
    methods: {
      changeLab () {
        this.passInfo = this.labId;
        let item = {
          labId: this.labId,
          labList: this.labList
        };
        this.labData = item;
        this.$nextTick(() => {
          this.$refs.lookLabR1.getInitDataR1();
          this.$refs.lookLabR2.getInitDataR2();
          this.getInitData();
        });
      },
      changeFloor () {
        this.laboratoryForm.floorId = this.floorId;
        this.getLabList();
      },
      getInitData () {
        let vm = this;
        this.form.laboratoryId = this.labId;
        this.$Service.laboratoryStatisticsById(this.form).then(function (res) {
          if (res.data.data !== undefined) {
            vm.passData = res.data.data;
          }
        });
      },
      // 获取教学楼列表
      getFloorList () {
        let vm = this;
        this.$Service.floor().then(function (res) {
          if (res.data.data !== undefined) {
            vm.floorList = res.data.data;
            if (vm.floorList.length > 0) {
              vm.floorId = vm.floorList[0].id;
              vm.laboratoryForm.floorId = vm.floorId;
              vm.getLabList();
            }
          }
        });
      },
      // 获取实训室列表
      getLabList () {
        let vm = this;
        this.$Service.laboratory(this.laboratoryForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.labList = res.data.data;
            if (vm.labList.length > 0) {
              vm.labId = vm.labList[0].id;
              let item = {
                labId: vm.labId,
                labList: vm.labList
              };
              vm.labData = item;
              vm.changeLab();
            } else {
              vm.labId = '';
            }
          }
        });
      }
    }
  };
</script>
