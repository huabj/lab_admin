<template>
  <div class="labClokingdetailPage">
    <el-button type="primary" size="small" @click="goLabClockingFile">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="labClokingdetail margin-t-20">
      <div class="title">
        <span class="span-l">实训室打卡档案</span>
        <div class="clearfix"></div>
      </div>
      <table class="table-list w-100 margin-t-20">
        <tbody>
        <tr>
          <td>文件缩略图</td>
          <td>文件描述</td>
          <td>文件大小</td>
          <td>创建人</td>
          <td>创建时间</td>
          <td>备注</td>
        </tr>
        <tr>
          <td>
            <img :src="$Config.POST_URL + '/file/图片/' + row.openProcessFileName" style="width: 200px;" @click="lookImg(row.openProcessFileName)" v-if="row.openProcessFileName !== null">
            <img src="../../../../assets/img/wutu.png" style="width: 200px;" v-else>
          </td>
          <td>{{row.openFileRemark}}</td>
          <td>{{row.openFileSize}}</td>
          <td>{{row.createUsername}}</td>
          <td>{{row.openOperationTime}}</td>
          <td>{{row.openOperationRemark}}</td>
        </tr>
        <tr>
          <td>
            <img :src="$Config.POST_URL + '/file/图片/' + row.sectionProcessFileName" style="width: 200px;" @click="lookImg(row.sectionProcessFileName)" v-if="row.sectionProcessFileName !== null">
            <img src="../../../../assets/img/wutu.png" style="width: 200px;" v-else>
          </td>
          <td>{{row.sectionFileRemark}}</td>
          <td>{{row.sectionFileSize}}</td>
          <td>{{row.createUsername}}</td>
          <td>{{row.sectionOperationTime}}</td>
          <td>{{row.sectionOperationRemark}}</td>
        </tr>
        <tr>
          <td>
            <img :src="$Config.POST_URL + '/file/图片/' + row.closeProcessFileName" style="width: 200px;" @click="lookImg(row.closeProcessFileName)" v-if="row.closeProcessFileName !== null">
            <img src="../../../../assets/img/wutu.png" style="width: 200px;" v-else>
          </td>
          <td>{{row.closeFileRemark}}</td>
          <td>{{row.closeFileSize}}</td>
          <td>{{row.createUsername}}</td>
          <td>{{row.closeOperationTime}}</td>
          <td>{{row.closeOperationRemark}}</td>
        </tr>
        </tbody>
      </table>
      <img src="../../../../assets/img/rt.png" class="triangle">
    </div>
    <LookImg v-if="LookImgModal" @LookImgModalClose="LookImgModalClose" v-bind:passInfo="passInfo"></LookImg>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import LookImg from '../../../common/lookImg.vue';
  export default {
    name: 'labClokingdetail',
    data () {
      return {
        LookImgModal: false,
        row: {},
        passInfo: {}
      };
    },
    components: {
      LookImg
    },
    computed: {
      ...mapState([
        'currentMenu'
      ])
    },
    created () {
      this.row = this.currentMenu.row;
    },
    methods: {
      goLabClockingFile () {
        let currentMenu = {
          component: 'labClockingFile'
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      lookImg (img) {
        this.passInfo = img;
        this.LookImgModal = true;
      },
      LookImgModalClose () {
        this.LookImgModal = false;
        this.passInfo = {};
      }
    }
  };
</script>
