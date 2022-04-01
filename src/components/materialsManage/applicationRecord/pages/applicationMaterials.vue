<template>
  <div class="applicationMaterialsPage">
    <div class="modal-bg">
      <div class="modal w-50" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">物料申请</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body" v-for="(itemF, index) in formList" :key="itemF.id" style="background: #ecf5ff; padding: 20px 20px 0 0;">
          <div class="text-r" v-if="index !== 0"><el-button type="danger" @click="delMaterials(index)" size="small">删除</el-button></div>
          <el-form label-width="100px" class="margin-t-20">
            <el-form-item label="类型" class="w-50" prop="type" size="small">
              <el-select v-model="itemF.type" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品名称" class="w-50" prop="goodsName" size="small">
              <el-select v-model="itemF.goodsName" placeholder="请选择" v-if="itemF.type === '教具'">
                <el-option v-for="item in goodsList1" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
              <el-select v-model="itemF.goodsName" placeholder="请选择" v-if="itemF.type === '消耗品'">
                <el-option v-for="item in goodsList2" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量" class="w-50"  prop="quantity">
              <el-input-number v-model="itemF.quantity" size="small" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
            <span class="f14 warn" style="display: inline-block; margin: 10px 0 0 20px;">（*当前可申请数量 50）</span>
            <el-form-item label="用途" class="w-50" prop="purpose" size="small">
              <el-select v-model="itemF.purpose" placeholder="请选择">
                <el-option v-for="item in purposeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教室名称" class="w-50" v-if="itemF.purpose === '教学'">
              <el-input placeholder="请输入教室名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="领取日期" class="w-50" prop="time" size="small">
              <el-date-picker type="date" placeholder="选择日期" v-model="itemF.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="cancelModal()" size="small">确定</el-button>
          <el-button type="warning" @click="addMaterials()" size="small">添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'applicationMaterials',
    data () {
      return {
        purposeList: [
          {
            name: '教学'
          },
          {
            name: '其他'
          }
        ],
        typeList: [
          {
            name: '教具'
          },
          {
            name: '消耗品'
          }
        ],
        goodsList1: [
          {
            name: '直尺'
          },
          {
            name: '卷尺'
          },
          {
            name: '游标卡尺'
          },
          {
            name: '拐尺'
          }
        ],
        goodsList2: [
          {
            name: '手套'
          },
          {
            name: '粉笔'
          },
          {
            name: '护目镜'
          },
          {
            name: '焊丝'
          }
        ],
        formList: [
          {
            type: '教具',
            goodsName: '',
            quantity: '',
            purpose: '',
            time: ''
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
    },
    methods: {
      addMaterials () {
        let item = {
          type: '教具',
          goodsName: '',
          quantity: '',
          purpose: '',
          time: ''
        };
        this.formList.push(item);
      },
      delMaterials (index) {
        this.formList.splice(index, 1);
      },
      cancelModal (sign) {
        this.$emit('applicationMaterialsModalClose', sign);
      }
    }
  };
</script>
