<template>
  <div class="labIntroducePage">
    <div class="labIntroduce-button margin-b-20">
      <div class="labIntroduce-button-l">
        <div class="selected">
          <el-select v-model="floorId" placeholder="请选择" size="small" @change="changeFloor()">
            <el-option v-for="item in floorList" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
<!--        <el-button type="primary" plain size="small" @click="goAddLab()">创建实训室</el-button>-->
      </div>
      <div class="labIntroduce-button-r">
        <a href="javascript:void(0);" class="el-icon-menu" :class="{'active': currIndex === 0}" @click="selectCurrentIndex(0)"></a>
        <a href="javascript:void(0);" class="el-icon-s-grid" :class="{'active': currIndex === 1}" @click="selectCurrentIndex(1)"></a>
      </div>
    </div>
    <component v-bind:is="component" v-bind:passInfo="passInfo" v-if="passInfo !== null"></component>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import LabIntroduceStyleOne from './pages/labIntroduceStyleOne.vue';
  import LabIntroduceStyleTwo from './pages/labIntroduceStyleTwo.vue';
  export default {
    name: 'labIntroduce',
    components: {
      LabIntroduceStyleOne,
      LabIntroduceStyleTwo
    },
    data () {
      return {
        component: 'labIntroduceStyleOne',
        currIndex: 0,
        floorId: '',
        floorList: [],
        passInfo: null,
        laboratoryForm: {
          floorId: ''
        },
        labList: []
      };
    },
    computed: {
      ...mapState([
        'currentMenu'
      ])
    },
    created () {
      this.getFloorList();
      if (this.currentMenu.sign !== undefined) {
        this.component = this.currentMenu.sign;
        if (this.currentMenu.sign === 'labIntroduceStyleOne') {
          this.currIndex = 0;
        } else {
          this.currIndex = 1;
        }
      }
    },
    methods: {
      goAddLab () {
        let currentMenu = {
          component: 'addLab',
          floorList: this.floorList,
          sign: this.component
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      changeFloor () {
        this.laboratoryForm.floorId = this.floorId;
        this.getLabList();
      },
      selectCurrentIndex (index) {
        this.currIndex = index;
        if (index === 0) {
          this.component = 'labIntroduceStyleOne';
        } else if (index === 1) {
          this.component = 'labIntroduceStyleTwo';
        }
      },
      // 获取教学楼列表
      getFloorList () {
        let vm = this;
        this.$Service.floor().then(function (res) {
          if (res.data.data !== undefined) {
            vm.floorList = res.data.data;
            if (vm.floorList.length > 0) {
              if (vm.currentMenu.floorId === undefined) {
                vm.floorId = vm.floorList[0].id;
                vm.laboratoryForm.floorId = vm.floorId;
                vm.getLabList();
              } else {
                vm.floorId = vm.currentMenu.floorId;
                vm.laboratoryForm.floorId = vm.floorId;
                vm.getLabList();
              }
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
            let data = {
              floorId: vm.floorId,
              labList: vm.labList
            };
            vm.passInfo = data;
          }
        });
      }
    }
  };
</script>
