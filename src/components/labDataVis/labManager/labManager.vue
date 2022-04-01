<template>
  <div class="labManagerPage">
    <div class="title">
      <span class="span-l">实训室管理</span>
      <div class="button">
        <el-button type="primary" plain size="small" @click="goAddLab('labManager')">添加</el-button>
<!--        <el-button type="primary" plain size="small" @click="batchOperate('delete')">删除</el-button>-->
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="search margin-t-10">
      <el-form label-width="120px">
        <el-form-item label="实训室查询类型" class="fl" prop="type">
          <el-select v-model="floorId" placeholder="请选择" size="small" @change="changeFloor()">
            <el-option v-for="item in floorList" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="实训室名称" class="fl">-->
<!--          <el-input placeholder="请输入实训室名称" size="small"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div class="clearfix"></div>
    </div>
    <div class="margin-t-20">
      <el-table :data="labList" ref="multipleTable" class="w-100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="编号"></el-table-column>
        <el-table-column prop="name" label="实训室名称"></el-table-column>
        <el-table-column prop="typeName" label="类型"></el-table-column>
        <el-table-column prop="floorName" label="所属教学楼"></el-table-column>
        <el-table-column prop="floorAddress" label="教学楼位置"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <a href="javascript:void(0);" title="编辑" class="update f14" @click="goAddLab('labManager', scope.row)">编辑</a>
<!--            <a href="javascript:void(0);" title="删除" class="remove f14" @click="batchOperate('delete', scope.row)">删除</a>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'labManager',
    data () {
      return {
        floorId: '',
        floorList: [],
        laboratoryForm: {
          floorId: ''
        },
        labList: [],
        batchList: [],
        component: 'labManager'
      };
    },
    created () {
      this.getFloorList();
    },
    methods: {
      // 多选框
      handleSelectionChange (val) {
        this.batchList = val;
      },
      // 获取教学楼列表
      getFloorList () {
        let vm = this;
        this.$Service.floor().then(function (res) {
          if (res.data.data !== undefined) {
            vm.floorList = res.data.data;
            if (vm.floorList.length > 0) {
              vm.floorId = vm.floorList[0].id;
              vm.laboratoryForm.floorId = vm.floorId;
              vm.getLabList();
            }
          }
        });
      },
      changeFloor () {
        this.laboratoryForm.floorId = this.floorId;
        this.getLabList();
      },
      // 获取实训室列表
      getLabList () {
        let vm = this;
        this.$Service.laboratory(this.laboratoryForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.labList = res.data.data;
            vm.passInfo = vm.labList;
          }
        });
      },
      batchOperate (sign, row) {
        if (row !== undefined) {
          this.batchList.push(row);
        }
        if (sign === 'delete') {
          if (this.batchList.length <= 0) {
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
              let batchList = [];
              for (let i = 0; i < this.batchList.length; i++) {
                batchList.push(this.batchList[i].id);
              }
              this.remove(batchList);
            }).catch(() => {
            });
          }
        }
      },
      // 删除操作
      remove (batchList) {
        let vm = this;
        this.$Service.deleteLab(batchList).then(function (res) {
          vm.$message({
            message: '删除成功',
            type: 'success'
          });
          vm.getLabList();
        });
      },
      goAddLab (sign, row) {
        let currentMenu = {
          component: 'addLab',
          floorList: this.floorList,
          sign: this.component,
          row: row
        };
        this.$store.commit('changeUrl', currentMenu);
      }
    }
  };
</script>
