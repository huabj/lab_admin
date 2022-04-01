import Config from '../global/global_config';
import GlobalService from '../global/global_service';

let service;

// class定义一个类service来继承globalservice中所有的属性和方法
class Service extends GlobalService {
  static getInstance () {
    if (!service) {
      service = new Service();
      return service;
    }
  };
  // 以下为接口请求的方法
  login (loginForm) {
    return this.POST(Config.POST_URL + '/auth/login', loginForm);
  }
  // 注销登录接口
  logout () {
    return this.DELETE(Config.POST_URL + '/auth/logout');
  }
  // 用户管理--用户列表
  usersList (getUsersListForm) {
    return this.GET(Config.POST_URL + '/api/users', getUsersListForm);
  }
  // 用户管理--用户新增
  addUsers (addUsersForm) {
    return this.POST(Config.POST_URL + '/api/users', addUsersForm);
  }
  // 用户管理--修改用户
  updateUsers (addUsersForm) {
    return this.PUT(Config.POST_URL + '/api/users', addUsersForm);
  }
  // 用户管理--用户删除
  deleteUsers (usersList) {
    return this.DELETE(Config.POST_URL + '/api/users', usersList);
  }
  // 用户管理--用户上传头像
  updateAvatar (formData, config) {
    return this.POST(Config.POST_URL + '/api/users/updateUserAvatar', formData, config);
  }
  // 菜单管理--用户菜单
  menusBuild () {
    return this.GET(Config.POST_URL + '/api/menus/build');
  }
  // 菜单管理--菜单列表
  menus () {
    return this.GET(Config.POST_URL + '/api/menus');
  }
  // 菜单管理--新增菜单
  addMenus (addMenusForm) {
    return this.POST(Config.POST_URL + '/api/menus', addMenusForm);
  }
  // 菜单管理--菜单修改
  updateMenus (addMenusForm) {
    return this.PUT(Config.POST_URL + '/api/menus', addMenusForm);
  }
  // 菜单管理--菜单删除
  deleteMenus (list) {
    return this.DELETE(Config.POST_URL + '/api/menus', list);
  }
  // 角色管理--角色列表
  rolesList () {
    return this.GET(Config.POST_URL + '/api/roles');
  }
  // 角色管理--角色新增
  addRoles (addRolesForm) {
    return this.POST(Config.POST_URL + '/api/roles', addRolesForm);
  }
  // 角色管理--角色修改
  updateRoles (addRolesForm) {
    return this.PUT(Config.POST_URL + '/api/roles', addRolesForm);
  }
  // 角色管理--角色删除
  deleteRoles (list) {
    return this.DELETE(Config.POST_URL + '/api/roles', list);
  }
  // 角色管理--角色菜单修改
  updateRolesMenus (addRolesForm) {
    return this.PUT(Config.POST_URL + '/api/roles/menu', addRolesForm);
  }
  menusBuildConvert () {
    return this.GET(Config.POST_URL + '/api/menus/build/convert');
  }
  // 角色管理--所有角色
  rolesAll () {
    return this.GET(Config.POST_URL + '/api/roles/all');
  }
  // 字典库
  dictDetail (dictName) {
    return this.GET(Config.POST_URL + '/api/dictDetail/map?dictName=' + dictName);
  }
  // 教学楼管理--教学楼查询接口
  floor () {
    return this.GET(Config.POST_URL + '/api/floor');
  }
  // 实训室查询接口
  laboratory (laboratoryForm) {
    return this.GET(Config.POST_URL + '/api/laboratory', laboratoryForm);
  }
  // 实训室新增接口
  addLab (addLabForm) {
    return this.POST(Config.POST_URL + '/api/laboratory', addLabForm);
  }
  // 实训室修改
  updateLab (addLabForm) {
    return this.PUT(Config.POST_URL + '/api/laboratory', addLabForm);
  }
  // 实训室删除
  deleteLab (list) {
    return this.DELETE(Config.POST_URL + '/api/laboratory', list);
  }
  // 实训室设备查询接口
  labEqu () {
    return this.GET(Config.POST_URL + '/api/laboratory/equipment');
  }
  // 实训室设备故障查询
  labEquFault (troubleInfoForm) {
    return this.GET(Config.POST_URL + '/api/laboratory/equipment_fault', troubleInfoForm);
  }
  // 实训室设备故障删除
  deleteLabEquFault (list) {
    return this.DELETE(Config.POST_URL + '/api/laboratory/equipment_fault', list);
  }
  // 实训室设备故障导出接口
  downloadLabEquFault (list) {
    return this.POST(Config.POST_URL + '/api/laboratory/equipment_fault/download', list);
  }
  // 实训室设备故障修改接口
  labHandle (labHandleForm) {
    return this.PUT(Config.POST_URL + '/api/laboratory/equipment_fault', labHandleForm);
  }
  // 实训室影像查询接口
  labVideo (labVideoForm) {
    return this.GET(Config.POST_URL + '/api/laboratory/video', labVideoForm);
  }
  // 实训室影像新增接口
  addLabVideo (addLabVideoFrom) {
    return this.POST(Config.POST_URL + '/api/laboratory/video', addLabVideoFrom);
  }
  // 实训室影像删除接口
  deleteVideo (list) {
    return this.DELETE(Config.POST_URL + '/api/laboratory/video', list);
  }
  // 公告查询接口
  notice (getNoticeListForm) {
    return this.GET(Config.POST_URL + '/api/notice', getNoticeListForm);
  }
  // 物料查询
  supplies (getSuppliesDataForm) {
    return this.GET(Config.POST_URL + '/api/supplies', getSuppliesDataForm);
  }
  // 物料删除接口
  deleteSupplies (list) {
    return this.DELETE(Config.POST_URL + '/api/supplies', list);
  }
  // 物料新增接口
  addSupplies (addSuppliesForm) {
    return this.POST(Config.POST_URL + '/api/supplies', addSuppliesForm);
  }
  // 物料修改接口
  updateSupplies (addSuppliesForm) {
    return this.PUT(Config.POST_URL + '/api/supplies', addSuppliesForm);
  }
  // 预约列表接口
  subscribe (subscribeForm) {
    return this.GET(Config.POST_URL + '/api/subscribe', subscribeForm);
  }
  // 我的预约列表
  mySubscribe (mySubscribeForm) {
    return this.GET(Config.POST_URL + '/api/subscribe/my', mySubscribeForm);
  }
  // 实训室档案查询
  labRecord (labRecordForm) {
    return this.GET(Config.POST_URL + '/api/laboratory/record', labRecordForm);
  }
  // 实训室档案批量删除
  deleteLabRecord (list) {
    return this.DELETE(Config.POST_URL + '/api/laboratory/record', list);
  }
  // 预约新增接口
  addSubscribe (addSubscribeForm) {
    return this.POST(Config.POST_URL + '/api/subscribe', addSubscribeForm);
  }
  // 工作台预约列表接口
  subscribeWork (getMySubscribeForm) {
    return this.GET(Config.POST_URL + '/api/subscribe/work', getMySubscribeForm);
  }
  // 预约取消接口
  deleteSubscribe (list) {
    return this.DELETE(Config.POST_URL + '/api/subscribe', list);
  }
  // 排课模板下载接口
  subscribeDownload () {
    return this.GET(Config.POST_URL + '/api/subscribe/download');
  }
  // 批量预约
  subscribeUpload (formData, config) {
    return this.POST(Config.POST_URL + '/api/subscribe/upload', formData, config);
  }
  // 授权查询接口
  authorization (authorizationForm) {
    return this.GET(Config.POST_URL + '/api/subscribe/authorization', authorizationForm);
  }
  // 密码修改接口
  updatePass (updatePassForm) {
    return this.POST(Config.POST_URL + '/api/users/updatePass', updatePassForm);
  }
  // 预约修改接口
  updateSubscribe (subscribeForm) {
    return this.PUT(Config.POST_URL + '/api/subscribe', subscribeForm);
  }
  // 遥控开关
  control (controlForm) {
    return this.GET(Config.POST_URL + '/api/laboratory/control', controlForm);
  }
  // 教学楼实训室关系查询
  relation () {
    return this.GET(Config.POST_URL + '/api/classMessage/relation');
  }
  // 班牌消息新增接口
  addClassMessage (addClassMessageForm) {
    return this.POST(Config.POST_URL + '/api/classMessage', addClassMessageForm);
  }
  // 班牌消息查询
  classMessage () {
    return this.GET(Config.POST_URL + '/api/classMessage');
  }
  // 文件上传接口
  localStorage (formData, config) {
    return this.POST(Config.POST_URL + '/api/localStorage', formData, config);
  }
  // 班牌消息修改接口
  updateClassMessage (updateClassMessageForm) {
    return this.PUT(Config.POST_URL + '/api/classMessage', updateClassMessageForm);
  }
  // 安全模块查询接口
  labModule () {
    return this.GET(Config.POST_URL + '/api/laboratory/module');
  }
  // 上课总时长统计
  courseAllTime () {
    return this.GET(Config.POST_URL + '/api/statistics/courseAllTime');
  }
  // 物料申请统计
  suppliesAllData () {
    return this.GET(Config.POST_URL + '/api/statistics/suppliesAllData');
  }
  // 周课时分布
  subscribeAllData (data) {
    return this.GET(Config.POST_URL + '/api/statistics/subscribeAllData', data);
  }
  laboratoryStatistics () {
    return this.GET(Config.POST_URL + '/api/statisticsOne/laboratoryStatistics');
  }
  // 实训室故障查询
  laboratoryEquipmentFaultStatistics (form) {
    return this.GET(Config.POST_URL + '/api/statisticsOne/laboratoryEquipmentFaultStatistics', form);
  }
  // 实训室综合情况统计
  laboratorySynthesizeStatistics (form) {
    return this.GET(Config.POST_URL + '/api/statisticsOne/laboratorySynthesizeStatistics', form);
  }
  laboratoryStatisticsById (form) {
    return this.GET(Config.POST_URL + '/api/statisticsOne/laboratoryStatisticsById', form);
  }
  subscribeAllDataOne () {
    return this.GET(Config.POST_URL + '/api/statistics/subscribeAllDataOne');
  }
  // 根据id查询实训室详情接口
  laboratoryOne (id) {
    return this.GET(Config.POST_URL + '/api/laboratory/' + id);
  }
  statisticsTwo () {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/statistics');
  }
  statisticsOne (form) {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/statisticsOne', form);
  }
  subscribeStatisticsByUser () {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/subscribeStatisticsByUser');
  }
  laboratoryStatisticsData () {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/laboratoryStatistics');
  }
  laboratoryEquipmentTimeStatistics (form) {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/laboratoryEquipmentTimeStatistics', form);
  }
  laboratoryUseStatistics (form) {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/laboratoryUseStatistics', form);
  }
  subscribeByTime (form) {
    return this.GET(Config.POST_URL + '/api/statisticsTwo/subscribeByTime', form);
  }
  getLaboratoryList () {
    return this.GET(Config.POST_URL + '/api/laboratory/list');
  }
};
export default Service.getInstance();
