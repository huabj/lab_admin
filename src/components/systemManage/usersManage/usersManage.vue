<template>
  <div class="usersManagePage">
    <div class="title">
      <span class="span-l">
        <el-select v-model="getUsersListForm.roleId" placeholder="请选择" size="mini" @change="getUsersList()">
          <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="goAccountAuth()">账号授权</el-button>
        <el-button type="primary" plain size="small" @click="goAddUsers('add')">新建</el-button>
        <el-button type="primary" plain size="small" @click="remove()">删除</el-button>
<!--        <el-button type="primary" plain size="small">导出</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="margin-t-20" v-if="teacherManage === false">
      <el-table :data="usersData.content" ref="multipleTable" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="nickName" label="姓名"></el-table-column>
        <el-table-column prop="department" label="院系"></el-table-column>
        <el-table-column prop="jobAddress" label="办公地点"></el-table-column>
        <el-table-column prop="roles" label="担任职位">
          <template slot-scope="scope">
            <el-tag size="small" v-for="item in scope.row.roles" :key="item.id" class="margin-r-5">{{item.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="memberStatus" label="是否是党员">
          <!--是否是党员，1-是，2-否-->
          <template slot-scope="scope">
            <el-tag size="small" v-if="scope.row.memberStatus === 1" type="success">是</el-tag>
            <el-tag size="small" v-if="scope.row.memberStatus === 2" type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="card" label="身份证号"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="操作" fixed="right" width="95">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="修改权限" class="update" @click="goAddUsers('update', scope.row)">修改权限</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="teacherList margin-t-20" v-else>
      <ul>
        <li v-for="(item, index) in usersData.content" :key="item.id">
          <label>
            <input type="radio" name="radio" v-model="radio" :value="index">
            <img :src="$Config.POST_URL + '/avatar/' + item.avatar.realName" v-if="item.avatar !== null">
            <img src="../../../assets/img/wutu.png" v-else>
            <h2>{{item.nickName}}</h2>
          </label>
          <p class="margin-t-10">
            <a href="javascript:void(0);" title="删除" v-if="radio === index" class="update flex-1" @click="remove(item)">删除</a>
            <a href="javascript:void(0);" title="删除" v-else class="update update2 flex-1">删除</a>
            <a href="javascript:void(0);" title="修改权限" v-if="radio === index" class="update margin-l-10" @click="goAddUsers('update', item)">修改权限</a>
            <a href="javascript:void(0);" title="修改权限" v-else class="update update2 margin-l-10">修改权限</a>
          </p>
        </li>
      </ul>
    </div>
<!--    <div class="pages">-->
<!--      <el-pagination @current-change="handleCurrentChange" :current-page="getUsersListForm.page"-->
<!--                     :page-size="getUsersListForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
<!--    </div>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'usersManage',
    data () {
      return {
        radio: '',
        getUsersListForm: {
          roleId: '',
          page: 0,
          size: 100000
        },
        totalPages: 1,
        rolesList: [],
        usersData: {
          content: [],
          totalElements: 0
        },
        removeUsersList: [],
        teacherManage: false
      };
    },
    computed: {
      ...mapState([
        'currentMenu'
      ])
    },
    created () {
      this.getAllRolesList();
    },
    methods: {
      // 列表分页
      handleCurrentChange (val) {
        this.getUsersListForm.page = parseInt(`${val}`);
        this.getUsersList();
      },
      goAddUsers (sign, row) {
        let currentMenu = {
          component: 'addUsers',
          rolesList: this.rolesList,
          sign: sign,
          row: row,
          roleId: this.getUsersListForm.roleId
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      goAccountAuth () {
        let currentMenu = {
          component: 'accountAuth'
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      // 多选框
      handleSelectionChange (val) {
        this.removeUsersList = val;
      },
      // 获取用户列表
      getUsersList () {
        let vm = this;
        // console.log(this.getUsersListForm);
        this.$Service.usersList(this.getUsersListForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.usersData = res.data.data;
            // vm.totalPages = res.data.data.totalElements;
            // console.log(vm.totalPages);
            if (vm.getUsersListForm.roleId === 3) {
              vm.teacherManage = true;
            } else {
              vm.teacherManage = false;
            }
          }
        });
      },
      // 获取角色列表
      getAllRolesList () {
        let vm = this;
        this.$Service.rolesAll().then(function (res) {
          if (res.data.data !== undefined) {
            vm.rolesList = res.data.data;
            if (vm.currentMenu.roleId !== undefined) {
              vm.getUsersListForm.roleId = vm.currentMenu.roleId;
              vm.getUsersList();
            } else {
              vm.getUsersListForm.roleId = vm.rolesList[0].id;
              vm.getUsersList();
            }
          }
        });
      },
      // 删除用户列表
      remove (item) {
        if (item !== undefined) {
          this.removeUsersList.push(item);
        }
        if (this.removeUsersList.length <= 0) {
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
            for (let i = 0; i < this.removeUsersList.length; i++) {
              removeList.push(this.removeUsersList[i].id);
            }
            this.$Service.deleteUsers(removeList).then(function (res) {
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.getUsersList();
            });
          }).catch(() => {
          });
        }
      }
    }
  };
</script>
