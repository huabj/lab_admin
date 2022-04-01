<template>
  <div class="labDataL1Page">
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
  </div>
</template>

<script>
  export default {
    name: 'labDataL1',
    data () {
      return {
        laboratoryIntro: {
          laboratoryCameraSize: 0,
          laboratoryEquipmentSize: 0,
          laboratorySize: 0
        }
      };
    },
    props: [
      'passInfo'
    ],
    created () {
      this.laboratoryIntro = this.passInfo.laboratoryIntro;
    },
    methods: {
    }
  };
</script>
