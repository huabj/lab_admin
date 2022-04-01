<template>
  <div class="addLabPage">
    <el-button type="primary" size="small" @click="goLabIntroduce">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <el-form label-width="100px" label-position="top" class="margin-t-20" ref="addLabForm" :model="addLabForm" :rules="rules">
      <div class="addLab">
        <div class="title">
          <span class="span-l" v-if="currentMenu.row === undefined">创建实训室</span>
          <span class="span-l" v-else>修改实训室</span>
          <div class="clearfix"></div>
        </div>
        <p class="f16 margin-t-20" style="padding: 0 10px;">实训室基础信息</p>
        <div class="addLabInfo margin-t-10">
          <div class="addLabInfo-2 flex">
            <div class="addLabInfo-2-l">
              <el-form-item label="实训室编号" prop="number">
                <el-input placeholder="请输入实训室编号" size="small" v-model="addLabForm.number"></el-input>
              </el-form-item>
            </div>
            <div class="addLabInfo-2-r">
              <el-form-item label="实训室名称" prop="name">
                <el-input placeholder="请输入实训室名称" size="small" v-model="addLabForm.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="addLabInfo-2 flex">
            <div class="addLabInfo-2-l">
              <el-form-item label="实训室类别" prop="type">
                <el-select v-model="addLabForm.type" size="small" placeholder="请选择">
                  <el-option v-for="item in labTypeList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="addLabInfo-2-r">
              <el-form-item label="实训室可容纳人数" prop="peopleLimit">
                <el-select v-model="addLabForm.peopleLimit" size="small" placeholder="请选择">
                  <el-option v-for="item in peopleLimitList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="addLab margin-t-20">
        <p class="f16 margin-b-10" style="padding: 0 10px;">实训室位置信息</p>
        <div class="addLabInfo-2 flex">
          <div class="addLabInfo-2-l">
            <el-form-item label="教学楼名称" prop="floorId">
              <el-select v-model="addLabForm.floorId" size="small" placeholder="请选择" @change="selectFloor()">
                <el-option v-for="item in floorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="addLabInfo-2-r">
            <el-form-item label="教室位置" prop="floorAddress">
              <el-input placeholder="请输入教室位置" size="small" v-model="addLabForm.floorAddress"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="addLab margin-t-20">
        <p class="f16 margin-b-10" style="padding: 0 10px;">实训室设备信息</p>
        <div class="addLabInfo-2 flex">
          <div class="addLabInfo-2-l">
            <el-form-item label="班牌MAC地址" prop="classMacAddress">
              <el-input placeholder="请输入班牌MAC地址" size="small" v-model="addLabForm.classMacAddress"></el-input>
            </el-form-item>
          </div>
          <div class="addLabInfo-2-r">
            <el-form-item label="摄像头MAC地址" prop="cameraNumber">
              <el-input placeholder="请输入摄像头MAC地址" size="small" v-model="addLabForm.cameraNumber"></el-input>
            </el-form-item>
          </div>
        </div>
        <div style="margin: 0 0 0 5px;">
          <el-button type="primary" size="small" @click="addEqu">添加实训室设备</el-button>
          <div style="width: 100%; height: 20px;"></div>
        </div>
        <div class="addLabInfo-2 flex" v-for="(item, index) in addLabForm.equipmentList" :key="item.id">
          <div class="addLabInfo-2-l flex">
            <div class="addLabInfo-2-l-l w-50">
<!--              <el-form-item label="设备名称" prop="equipmentList">-->
<!--                <el-select v-model="item.name" size="small" placeholder="请选择" @change="selectEqu($event, index)">-->
<!--                  <el-option v-for="item in labEquTypeList" :key="item.id" :label="item.label" :value="item"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
              <el-form-item label="设备名称" prop="equipmentList">
                <el-input placeholder="请输入设备名称" size="small" v-model="item.name"></el-input>
              </el-form-item>
            </div>
<!--            <i class="addIcon el-icon-plus" v-if="index === 0" @click="addEqu()"></i>-->
            <i class="addIcon el-icon-minus" @click="deleteEqu(index)"></i>
            <div class="addLabInfo-2-l-r w-50">
              <el-form-item label="设备数量">
                <el-input placeholder="请输入设备数量" size="small" v-model="item.equipmentNum"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="addLabInfo-2-r">
            <el-form-item label="设备编码">
              <el-input placeholder="请输入设备编码" size="small" v-model="item.number"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="addLab margin-t-20" style="padding: 20px;">
        <el-form-item label="安全模块" prop="moduleList">
          <el-checkbox-group v-model="addLabForm.moduleList">
            <div style="display: flex; flex-wrap: wrap; justify-content: center; padding: 0 50px;">
              <div class="w-25 text-c" v-for="item in labModuleList" :key="item.id">
                <el-checkbox :label="item.id" :value="item">
                  <img :src="$Config.POST_URL + '/file/图片/' + item.picUrl" class="w-50">
                </el-checkbox>
                <p>{{item.name}}</p>
              </div>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="addLab margin-t-20">
        <p class="f16 margin-b-10" style="padding: 0 10px;">实训室介绍信息</p>
        <div class="addLabInfo-2 flex">
          <div class="addLabInfo-2-l">
            <el-form-item label="实训室文字介绍" prop="remark">
              <el-input type="textarea" v-model="addLabForm.remark"></el-input>
            </el-form-item>
          </div>
          <div class="addLabInfo-2-r">
            <el-form-item label="实训室视频介绍" prop="resourceList">
<!--              <el-input type="textarea" v-model="addLabForm.remark"></el-input>-->
              <ul>
                <li v-for="(item, index) in addLabForm.resourceList" :key="item.id">
                  <img :src="$Config.POST_URL + '/file/图片/' + item.realName" v-if="item.type === '图片'" style="width: 150px; height: 150px;">
                  <video  style="width: 150px; height: 150px;" v-if="item.type === '视频'" :src="$Config.POST_URL + '/file/视频/' + item.realName" controls="controls">您的浏览器不支持 video 标签。</video>
                  <i class="el-icon-close" @click="deleteAvatar(index)"></i>
                </li>
                <li>
                  <label @change="uploadFile($event)" class="uploadFile">
                    <img src="../../../assets/img/upload-2.png">
                    <input class="none" name="filename" type="file" ref="clearFile" accept="*">
                  </label>
                </li>
              </ul>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="but w-100 text-c"><el-button size="small" type="primary" @click="submit('addLabForm')">&nbsp;&nbsp;&nbsp;&nbsp;提交&nbsp;&nbsp;&nbsp;&nbsp;</el-button></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'addLab',
    data () {
      return {
        floorList: [],
        labModuleList: [],
        addLabForm: {
          id: '',
          number: '',
          name: '',
          type: '',
          peopleLimit: '',
          floorId: '',
          floorAddress: '',
          classMacAddress: '',
          clientMacAddress: '',
          cameraNumber: '',
          // 使用状态(1-使用中，2-未使用)
          status: 1,
          equipmentList: [
            {
              equipmentNum: '',
              number: '',
              name: '',
              type: ''
            }
          ],
          resourceList: [],
          moduleList: [],
          remark: ''
        },
        rules: {
          type: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          peopleLimit: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          floorId: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入实训室编号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入实训室名称', trigger: 'blur'}
          ],
          floorAddress: [
            {required: true, message: '请输入教室位置', trigger: 'blur'}
          ],
          classMacAddress: [
            {required: true, message: '请输入班牌显示器IP', trigger: 'blur'}
          ],
          cameraNumber: [
            {required: true, message: '请输入实训室终端管理器IP', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          equipmentList: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          moduleList: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          resourceList: [
            {required: true, message: '请至少选择一张图片或者一个视频', trigger: 'change'}
          ]
        }
      };
    },
    computed: {
      ...mapState([
        'currentMenu',
        'labTypeList',
        'peopleLimitList',
        'labEquTypeList'
      ])
    },
    created () {
      this.floorList = this.currentMenu.floorList;
      this.getLabModule();
    },
    methods: {
      deleteAvatar (index) {
        this.addLabForm.resourceList.splice(index, 1);
      },
      // 上传图片
      uploadFile (e) {
        this.taskFile = e.target.files[0];
        this.fileUploadSubmit();
      },
      fileUploadSubmit () {
        let formData = new FormData();
        formData.append('file', this.taskFile);
        formData.append('name', this.taskFile.name);
        formData.append('chunk', '0');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        let vm = this;
        this.$Service.localStorage(formData, config).then(function (res) {
          if (res.data.data !== undefined) {
            let item = {
              id: res.data.data.id,
              realName: res.data.data.realName,
              type: res.data.data.type
            };
            vm.addLabForm.resourceList.push(item);
          } else {
            vm.taskFile = {};
          }
        });
      },
      getLabModule () {
        let vm = this;
        this.$Service.labModule().then(function (res) {
          if (res.data.data !== undefined) {
            vm.labModuleList = res.data.data;
            if (vm.currentMenu.row !== undefined) {
              vm.getLaboratoryOne();
            }
          }
        });
      },
      selectEqu (e, index) {
        this.addLabForm.equipmentList[index].name = e.label;
        this.addLabForm.equipmentList[index].type = e.value;
      },
      // 信息提交
      submit (addLabForm) {
        this.$refs[addLabForm].validate((valid) => {
          if (valid) {
            for (let i = 0; i < this.addLabForm.equipmentList.length; i++) {
              if (this.currentMenu.row !== undefined) {
                if (this.addLabForm.equipmentList[i].equipmentNum === '' || this.addLabForm.equipmentList[i].name === '' || this.addLabForm.equipmentList[i].number === '') {
                  this.$alert('请选择或者输入设备信息！', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                  return;
                }
              } else {
                if (this.addLabForm.equipmentList[i].equipmentNum === '' || this.addLabForm.equipmentList[i].name === '' || this.addLabForm.equipmentList[i].number === '') {
                  this.$alert('请选择或者输入设备信息！', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                  return;
                }
              }
            }
            this.addLabEquSave();
          } else {
            return false;
          }
        });
      },
      addLabEquSave () {
        let vm = this;
        let list = [];
        for (let i = 0; i < this.addLabForm.moduleList.length; i++) {
          for (let j = 0; j < this.labModuleList.length; j++) {
            if (this.addLabForm.moduleList[i] === this.labModuleList[j].id) {
              list.push(this.labModuleList[j]);
            }
          }
        }
        this.$nextTick(() => {
          this.addLabForm.moduleList = list;
          if (this.currentMenu.row === undefined) {
            this.$Service.addLab(this.addLabForm).then(function (res) {
              if (res.data.data !== undefined) {
                if (res.data.data === false) {
                  vm.$alert(res.data.msg, '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                } else {
                  vm.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  vm.goLabIntroduce();
                }
              }
            });
          } else {
            this.$Service.updateLab(this.addLabForm).then(function (res) {
              if (res.data.data !== undefined) {
                if (res.data.data === false) {
                  vm.$alert(res.data.msg, '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                } else {
                  vm.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  vm.goLabIntroduce();
                }
              }
            });
          }
        });
      },
      selectFloor () {
        for (let i = 0; i < this.floorList.length; i++) {
          if (this.addLabForm.floorId === this.floorList[i].id) {
            this.addLabForm.floorAddress = this.floorList[i].address;
            break;
          }
        }
      },
      addEqu () {
        let item = {
        };
        this.addLabForm.equipmentList.push(item);
      },
      deleteEqu (index) {
        this.addLabForm.equipmentList.splice(index, 1);
      },
      // 返回
      goLabIntroduce () {
        if (this.currentMenu.sign === 'labIntroduceStyleTwo' || this.currentMenu.sign === 'labIntroduceStyleOne') {
          let currentMenu = {
            component: 'labIntroduce',
            sign: this.currentMenu.sign
          };
          this.$store.commit('changeUrl', currentMenu);
        } else {
          let currentMenu = {
            component: 'labManager',
            sign: this.currentMenu.sign
          };
          this.$store.commit('changeUrl', currentMenu);
        }
      },
      getLaboratoryOne () {
        let vm = this;
        this.$Service.laboratoryOne(this.currentMenu.row.id).then(function (res) {
          if (res.data.data !== undefined) {
            vm.getValue(res.data.data);
          }
        });
      },
      getValue (data) {
        this.addLabForm.id = data.id;
        this.addLabForm.number = data.number;
        this.addLabForm.name = data.name;
        this.addLabForm.type = data.type + '';
        this.addLabForm.peopleLimit = data.peopleLimit + '';
        this.addLabForm.floorId = data.floorId;
        this.addLabForm.floorAddress = data.floorAddress;
        this.addLabForm.classMacAddress = data.classMacAddress;
        this.addLabForm.clientMacAddress = data.clientMacAddress;
        this.addLabForm.cameraNumber = data.cameraNumber;
        this.addLabForm.equipmentList = [];
        for (let i = 0; i < data.equipmentList.length; i++) {
          let item = {
            id: data.equipmentList[i].id,
            equipmentNum: '1',
            number: data.equipmentList[i].number,
            name: data.equipmentList[i].name,
            type: data.equipmentList[i].type
          };
          this.addLabForm.equipmentList.push(item);
        }
        this.addLabForm.resourceList = data.resourceData;
        this.addLabForm.remark = data.remark;
        if (data.moduleList !== null && data.moduleList !== undefined && data.moduleList !== '') {
          for (let i = 0; i < data.moduleList.length; i++) {
            for (let j = 0; j < this.labModuleList.length; j++) {
              if (data.moduleList[i].id === this.labModuleList[j].id) {
                this.addLabForm.moduleList.push(data.moduleList[i].id);
              }
            }
          }
        }
      }
    }
  };
</script>
