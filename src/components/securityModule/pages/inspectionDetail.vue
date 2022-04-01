<template>
  <div class="inspectionDetailPage">
    <el-button type="primary" size="small" @click="goInspectionManagement">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
    <div class="inspectionDetail margin-t-20">
      <div class="title">
        <span class="span-l">巡检单档案</span>
        <div class="button">
          <a href="javascript:void(0);" v-for="(item, index) in titleList" :key="item.id" :class="{'active': currentTabIndex === index}" @click="selectTab(index)">{{item.name}}</a>
        </div>
        <div class="clearfix"></div>
      </div>
      <div v-if=" currentTabIndex === 0">
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c w-15">巡检实训室编号</th>
            <td class="text-l">C001</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室名称</th>
            <td class="text-l">实训室01</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室类别</th>
            <td class="text-l">智能设备</td>
          </tr>
          </thead>
        </table>
        <table class="table-list w-100 margin-t-30">
          <thead>
            <tr>
              <th class="text-c">设施</th>
              <th class="text-c">设施状态</th>
              <th class="text-c">备注</th>
              <th class="text-c">照片</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-c">桌子</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">椅子</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">线路</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">开关</td>
            <td class="text-c color-orange">损坏</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14 color-blue" @click="securityModuleDetail(0)">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">空调</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">插座</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if=" currentTabIndex === 1">
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c w-15">巡检实训室编号</th>
            <td class="text-l">C001</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室名称</th>
            <td class="text-l">实训室01</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室类别</th>
            <td class="text-l">智能设备</td>
          </tr>
          </thead>
        </table>
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c">设施</th>
            <th class="text-c">设施状态</th>
            <th class="text-c">备注</th>
            <th class="text-c">照片</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-c">消防栓</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">灭火器</td>
            <td class="text-c color-red">缺失</td>
            <td class="text-c">过期</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14 color-blue" @click="securityModuleDetail(1)">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">消防警铃</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">消防斧</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">消防过滤式呼吸器</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">手动报警器</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">火灾探测器</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">应急照明灯</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">应急通道</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if=" currentTabIndex === 2">
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c w-15">巡检实训室编号</th>
            <td class="text-l">C001</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室名称</th>
            <td class="text-l">实训室01</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室类别</th>
            <td class="text-l">智能设备</td>
          </tr>
          </thead>
        </table>
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c">设施</th>
            <th class="text-c">设施状态</th>
            <th class="text-c">备注</th>
            <th class="text-c">照片</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-c">防盗门</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">窗户</td>
            <td class="text-c color-orange">损坏</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14 color-blue" @click="securityModuleDetail(2)">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">墙体</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">门锁</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if=" currentTabIndex === 3">
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c w-15">巡检实训室编号</th>
            <td class="text-l">C001</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室名称</th>
            <td class="text-l">实训室01</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室类别</th>
            <td class="text-l">智能设备</td>
          </tr>
          </thead>
        </table>
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c">设施</th>
            <th class="text-c">设施状态</th>
            <th class="text-c">备注</th>
            <th class="text-c">照片</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-c">整理（SEIRI）</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">整顿（SEITON）</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">清扫（SEISO）</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">清洁（SEIKETSU）</td>
            <td class="text-c color-red">差</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14 color-blue" @click="securityModuleDetail(3)">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">素养（SHITSUKE）</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if=" currentTabIndex === 4">
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c w-15">巡检实训室编号</th>
            <td class="text-l">C001</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室名称</th>
            <td class="text-l">实训室01</td>
          </tr>
          <tr>
            <th class="text-c">巡检实训室类别</th>
            <td class="text-l">智能设备</td>
          </tr>
          </thead>
        </table>
        <table class="table-list w-100 margin-t-30">
          <thead>
          <tr>
            <th class="text-c">设施</th>
            <th class="text-c">设施状态</th>
            <th class="text-c">备注</th>
            <th class="text-c">照片</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-c">高处围栏危险场提醒标识</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">《具体安全警示》张贴</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">《安全责任人标识》张贴</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">《实训室操作流程》张贴</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">《实训室管理制度》张贴</td>
            <td class="text-c color-red">丢失</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14 color-blue" @click="securityModuleDetail(4)">查看</a>
            </td>
          </tr>
          <tr>
            <td class="text-c">《安全制度上墙》张贴</td>
            <td class="text-c">良好</td>
            <td class="text-c">无</td>
            <td class="text-c">
              <a href="javascript:void(0);" title="查看" class="detail f14">查看</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ShowImg v-if="showImgModal" @securityModuleDetailClose="securityModuleDetailClose" v-bind:passInfo="passInfo"></ShowImg>
  </div>
</template>

<script>
  import ShowImg from './showImg.vue';
  export default {
    name: 'securityModuleDetail',
    components: {
      ShowImg
    },
    data () {
      return {
        currentTabIndex: 0,
        titleList: [
          {
            name: '教室设施'
          },
          {
            name: '消防设施'
          },
          {
            name: '防盗安全'
          },
          {
            name: '实训室5S标准'
          },
          {
            name: '标识状态'
          }
        ],
        passInfo: {},
        showImgModal: false
      };
    },
    created () {
    },
    methods: {
      selectTab (index) {
        this.currentTabIndex = index;
      },
      goInspectionManagement () {
        let currentMenu = {
          component: 'inspectionManagement'
        };
        this.$store.commit('changeUrl', currentMenu);
      },
      securityModuleDetail (id) {
        this.passInfo = id;
        this.showImgModal = true;
      },
      securityModuleDetailClose () {
        this.showImgModal = false;
      }
    }
  };
</script>
