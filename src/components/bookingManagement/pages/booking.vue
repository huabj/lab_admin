<template>
  <div class="bookingPage">
    <div class="modal-bg">
      <div class="modal" style="width: 350px;" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">{{passInfo.item.name}}</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <p class="f14">实训室容纳人数<span class="margin-lr-5 color-blue">{{passInfo.item.peopleLimitName}}</span>人</p>
          <p class="f14">该实训室适合<span class="margin-lr-5 color-blue">{{passInfo.item.typeName}}</span></p>
          <p class="f14">设备数量<span class="margin-lr-5 color-blue">{{passInfo.item.equipmentNum}}</span>台</p>
          <el-form ref="addSubscribeForm" :model="addSubscribeForm" :rules="rules" label-width="100px">
            <el-form-item label="课程名称" class="w-100" size="small">
              <el-select placeholder="请选择" v-model="value" @change="changeValue">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上课班级" class="w-100" size="small">
              <el-select placeholder="请选择" v-model="labelValue">
                <el-option v-for="item in labelOptions" :key="item.id" :label="item.lable" :value="item.lable"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间段" prop="checkList">
              <el-checkbox-group v-model="addSubscribeForm.checkList">
                <el-checkbox  v-for="item in unSubscribeList" :key="item.id" :value="item.courseId" :label="item.courseId">{{item.courseName + '  -  ' + item.subscribeStartTime + '  -  ' + item.subscribeEndTime}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p class="f12 margin-t-10 color-orange" v-if="unSubscribeList.length <= 0">暂无可以预约的数据</p>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('addSubscribeForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'booking',
    data () {
      return {
        addSubscribeForm: {
          checkList: [],
          laboratoryId: '',
          courseTimeId: '',
          subscribeTime: '',
          status: 1
        },
        rules: {
          checkList: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        currentDate: '',
        unSubscribeList: [],
        options: [{
          label: '柔性制造系统',
          list: [
            {
              lable: '数控191'
            },
            {
              lable: '数控192'
            },
            {
              lable: '数控193'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '智控191'
            },
            {
              lable: '智控192'
            },
            {
              lable: '智控193'
            }
          ]
        }, {
          label: '工业机器人应用技术',
          list: [
            {
              lable: '数控191'
            },
            {
              lable: '数控192'
            },
            {
              lable: '数控193'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '智控191'
            },
            {
              lable: '智控192'
            },
            {
              lable: '智控193'
            }
          ]
        }, {
          label: 'IEC6113-3编程语言',
          list: [
            {
              lable: '数控191'
            },
            {
              lable: '数控192'
            },
            {
              lable: '数控193'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '智控191'
            },
            {
              lable: '智控192'
            },
            {
              lable: '智控193'
            }
          ]
        }, {
          label: '冲模综合训练',
          list: [
            {
              lable: '模具191           '
            },
            {
              lable: '模具192'
            },
            {
              lable: '模具201'
            },
            {
              lable: '模具202'
            },
            {
              lable: '模具203'
            }
          ]
        }, {
          label: '塑模综合训练',
          list: [
            {
              lable: '模具191           '
            },
            {
              lable: '模具192'
            },
            {
              lable: '模具201'
            },
            {
              lable: '模具202'
            },
            {
              lable: '模具203'
            }
          ]
        }, {
          label: '塑料模具设计与制造',
          list: [
            {
              lable: '模具191           '
            },
            {
              lable: '模具192'
            },
            {
              lable: '模具201'
            },
            {
              lable: '模具202'
            },
            {
              lable: '模具203'
            }
          ]
        }, {
          label: '冲压模具设计与制造',
          list: [
            {
              lable: '模具191           '
            },
            {
              lable: '模具192'
            },
            {
              lable: '模具201'
            },
            {
              lable: '模具202'
            },
            {
              lable: '模具203'
            }
          ]
        }, {
          label: '开放式数控系统',
          list: [
            {
              lable: '数控191'
            },
            {
              lable: '数控192'
            },
            {
              lable: '数控193'
            }
          ]
        }, {
          label: '数控编程与加工',
          list: [
            {
              lable: '博世201'
            }
          ]
        }, {
          label: '可编程序控制器',
          list: [
            {
              lable: '博世201'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '数控202'
            }
          ]
        }, {
          label: '电机与电气控制技术',
          list: [
            {
              lable: '博世201'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '数控202'
            }
          ]
        }, {
          label: '数控机床电气传动',
          list: [
            {
              lable: '博世201'
            },
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            },
            {
              lable: '数控202'
            }
          ]
        }, {
          label: '数控机床电气传动',
          list: [
            {
              lable: '数控194'
            },
            {
              lable: '数控195'
            },
            {
              lable: '数控201'
            },
            {
              lable: '数控202'
            },
            {
              lable: '机制193'
            },
            {
              lable: '机制194'
            },
            {
              lable: '机器人203'
            }
          ]
        }, {
          label: '机床电气',
          list: [
            {
              lable: '数控194'
            },
            {
              lable: '数控195'
            },
            {
              lable: '数控201'
            },
            {
              lable: '数控202'
            },
            {
              lable: '机制193'
            },
            {
              lable: '机制194'
            },
            {
              lable: '机器人203'
            }
          ]
        }, {
          label: '电机与电气控制技术',
          list: [
            {
              lable: '数控194'
            },
            {
              lable: '数控195'
            },
            {
              lable: '数控201'
            },
            {
              lable: '数控202'
            },
            {
              lable: '机制193'
            },
            {
              lable: '机制194'
            },
            {
              lable: '机器人203'
            }
          ]
        }, {
          label: '机床电气控制系统的安装与调试',
          list: [
            {
              lable: '数控194'
            },
            {
              lable: '数控195'
            },
            {
              lable: '数控201'
            },
            {
              lable: '数控202'
            },
            {
              lable: '机制193'
            },
            {
              lable: '机制194'
            },
            {
              lable: '机器人203'
            }
          ]
        }, {
          label: '可编程控制器与人机界面',
          list: [
            {
              lable: '机器人203'
            },
            {
              lable: '机器人201'
            }
          ]
        }, {
          label: '全员设备维护（TPM）',
          list: [
            {
              lable: '机电191'
            },
            {
              lable: '机电192'
            },
            {
              lable: '机电193'
            },
            {
              lable: '机电194'
            },
            {
              lable: '机电195'
            }
          ]
        }, {
          label: '工业机器人工作站集成',
          list: [
            {
              lable: '机器人192'
            }
          ]
        }, {
          label: '传感器与机器视觉技术',
          list: [
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            }
          ]
        }, {
          label: '电机与电气控制技术',
          list: [
            {
              lable: '机电201'
            },
            {
              lable: '机电202'
            },
            {
              lable: '机电203'
            },
            {
              lable: '机电204'
            },
            {
              lable: '机电205'
            }
          ]
        }],
        value: '',
        labelOptions: [],
        labelValue: ''
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
      changeValue () {
        this.labelValue = '';
        for (let i = 0; i < this.options.length; i++) {
          if (this.value === this.options[i].label) {
            this.labelOptions = this.options[i].list;
            return;
          }
        }
      },
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
        for (let i = 0; i < this.passInfo.item.unSubscribeList.length; i++) {
          let temp = this.passInfo.currentDate.split('-');
          let data = temp[0] + temp[1] + temp[2];
          let temp2 = this.passInfo.item.unSubscribeList[i].subscribeStartTime.split(':');
          let time = temp2[0] + temp2[1] + '00';
          let dataTime = data + time;
          if (this.currentDate < dataTime) {
            this.unSubscribeList.push(this.passInfo.item.unSubscribeList[i]);
          }
        }
      },
      submit (addSubscribeForm) {
        this.$refs[addSubscribeForm].validate((valid) => {
          if (valid) {
            this.addSubscribeSave();
          } else {
            return false;
          }
        });
      },
      addSubscribeSave () {
        for (let i = 0; i < this.addSubscribeForm.checkList.length; i++) {
          let item = {
            courseTimeId: this.addSubscribeForm.checkList[i],
            laboratoryId: this.passInfo.item.id,
            subscribeTime: this.passInfo.currentDate,
            status: 1
          };
          let vm = this;
          this.$Service.addSubscribe(item).then(function (res) {
            if (res.data.data !== undefined) {
            }
          });
        }
        this.$nextTick(() => {
          this.$alert('预约成功,请按时上课！', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          this.cancelModal('add');
        });
      },
      cancelModal (sign) {
        this.$emit('bookingModalClose', sign);
      }
    }
  };
</script>
