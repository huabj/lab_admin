<template>
   <div class="menusManagePage">
     <div class="title">
       <span class="span-l">菜单管理</span>
       <div class="button">
         <el-button type="primary" plain size="small" @click="addMenusModalShow()">新建</el-button>
         <el-button type="primary" plain size="small" @click="remove()">删除</el-button>
         <el-button type="primary" plain size="small" @click="goCreateSQL()">生成sql脚本</el-button>
       </div>
       <div class="clearfix"></div>
     </div>
     <div class="margin-t-20">
       <el-table :data="menusData.content" ref="multipleTable" class="w-100" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55"></el-table-column>
         <el-table-column prop="name" label="菜单标题" width="250"></el-table-column>
         <el-table-column prop="icon" label="图标">
           <template slot-scope="scope">
             <i class="icon" :class="scope.row.icon"></i>
           </template>
         </el-table-column>
         <el-table-column prop="sort" label="排序"></el-table-column>
<!--         <el-table-column prop="permission" label="权限标识"></el-table-column>-->
         <el-table-column prop="component" label="组件路径"></el-table-column>
         <el-table-column prop="iframe" label="外链">
           <template slot-scope="scope">
             <el-tag size="small" v-if="scope.row.iframe === true" type="success">是</el-tag>
             <el-tag size="small" v-if="scope.row.iframe === false" type="danger">否</el-tag>
           </template>
         </el-table-column>
<!--         <el-table-column prop="cache" label="缓存"></el-table-column>-->
         <el-table-column prop="hidden" label="可见">
           <template slot-scope="scope">
             <el-tag size="small" v-if="scope.row.hidden === true" type="success">是</el-tag>
             <el-tag size="small" v-if="scope.row.hidden === false" type="danger">否</el-tag>
           </template>
         </el-table-column>
         <el-table-column prop="createTime" label="创建日期"></el-table-column>
         <el-table-column label="操作" fixed="right" width="125">
           <template slot-scope="scope">
             <a href="javascript:void(0);" title="修改" class="update" @click="addMenusModalShow(scope.row)">修改</a>
             <a href="javascript:void(0);" title="删除" class="remove" @click="remove(scope.row)">删除</a>
           </template>
         </el-table-column>
       </el-table>
     </div>
     <AddMenus v-if="addMenusModal" @addMenusModalClose="addMenusModalClose" v-bind:passInfo="passInfo"></AddMenus>
   </div>
</template>

<script>
  import AddMenus from './pages/addMenus.vue';
  export default {
    name: 'menusManage',
    components: {
      AddMenus
    },
    data () {
      return {
        addMenusModal: false,
        menusData: {
          content: [],
          totalElements: 0
        },
        passInfo: {},
        removeMenusList: []
      };
    },
    created () {
      this.getMenesList();
    },
    methods: {
      // 菜单信息维护模态框显示
      addMenusModalShow (row) {
        if (row !== undefined) {
          let data = {
            menuList: this.menusData.content,
            row: row
          };
          this.passInfo = data;
        } else {
          let data = {
            menuList: this.menusData.content
          };
          this.passInfo = data;
        }
        this.addMenusModal = true;
      },
       // 菜单信息维护模态框关闭
      addMenusModalClose (sign) {
        this.addMenusModal = false;
        this.passInfo = {};
        if (sign === 'add') {
          this.getMenesList();
        }
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
      // 删除菜单
      remove (row) {
        if (row === undefined) {
          if (this.removeMenusList.length <= 0) {
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
              for (let i = 0; i < this.removeMenusList.length; i++) {
                removeList.push(this.removeMenusList[i].id);
              }
              this.$Service.deleteMenus(removeList).then(function (res) {
                vm.$message({
                  message: '删除成功',
                  type: 'success'
                });
                vm.getMenesList();
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
            this.$Service.deleteMenus(removeList).then(function (res) {
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.getMenesList();
            });
          }).catch(() => {
          });
        }
      },
      // 多选框
      handleSelectionChange (val) {
        this.removeMenusList = val;
      },
      goCreateSQL () {
        let currentMenu = {
          component: 'createSQL'
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
