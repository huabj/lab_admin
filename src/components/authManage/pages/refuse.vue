<template>
  <div class="refusePage">
    <div class="modal-bg">
      <div class="modal w-30" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">操作信息维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="subscribeForm" :model="subscribeForm" :rules="rules">
            <el-form-item label="拒绝原因" class="w-100" prop="acceptMessage">
              <el-input placeholder="请输入拒绝原因" size="small" v-model="subscribeForm.acceptMessage"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('subscribeForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'refuse',
    data () {
      return {
        subscribeForm: {
          id: '',
          laboratoryId: '',
          courseTimeId: '',
          acceptUserId: '',
          acceptMessage: '',
          status: ''
        },
        rules: {
          acceptMessage: [
            {required: true, message: '请输入', trigger: 'blur'}
          ]
        }
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
      this.subscribeForm.id = this.passInfo.id;
      this.subscribeForm.status = 3;
      this.subscribeForm.laboratoryId = this.passInfo.laboratoryId;
    },
    methods: {
      submit (subscribeForm) {
        this.$refs[subscribeForm].validate((valid) => {
          if (valid) {
            this.subscribeFormSave();
          } else {
            return false;
          }
        });
      },
      subscribeFormSave () {
        let vm = this;
        this.$Service.updateSubscribe(this.subscribeForm).then(function (res) {
          vm.$message({
            message: '操作成功',
            type: 'success'
          });
          vm.cancelModal('add');
        });
      },
      cancelModal (sign) {
        this.$emit('refuseModalModalClose', sign);
      }
    }
  };
</script>
