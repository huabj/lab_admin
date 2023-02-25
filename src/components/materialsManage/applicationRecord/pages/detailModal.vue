<template>
  <div class="detailModalPage">
    <div class="modal-bg">
      <div class="modal w-50" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">申请档案详细</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <table class="table-list w-100 margin-b-20">
            <thead>
            <tr>
              <th class="text-c w-15">物料类型</th>
              <td class="text-l w-85">{{passInfo.materialTypeName}}</td>
            </tr>
            <tr>
              <th class="text-c">物料名称</th>
              <td class="text-l">{{passInfo.materialName}}</td>
            </tr>
            <tr>
              <th class="text-c">仓库编号</th>
              <td class="text-l">{{passInfo.wareHouseNumber}}</td>
            </tr>
            <tr>
              <th class="text-c">货架编号</th>
              <td class="text-l">{{passInfo.shelvesNumber}}</td>
            </tr>
            <tr>
              <th class="text-c">申请人</th>
              <td class="text-l">{{passInfo.createName}}</td>
            </tr>
            <tr>
              <th class="text-c">申请数量</th>
              <td class="text-l">{{passInfo.applyCount}}{{passInfo.unit}}</td>
            </tr>
            <tr>
              <th class="text-c">单位</th>
              <td class="text-l">{{passInfo.unit}}</td>
            </tr>
            <tr>
              <th class="text-c">有效期限</th>
              <td class="text-l">{{passInfo.materialTypeName}}</td>
            </tr>
            <tr>
              <th class="text-c">申请类别</th>
              <td class="text-l">{{passInfo.materialTypeName}}</td>
            </tr>
            <tr>
              <th class="text-c">待领取时间</th>
              <td class="text-l">{{passInfo.receiveTime}}</td>
            </tr>
            <tr>
              <th class="text-c">归还期限</th>
              <td class="text-l">{{passInfo.applyLimitTime}}</td>
            </tr>
            <tr>
              <th class="text-c">状态</th>
              <td class="text-l">
                <el-tag size="small" v-if="passInfo.returnStatus === 2" type="success">无需归还</el-tag>
                <el-tag size="small" v-if="passInfo.returnStatus === 3" type="danger">未领取</el-tag>
                <el-tag size="small" v-if="passInfo.returnStatus === 4" type="danger">待归还</el-tag>
                <el-tag size="small" v-if="passInfo.returnStatus === 5" type="danger">未归还</el-tag>
                <el-tag size="small" v-if="passInfo.returnStatus === 6" type="danger">部分归还</el-tag>
                <el-tag size="small" v-if="passInfo.returnStatus === 7" type="success">全部归还</el-tag>
              </td>
            </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'detailModal',
  data () {
    return {};
  },
  props: [
    'passInfo'
  ],
  computed: {
    ...mapState([
      'screenHeight'
    ])
  },
  created () {
  },
  methods: {
    cancelModal () {
      this.$emit('detailModalClose');
    }
  }
};
</script>

<style scoped>

</style>
