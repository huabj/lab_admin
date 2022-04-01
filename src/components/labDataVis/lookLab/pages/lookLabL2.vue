<template>
  <div class="lookLabL2Page">
    <div class="title">
      <span class="span-l">实训室使用信息</span>
      <div class="button">
<!--        <el-button type="primary" size="mini">查看详细</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="lookLabL2" :style="{'height': (screenHeight - 600) + 'px'}">
      <div class="lookLabL2-1">
        <p><span>{{currentLaboratoryUseCondition.currentUseNum}}</span>次</p>
        <p>使用总次数</p>
      </div>
      <div class="lookLabL2-2">
        <div class="wrap" style=" width: 150px; height: 150px; background:#42c02e;">
          <div class="leftWrap" style=" width: 75px; height: 150px;">
            <div class="lookLabL2-left" ref="left1" style=" border-radius: 75px 0 0 75px; width: 75px; height: 150px;"></div>
          </div>
          <div class="rightWrap" style=" width: 75px; height: 150px;">
            <div class="lookLabL2-right" ref="right1" style=" border-radius: 0 75px 75px 0; width: 75px; height: 150px;"></div>
          </div>
          <div class="proportion" style=" width: 130px; height: 130px; line-height: 130px;"></div>
        </div>
      </div>
      <div class="lookLabL2-3">
        <div class="wrap" style=" width: 200px; height: 200px; background:#ffc300;">
          <div class="leftWrap" style=" width: 100px; height: 200px;">
            <div class="lookLabL2-left" ref="left2" style=" border-radius: 100px 0 0 100px; width: 100px; height: 200px;"></div>
          </div>
          <div class="rightWrap" style=" width: 100px; height: 200px;">
            <div class="lookLabL2-right" ref="right2" style=" border-radius: 0 100px 100px 0; width: 100px; height: 200px;"></div>
          </div>
          <div class="proportion" style=" width: 180px; height: 180px; line-height: 180px;"></div>
        </div>
      </div>
      <div class="lookLabL2-4">
        <div class="wrap" style=" width: 250px; height: 250px; background:#FF8700;">
          <div class="leftWrap" style=" width: 125px; height: 250px;">
            <div class="lookLabL2-left" ref="left3" style=" border-radius: 125px 0 0 125px; width: 125px; height: 250px;"></div>
          </div>
          <div class="rightWrap" style=" width: 125px; height: 250px;">
            <div class="lookLabL2-right" ref="right3" style=" border-radius: 0 125px 125px 0; width: 125px; height: 250px;"></div>
          </div>
          <div class="proportion" style=" width: 230px; height: 230px; line-height: 230px;"></div>
        </div>
      </div>
      <div class="lookLabL2-5">
        <p><span style="background:#009DFF;"></span>使用总次数&nbsp;&nbsp;{{currentLaboratoryUseCondition.currentUseNum}}&nbsp;次</p>
        <p><span style="background:#42c02e;"></span>实训室使用率&nbsp;&nbsp;{{parseInt(currentLaboratoryUseCondition.laboratoryUsePercent)}}&nbsp;%</p>
        <p><span style="background:#ffc300;"></span>设备故障率&nbsp;&nbsp;{{parseInt(currentLaboratoryUseCondition.equipmentFaultPercent)}}&nbsp;%</p>
        <p><span style="background:#FF8700;"></span>设施故障率&nbsp;&nbsp;{{parseInt(currentLaboratoryUseCondition.equipmentFaultMediaPercent)}}&nbsp;%</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import theme from '../../../../assets/js/theme.js';
  export default {
    name: 'lookLabL2',
    data () {
      return {
        currentLaboratoryUseCondition: {
          currentUseNum: 0,
          equipmentFaultMediaPercent: 0,
          equipmentFaultPercent: 0,
          laboratoryUsePercent: 0
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    props: [
      'passData'
    ],
    created () {
      this.currentLaboratoryUseCondition = this.passData.currentLaboratoryUseCondition;
    },
    mounted () {
      this.laboratoryUsePercent();
      this.equipmentFaultPercent();
      this.equipmentFaultMediaPercent();
    },
    methods: {
      laboratoryUsePercent () {
        this.$refs.left1.style.transform = 'rotate(' + 0 + 'deg)';
        this.$refs.right1.style.transform = 'rotate(' + 0 + 'deg)';
        let num = parseInt(this.currentLaboratoryUseCondition.laboratoryUsePercent) * 3.6;
        if (num < 180) {
          this.$refs.left1.style.transform = 'rotate(' + num + 'deg)';
        } else {
          this.$refs.left1.style.transform = 'rotate(180deg)';
          this.$refs.right1.style.transform = 'rotate(' + (num - 180) + 'deg)';
        }
      },
      equipmentFaultPercent () {
        this.$refs.left2.style.transform = 'rotate(' + 0 + 'deg)';
        this.$refs.right2.style.transform = 'rotate(' + 0 + 'deg)';
        let num = parseInt(this.currentLaboratoryUseCondition.equipmentFaultPercent) * 3.6;
        if (num < 180) {
          this.$refs.left2.style.transform = 'rotate(' + num + 'deg)';
        } else {
          this.$refs.left2.style.transform = 'rotate(180deg)';
          this.$refs.right2.style.transform = 'rotate(' + (num - 180) + 'deg)';
        }
      },
      equipmentFaultMediaPercent () {
        this.$refs.left3.style.transform = 'rotate(' + 0 + 'deg)';
        this.$refs.right3.style.transform = 'rotate(' + 0 + 'deg)';
        let num = parseInt(this.currentLaboratoryUseCondition.equipmentFaultMediaPercent) * 3.6;
        if (num < 180) {
          this.$refs.left3.style.transform = 'rotate(' + num + 'deg)';
        } else {
          this.$refs.left3.style.transform = 'rotate(180deg)';
          this.$refs.right3.style.transform = 'rotate(' + (num - 180) + 'deg)';
        }
      }
    },
    watch: {
      'passData': function (val, oldval) {
        if (val !== oldval) {
          this.currentLaboratoryUseCondition = val.currentLaboratoryUseCondition;
          this.laboratoryUsePercent();
          this.equipmentFaultPercent();
          this.equipmentFaultMediaPercent();
        }
      }
    }
  };
</script>
