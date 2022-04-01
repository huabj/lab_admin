<template>
  <div class="lookLabL1Page">
    <ul>
      <li>
        <h2>实训室总数</h2>
        <p>{{laboratoryIntro.laboratorySize}}间</p>
      </li>
      <li>
        <h2>监控总数</h2>
        <p>{{laboratoryIntro.laboratoryCameraSize}}个</p>
      </li>
      <li>
        <h2>设备总数</h2>
        <p>{{laboratoryIntro.laboratoryEquipmentSize}}个</p>
      </li>
    </ul>
    <ul style="margin: 30px 0 0 0;">
      <li>
        <h3>实训室使用总时长</h3>
        <h4>{{laboratoryIntro.laboratoryTotalTime}}</h4>
      </li>
      <li>
        <h3>当前实训室使用时长</h3>
        <h4>{{laboratoryIntro.laboratoryCurrentTotalTime}}</h4>
      </li>
    </ul>
<!--    <ul style="margin: 30px 0 0 0;">-->
<!--      <li>-->
<!--        <h3>实训室使用总时长</h3>-->
<!--        <h4>180小时35分49秒</h4>-->
<!--      </li>-->
<!--      <li>-->
<!--        <h3>当前实训室使用时长</h3>-->
<!--        <h4>180小时35分49秒</h4>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
  export default {
    name: 'lookLabL1',
    data () {
      return {
        laboratoryIntro: {
          laboratoryCameraSize: 0,
          laboratoryCurrentTotalTime: 0,
          laboratoryEquipmentSize: 0,
          laboratorySize: 0,
          laboratoryTotalTime: 0
        }
      };
    },
    props: [
      'passData'
    ],
    created () {
      this.laboratoryIntro = this.passData.laboratoryIntro;
    },
    methods: {
    },
    watch: {
      'passData': function (val, oldval) {
        if (val !== oldval) {
          this.laboratoryIntro = val.laboratoryIntro;
        }
      }
    }
  };
</script>
