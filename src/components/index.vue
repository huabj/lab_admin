<template>
  <div class="indexPage">
    <!--头部分开始-->
    <el-header>
      <div class="header-main w-90">
        <!--logo开始-->
<!--        <div class="logo">校园数字化系统</div>-->
        <!--logo结束-->
        <!--用户信息开始-->
        <div class="user-s">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="$Config.POST_URL + '/avatar/' + userInfo.avatar.realName">
              <span>{{userInfo.username}}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-download" command="downloadXT">系统-操作手册</el-dropdown-item>
              <el-dropdown-item icon="el-icon-download" command="downloadBP">班牌-操作手册</el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" command="repass">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">注销账户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--用户信息结束-->
        <!--信息开始-->
<!--        <div class="message">-->
<!--          <el-badge :value='99' :max="99" class="item">-->
<!--            <i class="el-icon-message-solid"></i>-->
<!--          </el-badge>-->
<!--        </div>-->
        <!--信息结束-->
        <div class="clearfix"></div>
      </div>
    </el-header>
    <!--头部分结束-->
    <!--左侧菜单开始-->
    <div class="left" :class="{'el-menu--collapse': isCollapse === true}">
      <div class="icon-btn">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false"><i class="el-icon-s-unfold"></i></el-radio-button>
          <el-radio-button :label="true"><i class="el-icon-s-fold"></i></el-radio-button>
        </el-radio-group>
      </div>
      <div class="menu-main">
        <div class="menu" v-for="(item, index) in menuList" :key="item.id">
          <div class="menuFather" :title="item.name" @click="curMenu(item, index)" :class="{'activeFather': currentIndex === index}">
            <span class="icon" :class="'bg-' + index">
              <i class="iconfont" :class="item.meta.icon"></i>
            </span>
            <span class="name"  :class="{'none': isCollapse === true}">{{item.name}}</span>
            <p class="icon-8" :class="{'el-icon-arrow-down': item.children !== undefined, 'none': isCollapse === true}"></p>
          </div>
          <div class="menuSon" :class="{'block' : currentIndex === index, 'none': isCollapse === true}">
            <div class="menuSonLi" v-for="itemChild in item.children" :key="itemChild.id">
              <span v-if="itemChild.children === undefined" @click="changeComponent(itemChild)" :class="{'activeSon': itemChild.component === curIndex}">{{itemChild.name}}</span>
              <span v-else>{{itemChild.name}}</span>
              <ul>
                <li v-for="(itemC, ind) in itemChild.children" :key="itemC.id" :class="{'activeSon': curInd === ind}" @click="curMenuC(itemC, ind)">{{itemC.name}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div style="width: 100%; height: 100px;"></div>
      </div>
    </div>
    <!--左侧菜单结束始-->
    <!--右侧主体内容开始-->
    <div class="right-container" :class="{'el-menu--collapse': isCollapse === true}">
      <el-main>
        <component v-bind:is="pageUrl"></component>
      </el-main>
    </div>
    <!--右侧主体内容结束-->
    <ChangePwd v-if="repassModal" @repassModalClose="repassModalClose" v-bind:passInfo="passInfo"></ChangePwd>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import NoPermission from './noPermission.vue';
// 工作台
import Workbench from './workbench/workbench.vue';
// 预约管理
import BookingManagement from './bookingManagement/bookingManagement.vue';
// 授权管理
import AuthManage from './authManage/authManage.vue';
// 报警资料推送管理
import TroubleInfo from './alarmData/troubleInfo/troubleInfo.vue';
import LabEquFaultDetail from './alarmData/troubleInfo/pages/labEquFaultDetail.vue';
import LabClockingFile from './alarmData/labClockingFile/labClockingFile.vue';
import LabClokingdetail from './alarmData/labClockingFile/pages/labClokingdetail.vue';
import LabImageFile from './alarmData/labImageFile/labImageFile.vue';
import LabImageFileDetail from './alarmData/labImageFile/pages/labImageFileDetail.vue';
import TelecontrolEqu from './alarmData/telecontrolEqu/telecontrolEqu.vue';
// 教学数据分析优化
import TeachingData from './teachingData/teachingData.vue';
import TeachingDataDetail from './teachingData/pages/teachingDataDetail.vue';
// 实训室数据可视化
import LabData from './labDataVis/labData/labData.vue';
import LookLab from './labDataVis/lookLab/lookLab.vue';
import LabManager from './labDataVis/labManager/labManager.vue';
// 物料管理
import LookWarehouse from './materialsManage/lookWarehouse/lookWarehouse.vue';
import WarehouseManagement from './materialsManage/warehouseManagement/warehouseManagement.vue';
import StockIn from './materialsManage/stockIn/stockIn.vue';
import StockOut from './materialsManage/stockOut/stockOut.vue';
import WarehouseVis from './materialsManage/warehouseVis/warehouseVis.vue';
import ApplicationRecord from './materialsManage/applicationRecord/applicationRecord.vue';
// 班牌信息发布
import ClasInfo from './clasInfo/clasInfo.vue';
import VisualTerminal from './clasInfo/visualTerminal.vue';
// 系统管理
import MenusManage from './systemManage/menusManage/menusManage.vue';
import CreateSQL from './systemManage/menusManage/pages/createSQL.vue';
import RolesManage from './systemManage/rolesManage/rolesManage.vue';
import UsersManage from './systemManage/usersManage/usersManage.vue';
import AccountAuth from './systemManage/usersManage/pages/accountAuth.vue';
import AddUsers from './systemManage/usersManage/pages/addUsers.vue';
import DataManagement from './systemManage/dataManagement/dataManagement.vue';
// 实训室介绍可视化
import LabIntroduce from './labIntroduce/labIntroduce.vue';
import AddLab from './labIntroduce/pages/addLab.vue';
import ChangePwd from './common/changePwd.vue';
import RealTime from './labIntroduce/pages/realTime.vue';
// 安全模块
import SecurityModule from './securityModule/securityModule.vue';
import SecurityModuleDetail from './securityModule/pages/securityModuleDetail.vue';
import InspectionManagement from './securityModule/inspectionManagement.vue';
import TacticalManagement from './securityModule/tacticalManagement.vue';
import CreateInspection from './securityModule/pages/createInspection.vue';
import InspectionDetail from './securityModule/pages/inspectionDetail.vue';
import InspectionAdd from './securityModule/inspectionAdd.vue';
import PowerManagement from './powerManagement/powerManagement.vue';

export default {
  name: 'index',
  components: {
    NoPermission,
    // 工作台
    Workbench,
    // 预约管理
    BookingManagement,
    // 授权管理
    AuthManage,
    // 报警资料推送管理
    TroubleInfo,
    LabEquFaultDetail,
    LabClockingFile,
    LabClokingdetail,
    LabImageFile,
    LabImageFileDetail,
    TelecontrolEqu,
    InspectionAdd,
    // 教学数据分析优化
    TeachingData,
    TeachingDataDetail,
    // 实训室数据可视化
    LabData,
    LookLab,
    RealTime,
    LabManager,
    // 物料管理
    LookWarehouse,
    WarehouseManagement,
    StockIn,
    StockOut,
    WarehouseVis,
    ApplicationRecord,
    // 班牌信息发布
    ClasInfo,
    VisualTerminal,
    // 系统管理
    MenusManage,
    CreateSQL,
    RolesManage,
    UsersManage,
    AccountAuth,
    AddUsers,
    DataManagement,
    // 实训室介绍可视化
    LabIntroduce,
    AddLab,
    ChangePwd,
    // 安全模块
    SecurityModule,
    SecurityModuleDetail,
    InspectionManagement,
    TacticalManagement,
    CreateInspection,
    InspectionDetail,
    PowerManagement
  },
  data () {
    return {
      currentIndex: 0,
      curIndex: '',
      activeIndex: '1',
      isCollapse: false,
      // currentMenu: {},
      userInfo: {
        username: '',
        avatar: {
          realName: ''
        }
      },
      menuList: [],
      repassModal: false,
      passInfo: {},
      permissionList: [
        {
          name: 'workbench'
        },
        {
          name: 'bookingManagement'
        },
        {
          name: 'authManage'
        },
        {
          name: 'troubleInfo'
        },
        {
          name: 'labEquFaultDetail'
        },
        {
          name: 'labClockingFile'
        },
        {
          name: 'labClokingdetail'
        },
        {
          name: 'labImageFile'
        },
        {
          name: 'labImageFileDetail'
        },
        {
          name: 'telecontrolEqu'
        },
        {
          name: 'teachingData'
        },
        {
          name: 'teachingDataDetail'
        },
        {
          name: 'labData'
        },
        {
          name: 'lookLab'
        },
        {
          name: 'realTime'
        },
        {
          name: 'labManager'
        },
        {
          name: 'lookWarehouse'
        },
        {
          name: 'warehouseManagement'
        },
        {
          name: 'stockIn'
        },
        {
          name: 'stockOut'
        },
        {
          name: 'clasInfo'
        },
        {
          name: 'menusManage'
        },
        {
          name: 'rolesManage'
        },
        {
          name: 'usersManage'
        },
        {
          name: 'addUsers'
        },
        {
          name: 'labIntroduce'
        },
        {
          name: 'addLab'
        },
        {
          name: 'changePwd'
        },
        {
          name: 'securityModule'
        },
        {
          name: 'securityModuleDetail'
        },
        {
          name: 'warehouseVis'
        },
        {
          name: 'applicationRecord'
        },
        {
          name: 'inspectionManagement'
        },
        {
          name: 'createInspection'
        },
        {
          name: 'inspectionDetail'
        },
        {
          name: 'powerManagement'
        },
        {
          name: 'inspectionAdd'
        },
        {
          name: 'dataManagement'
        },
        {
          name: 'visualTerminal'
        },
        {
          name: 'createSQL'
        },
        {
          name: 'tacticalManagement'
        }
      ],
      curInd: ''
    };
  },
  computed: {
    ...mapState([
      'pageUrl'
    ])
  },
  created () {
    if (this.getCookieVal('userInfo') !== undefined && this.getCookieVal('userInfo') !== null && this.getCookieVal('userInfo') !== '') {
      this.userInfo = JSON.parse(this.getCookieVal('userInfo'));
    }
    this.getScreenHeight();
    this.getMenusBuild();
    this.getDictDetail();
  },
  methods: {
    findComponent (component) {
      let state = false;
      this.permissionList.forEach(item => {
        if (item.name === component) {
          state = true;
        }
      });
      return state;
    },
    // 查询字典
    getDictDetail () {
      let vm = this;
      this.$Service.dictDetail('supplies_status').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveSuppliesStatusList', res.data.data.supplies_status);
        }
      });
      this.$Service.dictDetail('unit').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveUnitList', res.data.data.unit);
        }
      });
      this.$Service.dictDetail('supplies_safe_type').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveSuppliesSafeTypeList', res.data.data.supplies_safe_type);
        }
      });
      this.$Service.dictDetail('nation').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveNationList', res.data.data.nation);
        }
      });
      this.$Service.dictDetail('laboratory_type').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveLabTypeList', res.data.data.laboratory_type);
        }
      });
      this.$Service.dictDetail('laboratory_people_limit').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('savePeopleLimitList', res.data.data.laboratory_people_limit);
        }
      });
      this.$Service.dictDetail('equipment_fault_status').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveEquFaultStatusList', res.data.data.equipment_fault_status);
        }
      });
      this.$Service.dictDetail('equipment_fault_cause').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveEquFaultCauseList', res.data.data.equipment_fault_cause);
        }
      });
      this.$Service.dictDetail('equipment_handle_status').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveEquHandleStatusList', res.data.data.equipment_handle_status);
        }
      });
      this.$Service.dictDetail('equipment_maintain_type').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveEquMaintainTypeList', res.data.data.equipment_maintain_type);
        }
      });
      this.$Service.dictDetail('laboratory_equipment_type').then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveLabEquTypeList', res.data.data.laboratory_equipment_type);
        }
      });
      this.$Service.materialTypeList().then(function (res) {
        if (res.data.data !== undefined) {
          vm.$store.commit('saveMaterialTypeList', res.data.data);
        }
      });
    },
    curMenu (item, inx) {
      this.currentIndex = inx;
      this.curIndex = '';
      this.curInd = '';
      if (item.children === undefined) {
        if (this.findComponent(item.component)) {
          this.$store.commit('changeUrl', item);
        } else {
          let data = {
            component: 'noPermission'
          };
          this.$store.commit('changeUrl', data);
        }
      } else {
        if (this.isCollapse === true) {
          this.isCollapse = false;
        }
      }
    },
    curMenuC (itemC, ind) {
      this.curInd = ind;
      this.curIndex = '';
      if (itemC.children === undefined) {
        if (this.findComponent(itemC.component)) {
          this.$store.commit('changeUrl', itemC);
        } else {
          let data = {
            component: 'noPermission'
          };
          this.$store.commit('changeUrl', data);
        }
      } else {
        if (this.isCollapse === true) {
          this.isCollapse = false;
        }
      }
    },
    getMenusBuild () {
      let vm = this;
      this.$Service.menusBuild().then(function (res) {
        if (res.data.data !== undefined) {
          vm.menuList = res.data.data;
          let item = {
            component: 'workbench',
            hidden: true,
            meta: {
              icon: 'el-icon-menu',
              noCache: true,
              title: '工作台'
            },
            name: '工作台',
            path: '/null'
          };
          vm.$store.commit('changeUrl', item);
        }
      });
    },
    changeComponent (currentMenu) {
      if (this.findComponent(currentMenu.component)) {
        this.curIndex = currentMenu.component;
        this.$store.commit('changeUrl', currentMenu);
      } else {
        let data = {
          component: 'noPermission'
        };
        this.curIndex = currentMenu.component;
        this.$store.commit('changeUrl', data);
      }
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logoutFun();
          break;
        case 'repass':
          this.repassModalShow();
          break;
        case 'downloadXT':
          this.downloadXT();
          break;
        case 'downloadBP':
          this.downloadBP();
          break;
      }
    },
    downloadXT () {
      window.location.href = this.$Config.POST_URL + '/file/系统-操作手册.pdf';
    },
    downloadBP () {
      window.location.href = this.$Config.POST_URL + '/file/班牌-操作手册.pdf';
    },
    repassModalShow () {
      this.repassModal = true;
    },
    repassModalClose () {
      this.repassModal = false;
    },
    logoutFun () {
      this.$confirm('是否注销账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let vm = this;
        this.$Service.logout().then(function (res) {
          let currentMenu = {
            keyid: '',
            name: '',
            router: '',
            styleClass: ''
          };
          vm.$store.commit('changeUrl', currentMenu);
          vm.$store.commit('saveScreenHeight', 0);
          window.location.href = vm.$Config.WEB_URL;
          document.cookie = 'userInfo=' + '' + ';path=/;';
          document.cookie = 'token=' + '' + ';path=/;';
        });
      }).catch(() => {
      });
    },
    getScreenHeight () {
      this.$store.commit('saveScreenHeight', window.screen.height);
    }
  }
};
</script>
