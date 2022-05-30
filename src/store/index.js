import Vue from 'vue';
import 'babel-polyfill';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pageUrl: '',
    currentMenu: {},
    screenHeight: 0,
    configList: [
      {
        num: '全部'
      },
      {
        num: '1-2台'
      },
      {
        num: '3-5台'
      },
      {
        num: '6-10台'
      },
      {
        num: '10-20台'
      },
      {
        num: '20台以上'
      }
    ],
    suppliesStatusList: [],
    unitList: [],
    suppliesSafeTypeList: [],
    nationList: [],
    labTypeList: [],
    peopleLimitList: [],
    equFaultStatusList: [],
    equFaultCauseList: [],
    equHandleStatusList: [],
    equMaintainTypeList: [],
    labEquTypeList: [],
    queryDateTypeList: [
      {
        value: 1,
        label: '最近一周'
      }, {
        value: 2,
        label: '最近一个月'
      }, {
        value: 3,
        label: '最近半年'
      }
    ],
    materialTypeList: []
  },
  getters: {
  },
  mutations: {
    // 更改页面跳转url
    changeUrl (state, currentMenu) {
      state.pageUrl = currentMenu.component;
      state.currentMenu = currentMenu;
      console.log(state.pageUrl);
    },
    saveScreenHeight (state, height) {
      state.screenHeight = height;
    },
    saveSuppliesStatusList (state, suppliesStatusList) {
      state.suppliesStatusList = suppliesStatusList;
    },
    saveUnitList (state, unitList) {
      state.unitList = unitList;
    },
    saveSuppliesSafeTypeList (state, suppliesSafeTypeList) {
      state.suppliesSafeTypeList = suppliesSafeTypeList;
    },
    saveNationList (state, nationList) {
      state.nationList = nationList;
    },
    saveLabTypeList (state, labTypeList) {
      state.labTypeList = labTypeList;
    },
    savePeopleLimitList (state, peopleLimitList) {
      state.peopleLimitList = peopleLimitList;
    },
    saveEquFaultStatusList (state, equFaultStatusListt) {
      state.equFaultStatusList = equFaultStatusListt;
    },
    saveEquFaultCauseList (state, equFaultCauseList) {
      state.equFaultCauseList = equFaultCauseList;
    },
    saveEquHandleStatusList (state, equHandleStatusList) {
      state.equHandleStatusList = equHandleStatusList;
    },
    saveEquMaintainTypeList (state, equMaintainTypeList) {
      state.equMaintainTypeList = equMaintainTypeList;
    },
    saveLabEquTypeList (state, labEquTypeList) {
      state.labEquTypeList = labEquTypeList;
    },
    saveMaterialTypeList (state, materialTypeList) {
      state.materialTypeList = materialTypeList;
    }
  },
  actions: {
  }
});
export default store;
