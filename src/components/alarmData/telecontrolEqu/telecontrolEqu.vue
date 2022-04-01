<template>
  <div class="telecontrolEquPage">
    <iframe src="http://124.70.210.118:8062/yanshi/1/1/imglist1.html" style="width: 100%;" :style="{'height': (screenHeight - 290) + 'px'}" frameborder="0"></iframe>
<!--    <div class="title">-->
<!--      <span class="span-l">遥控开关设备</span>-->
<!--      <div class="clearfix"></div>-->
<!--    </div>-->
<!--    <div class="search margin-t-20 flex" style="justify-content: space-between;">-->
<!--      <div>-->
<!--        <el-select v-model="controlForm.floorId" placeholder="请选择" size="small" @change="changeFloor()">-->
<!--          <el-option label="全部" value=""></el-option>-->
<!--          <el-option v-for="item in floorList" :key="item.value" :label="item.name" :value="item.id"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->
<!--      <div class="button flex">-->
<!--        <el-input style="margin: 0 0 0 20px;" v-model="controlForm.laboratoryName" placeholder="请输入内容" size="small" prefix-icon="el-icon-search"></el-input>-->
<!--        <el-button type="primary" size="small" @click="getControl()">查询</el-button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="margin-t-20">-->
<!--      <el-table :data="controlrList.records" class="w-100">-->
<!--        <el-table-column prop="laboratoryName" label="实训室名称"></el-table-column>-->
<!--        <el-table-column prop="equipmentConfig" label="教室设备配置"></el-table-column>-->
<!--        <el-table-column prop="equipmentFault" label="设备情况"></el-table-column>-->
<!--        <el-table-column prop="courseTotalTime" label="上课总时长"></el-table-column>-->
<!--        <el-table-column prop="teacherName" label="使用情况"></el-table-column>-->
<!--        <el-table-column prop="name" label="远程操作" width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <a href="javascript:void(0);" title="关机" class="update">关机</a>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div class="pages">-->
<!--        <el-pagination @current-change="handleCurrentChange" :current-page.sync="controlForm.current" :page-size="controlForm.size" layout="prev, pager, next, jumper" :total="totalPages"></el-pagination>-->
<!--      </div>-->
<!--    </div>-->
    <img src="../../../assets/img/rt.png" class="triangle">
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'telecontrolEqu',
    data () {
      return {
        controlForm: {
          laboratoryName: '',
          floorId: '',
          current: 0,
          size: 10
        },
        floorList: [],
        totalPages: 1,
        controlrList: {
          current: '',
          orders: [],
          pages: '',
          records: [],
          searchCount: true,
          size: '',
          total: ''
        }
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
      // this.getFloorList();
      // this.getControl();
    },
    methods: {
      // 列表分页
      handleCurrentChange (val) {
        this.controlForm.current = parseInt(`${val}`);
        this.getControl();
      },
      getControl () {
        let vm = this;
        this.$Service.control(this.controlForm).then(function (res) {
          if (res.data.data !== undefined) {
            vm.controlrList = res.data.data;
            vm.totalPages = vm.controlrList.total;
          }
        });
      },
      // 获取教学楼列表
      getFloorList () {
        let vm = this;
        this.$Service.floor().then(function (res) {
          if (res.data.data !== undefined) {
            vm.floorList = res.data.data;
          }
        });
      },
      changeFloor () {
        this.controlForm.current = 0;
        this.controlForm.size = 10;
        this.getControl();
      }
    }
  };
</script>
