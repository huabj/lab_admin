<template>
  <div class="importPage">
    <div class="modal-bg">
      <div class="modal w-20" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">导入模板</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <p class="f14 margin-b-10">请导入文档</p>
          <input class="input-file" name="filename" type="file" ref="clearFile" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="uploadFile"/>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="fileUploadSubmit()" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'import',
  data () {
    return {
      taskFile: {}
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
  },
  methods: {
    // 上传文件
    uploadFile (e) {
      this.taskFile = e.target.files[0];
    },
    fileUploadSubmit () {
      if (this.taskFile.name === undefined) {
        this.$alert('请先选择您导入的文件！', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      } else {
        let formData = new FormData();
        formData.append('file', this.taskFile, this.taskFile.name);
        formData.append('chunk', '0');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        let vm = this;
        this.$Service.uploadMaterial(formData, config).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          } else {
            vm.taskFile = {};
          }
        });
      }
    },
    cancelModal (sign) {
      this.$emit('importModalClose', sign);
    }
  }
};
</script>
