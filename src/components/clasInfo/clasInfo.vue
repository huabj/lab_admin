<template>
  <div class="clasInfoPage">
    <div class="clasInfo-l">
      <div class="title">
        <span class="span-l">消息发布</span>
        <div class="button">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clasInfo-l-n" :style="{'height': (screenHeight - 325) + 'px'}">
        <el-form label-width="100px" class="margin-t-20" ref="addMessageForm" :model="addMessageForm" :rules="rules">
          <el-form-item label="标题" class="w-100" prop="title">
            <el-input placeholder="请输入标题" size="small" v-model="addMessageForm.title"></el-input>
          </el-form-item>
          <el-form-item label="类别" class="w-100" prop="type">
            <el-select size="small" placeholder="请选择类别" v-model="addMessageForm.type">
              <el-option v-for="(item, index) in classMessageTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实训室" class="w-100">
            <div class="lab" id="lab">
              <div class="span" v-for="(item, index) in relationList" :key="index" @click="selectFloor(item, index)" :class="{'active': currentIndex === index}">
                {{item.floor.name}}
              </div>
              <div class="relationIds">
                <div class="relationIds-1">
                  <el-radio v-model="item.floor.sign" :label="1" name="radio" @change="changeSign(1, item.laboratoryList)">单选</el-radio>
                  <el-radio v-model="item.floor.sign" :label="2" name="radio" @change="changeSign(2, item.laboratoryList)">多选</el-radio>
                  <el-radio v-model="item.floor.sign" :label="3" name="radio" @change="changeSign(3, item.laboratoryList)">全选</el-radio>
                </div>
                <div class="relationIds-2" id="relationIds2">
                  <span v-for="(ite, ind) in item.laboratoryList" :key="ind" :class="{'active': ite.selected === 1}" @click="selectLab(item, ite)">{{ite.name}}</span>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="定时" prop="issueTime">
            <div class="time">
              <el-date-picker :disabled="addMessageForm.status === false" class="w-50" type="date" placeholder="选择日期" v-model="addMessageForm.issueTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              <el-time-select :disabled="addMessageForm.status === false" placeholder="起始时间" class="margin-l-20" v-model="addMessageForm.startTime" :picker-options="{start: '08:00', step: '00:01', end: '20:00'}"></el-time-select>
              <el-time-select :disabled="addMessageForm.status === false" placeholder="结束时间" class="margin-l-10" v-model="addMessageForm.endTime" :picker-options="{start: '08:00', step: '00:01', end: '20:00', minTime: addMessageForm.startTime}"></el-time-select>
              <el-checkbox v-model="addMessageForm.status" style="margin: 0 20px 0 30px;" @change="chgeStatus"></el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label="是否循环">
            <!--是否循环，0-否，1-是-->
            <el-radio-group v-model="addMessageForm.messageContent.cycleType">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="布局方式">
            <!--布局类型，1-布局1，2-布局2，3-布局3-->
            <div class="margin-b-10">
              <el-radio-group v-model="addMessageForm.messageContent.layoutType">
                <el-radio :label="1" @change="clear()">布局方式一</el-radio>
                <el-radio :label="2" @change="clear()">布局方式二</el-radio>
                <el-radio :label="3" @change="clear()">布局方式三</el-radio>
              </el-radio-group>
            </div>
            <div class="layoutType-1" v-if="addMessageForm.messageContent.layoutType === 1">
              <el-input type="textarea" v-model="addMessageForm.messageContent.content" maxlength="100" show-word-limit placeholder="请输入内容"></el-input>
            </div>
            <div class="layoutType-2" v-if="addMessageForm.messageContent.layoutType === 2">
              <ul>
                <li v-for="(item, index) in resourceIdList" :key="index"><img :src="$Config.POST_URL + '/file/图片/' + item.realName"><i class="el-icon-close" @click="deleteAvatar(index)"></i></li>
                <li>
                  <label @change="uploadFile($event)" class="uploadFile">
                    <img src="../../assets/img/upload-2.png">
                    <input class="none" name="filename" type="file" ref="clearFile" accept="image/jpeg, image/png">
                  </label>
                </li>
              </ul>
            </div>
            <div class="layoutType-3" v-if="addMessageForm.messageContent.layoutType === 3">
              <div class="layoutType-3-1">
                <!--样式类型，1-左右，2-上下-->
                <span :class="{'active': currentType === 1}" @click="selectType(1)">左右排版</span>
                <span :class="{'active': currentType === 2}" @click="selectType(2)">上下排版</span>
              </div>
              <div class="layoutType-3-2" :class="{'flex': currentType === 1}">
                <div class="layoutType-3-2-l margin-t-20" :class="{'w-50': currentType === 1}">
                  <el-input type="textarea" v-model="addMessageForm.messageContent.content" maxlength="100" show-word-limit placeholder="请输入内容"></el-input>
                </div>
                <div class="layoutType-3-2-r margin-t-20" :class="{'w-50': currentType === 1}">
                  <ul>
                    <li :class="{'margin-lb-20': currentType === 1}" v-for="(item, index) in resourceIdList" :key="index"><img :src="$Config.POST_URL + '/file/图片/' + item.realName"><i class="el-icon-close" @click="deleteAvatar(index)"></i></li>
                    <li :class="{'margin-lb-20': currentType === 1}">
                      <label @change="uploadFile($event)" class="uploadFile">
                        <img src="../../assets/img/upload-2.png">
                        <input class="none" name="filename" type="file" ref="clearFile" accept="image/jpeg, image/png">
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="text-c">
          <el-button type="primary" @click="submit('addMessageForm')" size="small" icon="el-icon-s-promotion">马上发布</el-button>
        </div>
      </div>
    </div>
    <div class="clasInfo-r">
      <div class="title">
        <span class="span-l">发布历史</span>
        <div class="button">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clasInfo-r-n" :style="{'height': (screenHeight - 325) + 'px'}">
        <p v-if="classMessageList.length <= 0">暂无数据...</p>
        <ul v-else>
          <li v-for="(item, index) in classMessageList" :key="index">
            <h2 class="w-100">{{item.issueTime}}
              <!--状态，1-发布，2-禁用，3-定时-->
              <span v-if="item.status === 1" class="color-blue">已发布</span>
              <span v-if="item.status === 2" class="color-blue">已禁用</span>
              <span v-if="item.status === 3" class="color-blue">已定时</span>
            </h2>
            <div class="list w-70">
              <div class="list-left">标题</div>
              <div class="list-right border-b-1 padding-lr-20">{{item.title}}</div>
              <div class="clearfix"></div>
            </div>
            <div class="list w-30">
              <div class="list-left">类别</div>
              <div class="list-right border-b-1 text-c">{{item.typeName}}</div>
              <div class="clearfix"></div>
            </div>
            <div class="list w-100">
              <div class="list-left">实训室</div>
              <div class="list-right">
                <div v-for="(ite, ind) in item.relations" :key="ind">
                  <h3>{{ite.floor.name}}</h3>
                  <p><span v-for="(it, int) in ite.laboratoryList" :key="int" v-if="it !== null">{{it.name}}</span></p>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="list w-100">
              <div class="list-left">定时</div>
              <div class="list-right color-blue">{{item.issueTime}}&nbsp;&nbsp;{{item.startTime}}-{{item.endTime}}</div>
              <div class="clearfix"></div>
            </div>
            <!--布局类型，1-布局1，2-布局2，3-布局3-->
            <div class="list w-100" v-if="item.messageContent.layoutType === 1">
              <div class="list-left">发布内容</div>
              <div class="list-right border-b-1 padding-lr-20" style="height: 150px; overflow-y: auto; overflow-x: hidden; width: calc(100% - 135px);">{{item.messageContent.content}}</div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="list w-100" v-if="item.messageContent.layoutType === 2">
              <div class="list-left">发布内容</div>
              <div class="list-right border-b-1" style="display: flex; flex-wrap: wrap; padding: 20px 10px;">
                <div v-for="itemP in item.messageContent.resourceUrls" :key="itemP.id" class="margin-l-10" style="width: 100px; height: 100px;">
                  <img :src="$Config.POST_URL + '/file/图片/' + itemP" style="width: 100px; height: 100px;">
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="list w-100" v-if="item.messageContent.layoutType === 3">
              <div class="list-left">发布内容</div>
              <div class="list-right border-b-1 padding-lr-20" style="width: calc(50% - 135px); height: 150px; overflow-y: auto; overflow-x: hidden;" v-if="item.messageContent.styleType === 1">{{item.messageContent.content}}</div>
              <div class="list-right" v-if="item.messageContent.styleType === 1" style="width: calc(50% - 135px); display: flex; flex-wrap: wrap;">
                <div v-for="itemP in item.messageContent.resourceUrls" :key="itemP.id" class="margin-l-10" style="width: 100px; height: 100px;">
                  <img :src="$Config.POST_URL + '/file/图片/' + itemP" style="width: 100px; height: 100px;">
                </div>
              </div>
              <div class="list-right" v-if="item.messageContent.styleType === 2">
                <div class="border-b-1 padding-lr-20" style=" width: calc(100% - 40px); height: 150px; overflow-y: auto; overflow-x: hidden; border-radius: 5px;">{{item.messageContent.content}}</div>
                <div class="margin-t-20" style="display: flex; flex-wrap: wrap;">
                  <div v-for="itemP in item.messageContent.resourceUrls" :key="itemP.id" class="margin-r-10" style="width: 100px; height: 100px;">
                    <img :src="$Config.POST_URL + '/file/图片/' + itemP" style="width: 100px; height: 100px;">
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="list w-100">
              <div class="list-left"></div>
              <div class="list-right text-r" style="width: calc(100% - 20px);">
                <!--状态，1-发布，2-禁用，3-定时-->
<!--                <el-button type="primary" size="small" v-if="item.status === 3" @click="changeStatus(item, 1)">发布</el-button>-->
                <el-button type="primary" size="small" @click="changeStatus(item, 2)" v-if="item.status !== 2">禁用</el-button>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'clasInfo',
    data () {
      return {
        topHeight: 0,
        labWidth: 0,
        relationIds2: 0,
        currentIndex: 0,
        currentType: 1,
        classMessageTypeList: [],
        addMessageForm: {
          title: '',
          type: '',
          messageContent: {
            layoutType: 1,
            styleType: 1,
            cycleType: 1,
            content: '',
            resourceId: []
          },
          issueTime: '',
          startTime: '8:00',
          endTime: '20:00',
          status: false,
          relationIds: []
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          issueTime: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        relationList: [],
        item: {
          floor: {
            sign: 1
          }
        },
        taskFile: {},
        classMessageList: [],
        resourceIdList: [],
        updateClassMessageForm: {
          id: '',
          status: '',
          relationIds: [],
          messageContent: {}
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
      this.getDictDetail();
      this.getRelation();
      this.getClassMessageList();
      this.getCurrentTime();
    },
    mounted () {
      this.topHeight = document.getElementById('lab').offsetHeight;
      this.labWidth = document.getElementById('lab').offsetWidth;
    },
    methods: {
      // 获取当前时间
      getCurrentTime () {
        let aData = new Date();
        this.addMessageForm.issueTime = aData.getFullYear() + '-' + (aData.getMonth() + 1) + '-' + aData.getDate();
      },
      chgeStatus () {
        if (this.addMessageForm.status === false) {
          this.getCurrentTime();
          this.addMessageForm.startTime = '8:00';
          this.addMessageForm.endTime = '20:00';
        }
      },
      changeStatus (item, status) {
        this.updateClassMessageForm.id = item.id;
        this.updateClassMessageForm.status = status;
        for (let i = 0; i < item.relations.length; i++) {
          let data = {
            floorId: item.relations[i].floor.id,
            laboratoryIds: []
          };
          for (let j = 0; j < item.relations[i].laboratoryList.length; j++) {
            data.laboratoryIds.push(item.relations[i].laboratoryList[j].id);
          }
          this.updateClassMessageForm.relationIds.push(data);
        }
        this.updateClassMessageForm.messageContent = item.messageContent;
        this.$confirm('是否确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let vm = this;
          this.$Service.updateClassMessage(this.updateClassMessageForm).then(function (res) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.getClassMessageList();
          });
        }).catch(() => {
        });
      },
      // 查询字典
      getDictDetail () {
        let vm = this;
        this.$Service.dictDetail('class_message_type').then(function (res) {
          if (res.data.data !== undefined) {
            vm.classMessageTypeList = res.data.data.class_message_type;
          }
        });
      },
      // relation
      getRelation () {
        let vm = this;
        this.$Service.relation().then(function (res) {
          if (res.data.data !== undefined) {
            vm.relationList = res.data.data;
            if (vm.relationList.length > 0) {
              for (let i = 0; i < vm.relationList.length; i++) {
                vm.$set(vm.relationList[i].floor, 'sign', 1);
                for (let j = 0; j < vm.relationList[i].laboratoryList.length; j++) {
                  vm.$set(vm.relationList[i].laboratoryList[j], 'selected', 0);
                }
              }
              vm.item = vm.relationList[0];
            }
          }
        });
      },
      selectFloor (item, index) {
        this.currentIndex = index;
        this.item = item;
      },
      selectLab (item, ite) {
        if (item.floor.sign === 1) {
          for (let i = 0; i < item.laboratoryList.length; i++) {
            item.laboratoryList[i].selected = 0;
          }
          ite.selected = 1;
        } else if (item.floor.sign === 2) {
          if (ite.selected === 0) {
            ite.selected = 1;
          } else {
            ite.selected = 0;
          }
        } else if (item.floor.sign === 3) {
        }
      },
      changeSign (sign, laboratoryList) {
        if (sign === 1) {
          for (let i = 0; i < laboratoryList.length; i++) {
            laboratoryList[i].selected = 0;
          }
        } else if (sign === 2) {
          for (let i = 0; i < laboratoryList.length; i++) {
            laboratoryList[i].selected = 0;
          }
        } else if (sign === 3) {
          for (let i = 0; i < laboratoryList.length; i++) {
            laboratoryList[i].selected = 1;
          }
        }
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
              realName: res.data.data.realName
            };
            vm.resourceIdList.push(item);
          } else {
            vm.taskFile = {};
          }
        });
      },
      selectType (index) {
        this.currentType = index;
        this.addMessageForm.messageContent.styleType = index;
      },
      clear () {
        this.addMessageForm.messageContent.content = '';
        this.addMessageForm.messageContent.resourceId = [];
      },
      deleteAvatar (index) {
        this.resourceIdList.splice(index, 1);
      },
      submit (addMessageForm) {
        this.$refs[addMessageForm].validate((valid) => {
          if (valid) {
            for (let t = 0; t < this.relationList.length; t++) {
              if (this.resourceIdList[t] !== undefined) {
                this.addMessageForm.messageContent.resourceId.push(this.resourceIdList[t].id);
              }
            }
            if (this.addMessageForm.status === true) {
              this.addMessageForm.status = 3;
            } else if (this.addMessageForm.status === false) {
              this.addMessageForm.status = '';
            }
            for (let i = 0; i < this.relationList.length; i++) {
              let item = {
                floorId: this.relationList[i].floor.id,
                laboratoryIds: []
              };
              this.addMessageForm.relationIds.push(item);
              for (let j = 0; j < this.relationList[i].laboratoryList.length; j++) {
                if (this.relationList[i].laboratoryList[j].selected === 1) {
                  item.laboratoryIds.push(this.relationList[i].laboratoryList[j].id);
                }
              }
            }
            this.$nextTick(() => {
              this.addMessageSave();
            });
          } else {
            return false;
          }
        });
      },
      addMessageSave () {
        for (let i = 0; i < this.addMessageForm.relationIds.length; i++) {
          if (this.addMessageForm.relationIds[i].laboratoryIds.length <= 0) {
            this.addMessageForm.relationIds.splice(i, 1);
          }
        }
        this.$nextTick(() => {
          if (this.addMessageForm.relationIds.length === 1) {
            if (this.addMessageForm.relationIds[0].laboratoryIds.length <= 0) {
              this.addMessageForm.relationIds = [];
            }
          }
        });
        this.$nextTick(() => {
          if (this.addMessageForm.relationIds.length <= 0) {
            this.$alert('请选择实训室！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          let vm = this;
          if (this.addMessageForm.issueTime === null || this.addMessageForm.issueTime === '' || this.addMessageForm.issueTime === undefined) {
            this.$alert('请选择定时日期！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          if (this.addMessageForm.startTime === null || this.addMessageForm.startTime === '' || this.addMessageForm.startTime === undefined) {
            this.$alert('请选择定时的开始时间！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          if (this.addMessageForm.endTime === null || this.addMessageForm.endTime === '' || this.addMessageForm.endTime === undefined) {
            this.$alert('请选择定时的结束时间！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          this.$Service.addClassMessage(this.addMessageForm).then(function (res) {
            if (res.data.data !== undefined) {
              vm.$message({
                message: '操作成功',
                type: 'success'
              });
              vm.getClassMessageList();
              vm.clearForm();
            }
          });
        });
      },
      clearForm () {
        this.addMessageForm = {
          title: '',
          type: '',
          messageContent: {
            layoutType: 1,
            styleType: 1,
            cycleType: 1,
            content: '',
            resourceId: []
          },
          issueTime: '',
          startTime: '',
          endTime: '',
          status: false,
          relationIds: []
        };
        this.getRelation();
        this.currentIndex = 0;
        this.resourceIdList = [];
      },
      // 班牌消息查询
      getClassMessageList () {
        let vm = this;
        this.$Service.classMessage().then(function (res) {
          if (res.data.data !== undefined) {
            vm.classMessageList = res.data.data;
          }
        });
      }
    }
  };
</script>
