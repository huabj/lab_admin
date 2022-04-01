<template>
  <div class="cancelBookPage">
    <div class="modal-bg">
      <div class="modal" style="width: 400px;" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">{{passInfo.name}}</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <p class="f14 color-red" style="margin: 0 0 10px 20px;">请选择您要取消的时间段</p>
          <el-form :model="cancelBookForm" :rules="rules" ref="cancelBookForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="预约时间段" prop="cancelBookList">
              <el-checkbox-group v-model="cancelBookForm.cancelBookList">
                <el-checkbox v-for="item in subscribeList" :key="item.id" :label="item.id" v-if="item.status !== 4">{{item.subscribeTime}}-{{item.courseName}}-{{item.subscribeStartTime}}-{{item.subscribeEndTime}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p class="f12 margin-t-10 color-orange" v-if="subscribeList.length <= 0">暂无可以取消的数据</p>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('cancelBookForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'cancelBook',
    data () {
      return {
        cancelBookForm: {
          cancelBookList: []
        },
        rules: {
          cancelBookList: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ]
        },
        currentDate: '',
        subscribeList: []
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
      this.getCurrentTime();
    },
    methods: {
      // 获取当前时间
      getCurrentTime () {
        let _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        if (mm >= 1 && mm <= 9) {
          mm = '0' + mm;
        }
        if (dd >= 0 && dd <= 9) {
          dd = '0' + dd;
        }
        let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        _this.currentDate = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss;
        for (let i = 0; i < this.passInfo.subscribeList.length; i++) {
          let temp = this.passInfo.subscribeList[i].subscribeTime.split('-');
          let data = temp[0] + temp[1] + temp[2];
          let temp2 = this.passInfo.subscribeList[i].subscribeStartTime.split(':');
          let time = temp2[0] + temp2[1] + '00';
          let dataTime = data + time;
          if (this.currentDate < dataTime) {
            this.subscribeList.push(this.passInfo.subscribeList[i]);
          }
        }
      },
      submit (cancelBookForm) {
        this.$refs[cancelBookForm].validate((valid) => {
          if (valid) {
            this.cancelBookSave();
          } else {
            return false;
          }
        });
      },
      cancelBookSave () {
        let vm = this;
        this.$Service.deleteSubscribe(this.cancelBookForm.cancelBookList).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          }
        });
      },
      cancelModal (sign) {
        this.$emit('cancelBookModalClose', sign);
      }
    }
  };
</script>
