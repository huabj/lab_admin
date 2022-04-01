<template>
  <div class="addMenusPage">
    <div class="modal-bg">
      <div class="modal w-35" :style="{'max-height': (screenHeight - 180) + 'px'}">
        <div class="modal-header">
          <span class="f16 f-bolder">菜单信息维护</span>
          <i class="el-icon-close f24 f-bolder" @click="cancelModal('cancel')"></i>
        </div>
        <div class="modal-body">
          <el-form label-width="100px" class="margin-t-20" ref="addMenusForm" :model="addMenusForm" :rules="rules">
            <el-form-item label="菜单类型" class="w-100" prop="type">
              <!--类型（0-目录，1-菜单，2-按钮）-->
              <el-radio-group v-model="addMenusForm.type" size="small">
                <el-radio-button :label="0">目录</el-radio-button>
                <el-radio-button :label="1">菜单</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单图标" class="w-100" prop="icon">
              <el-input placeholder="请输入菜单图标名称" size="small" v-model="addMenusForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="外链菜单" class="w-50" prop="iFrame">
              <el-radio-group v-model="addMenusForm.iframe" size="small">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单可见" class="w-50" prop="hidden">
              <el-radio-group v-model="addMenusForm.hidden" size="small">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单标题" class="w-100" prop="name">
              <el-input placeholder="请输入菜单标题" v-model="addMenusForm.name"></el-input>
            </el-form-item>
            <el-form-item label="路由地址" class="w-50" prop="component">
              <el-input placeholder="请输入路由地址" size="small" v-model="addMenusForm.component"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序" class="w-50" prop="sort">
              <el-input-number v-model="addMenusForm.sort" controls-position="right" :min="1" :max="99999"></el-input-number>
            </el-form-item>
            <el-form-item label="一级类目" class="w-100" prop="pid">
              <el-select v-model="addMenusForm.pid" placeholder="请选择" @change="selectChildMenuList()">
                <el-option label="无" :value="0"></el-option>
                <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级类目" class="w-100" prop="ppid" v-if="childMenuList !== null && childMenuList.length > 0 && addMenusForm.pid !== 0">
              <el-select v-model="addMenusForm.ppid" placeholder="请选择">
                <el-option v-for="item in childMenuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-foot">
          <el-button size="small" @click="cancelModal('cancel')">取消</el-button>
          <el-button type="primary" @click="submit('addMenusForm')" size="small">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'addMenus',
    data () {
      return {
        addMenusForm: {
          id: '',
          name: '',
          icon: '',
          hidden: true,
          component: '',
          componentName: '',
          pid: '',
          ppid: '',
          sort: '',
          iframe: false,
          cache: false,
          type: 0
        },
        rules: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '请输入菜单图标名称', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入菜单标题', trigger: 'blur'}
          ],
          component: [
            {required: true, message: '请输入路由地址', trigger: 'blur'}
          ],
          iframe: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          hidden: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          pid: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        menuList: [],
        childMenuList: []
      };
    },
    computed: {
      ...mapState([
        'screenHeight',
        'currentMenu'
      ])
    },
    props: [
      'passInfo'
    ],
    created () {
      this.menuList = this.passInfo.menuList;
      if (this.passInfo.row !== undefined) {
        this.getValue();
      }
    },
    methods: {
      selectChildMenuList () {
        this.addMenusForm.ppid = '';
        for (let i = 0; i < this.menuList.length; i++) {
          if (this.addMenusForm.pid === this.menuList[i].id) {
            this.childMenuList = this.menuList[i].children;
          }
        }
      },
      getValue () {
        this.addMenusForm.id = this.passInfo.row.id;
        this.addMenusForm.name = this.passInfo.row.name;
        this.addMenusForm.icon = this.passInfo.row.icon;
        this.addMenusForm.hidden = this.passInfo.row.hidden;
        this.addMenusForm.component = this.passInfo.row.component;
        this.addMenusForm.componentName = this.passInfo.row.componentName;
        this.addMenusForm.pid = this.passInfo.row.pid;
        this.addMenusForm.sort = this.passInfo.row.sort;
        this.addMenusForm.iframe = this.passInfo.row.iframe;
        this.addMenusForm.cache = this.passInfo.row.cache;
        this.addMenusForm.type = this.passInfo.row.type;
      },
      submit (addMenusForm) {
        this.$refs[addMenusForm].validate((valid) => {
          if (valid) {
            if (this.passInfo.row !== undefined) {
              this.updateMenusSave();
            } else {
              this.addMenusSave();
            }
          } else {
            return false;
          }
        });
      },
      updateMenusSave () {
        let vm = this;
        if (this.addMenusForm.ppid !== '') {
          this.addMenusForm.pid = this.addMenusForm.ppid;
        }
        this.$Service.updateMenus(this.addMenusForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.cancelModal('add');
          }
        });
      },
      addMenusSave () {
        let vm = this;
        this.$Service.addMenus(this.addMenusForm).then(function (res) {
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
        this.$emit('addMenusModalClose', sign);
      }
    }
  };
</script>
