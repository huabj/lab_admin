<template>
  <div class="rolesManagePage">
    <div class="title">
      <span class="span-l">角色管理</span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="addRolesModalShow()">新建</el-button>
        <el-button type="primary" plain size="small" @click="remove()">删除</el-button>
<!--        <el-button type="primary" plain size="small">导出</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="rolesManage margin-t-20">
      <div class="rolesManage-l">
        <h2>角色列表</h2>
        <el-table ref="multipleTable" :data="rolesData.content" highlight-current-row tooltip-effect="dark" class="w-100" @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="dataScope" label="数据权限"></el-table-column>
          <el-table-column prop="level" label="角色级别"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column label="操作" fixed="right" width="125">
            <template slot-scope="scope">
              <a href="javascript:void(0);" title="修改" class="update" @click="addRolesModalShow(scope.row)">修改</a>
              <a href="javascript:void(0);" title="删除" class="remove" @click="remove(scope.row)" v-if="scope.row.id !== 3 && scope.row.id !== 1">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rolesManage-r">
        <h2>菜单分配<el-button class="fr" type="primary" plain size="mini" @click="getChecked">保存</el-button></h2>
        <div class="rolesManage-r-1" :style="{'max-height': (screenHeight - 440) + 'px'}">
          <el-tree :data="menusData.content" default-expand-all show-checkbox :default-checked-keys="checkedKeys" ref="tree" node-key="id" :props="defaultProps"></el-tree>
        </div>
      </div>
    </div>
    <AddRoles v-if="addRolesModal" @addRolesModalClose="addRolesModalClose" v-bind:passInfo="passInfo"></AddRoles>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import AddRoles from './pages/addRoles.vue';
  export default {
    name: 'rolesManage',
    components: {
      AddRoles
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    data () {
      return {
        rolesData: {
          content: [],
          totalElements: 0
        },
        menusData: {
          content: [],
          totalElements: 0
        },
        removeRolesList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        addRolesForm: {
          id: '',
          name: '',
          remark: '',
          dataScope: '',
          level: '',
          permission: '',
          menus: []
        },
        passInfo: {},
        addRolesModal: false,
        checkedKeys: []
      };
    },
    created () {
      this.getRolesData();
      this.getMenesList();
    },
    methods: {
      // 模态框显示
      addRolesModalShow (row) {
        if (row !== undefined) {
          this.passInfo = row;
        }
        this.addRolesModal = true;
      },
      // 模态框关闭
      addRolesModalClose (sign) {
        this.addRolesModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.getRolesData();
        }
      },
      // 选择当前行
      handleCurrentChange (val) {
        this.checkedKeys = [];
        if (val !== undefined && val !== null) {
          for (let i = 0; i < val.menus.length; i++) {
            this.checkedKeys.push(val.menus[i].id);
          }
          this.$refs.tree.setCheckedKeys(this.checkedKeys);
        }
      },
      // 角色菜单修改
      getChecked () {
        if (this.removeRolesList.length <= 0) {
          this.$alert('请选择您要分配菜单的角色！', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else {
          if (this.removeRolesList.length > 1) {
            this.$alert('亲，只能勾选一个角色呦！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else {
            let checkedList = this.$refs.tree.getCheckedNodes();
            if (checkedList.length <= 0) {
              this.$alert('请选择您要分配菜单的！', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            } else {
              this.addRolesForm.id = this.removeRolesList[0].id;
              this.addRolesForm.name = this.removeRolesList[0].name;
              this.addRolesForm.remark = this.removeRolesList[0].remark;
              this.addRolesForm.dataScope = this.removeRolesList[0].dataScope;
              this.addRolesForm.level = this.removeRolesList[0].level;
              this.addRolesForm.permission = this.removeRolesList[0].permission;
              let menus = [];
              for (let i = 0; i < checkedList.length; i++) {
                menus.push(checkedList[i].id);
              }
              for (let i = 0; i < checkedList.length; i++) {
                if (checkedList[i].pid !== 0) {
                  menus.push(checkedList[i].pid);
                }
              }
              let arrayFrom = Array.from(new Set(menus));
              this.updateRolesMenusSave(arrayFrom);
            }
          }
        }
      },
      // 角色菜单修改提交
      updateRolesMenusSave (arrayFrom) {
        // if (this.addRolesForm.id === 1) {
        //   this.$alert('亲不能随意更改超级管理员的权限呦！', '温馨提示', {
        //     confirmButtonText: '确定',
        //     callback: action => {
        //     }
        //   });
        // } else {
          let vm = this;
          this.addRolesForm.menus = [];
          for (let i = 0; i < arrayFrom.length; i++) {
            let item = {
              id: arrayFrom[i]
            };
            this.addRolesForm.menus.push(item);
          }
          this.$Service.updateRolesMenus(this.addRolesForm).then(function (res) {
            vm.$message({
              message: '操作成功',
              type: 'success'
            });
            vm.getRolesData();
          });
        // }
      },
      // 获取菜单列表
      getMenesList () {
        let vm = this;
        this.$Service.menus().then(function (res) {
          if (res.data.data !== undefined) {
            vm.menusData = res.data.data;
          }
        });
      },
      // 获取角色列表
      getRolesData () {
        let vm = this;
        this.$Service.rolesList().then(function (res) {
          if (res.data.data !== undefined) {
            vm.rolesData = {
              content: [],
              totalElements: 0
            };
            vm.rolesData = res.data.data;
          }
        });
      },
      // 删除角色
      remove (row) {
        if (row === undefined) {
          if (this.removeRolesList.length <= 0) {
            this.$alert('请选择您要删除的数据！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else {
            this.$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let vm = this;
              let removeList = [];
              for (let i = 0; i < this.removeRolesList.length; i++) {
                removeList.push(this.removeRolesList[i].id);
              }
              this.$Service.deleteRoles(removeList).then(function (res) {
                vm.$message({
                  message: '删除成功',
                  type: 'success'
                });
                vm.getRolesData();
              });
            }).catch(() => {
            });
          }
        } else {
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let vm = this;
            let removeList = [];
            removeList.push(row.id);
            this.$Service.deleteRoles(removeList).then(function (res) {
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.getRolesData();
            });
          }).catch(() => {
          });
        }
      },
      handleSelectionChange (val) {
        this.removeRolesList = val;
      }
    }
  };
</script>
