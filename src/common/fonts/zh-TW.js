/**
 * key命名规则：模块名_[页面名]_具体内容
 * 模块分为：通用模块common、登录模块log、首页模块home、消息模块msg、科室模块lab、个人中心mine
 * 页面名称：xxx_page，
 * 完整key示例：
 * 通用操作取消按钮:common_cancel:'取消
 */
export default {
  tab_home: '首页',
  tab_message: '消息',
  tab_invite: '科室',
  tab_mine: '我的',

  title_message: '消息',
  title_invite: '邀请',


  //通用
  confirm:'确定',
  cancel:'取消',
  delete:'删除',
  copy:'复制',
  save:'保存',


  //登录-begin
  log_phone_or_email:'手机号/邮箱',
  log_code:'验证码',
  log_password:'密码',
  log_send_code:'发送验证码',
  log_on_re_send:'重新发送',
  log_tip_error_password:'用户名密码不正确',
  log_on:'登录',
  log_on_with_code:'验证码登录',
  log_on_with_password:'密码登录',
  register_now:'立即注册',
  user_agreement:'用户协议',
  privacy_policy:'隐私政策',
  read_and_agree:'已阅读并同意',
  forget_password:'忘记密码',
  log_on_re_enter_code:'验证码错误，请重新输入',
  //注册界面
  please_enter_your_real_name:'请输入您的真实姓名',
  ordinary_users:'普通用户',
  administrators:'管理员',
  //验证手机号界面
  reset_your_password:'请重置您的账号密码',
  enter_password:'请输入密码',
  enter_password_again:'请再次输入密码',
  password_length_tip:'密码长度8～16位',
  password_reset_error_tip:'两次输入密码不一致',
  reset_password:'重置密码',
  //登录-end

  //首页-begin
  device_status_all:'全部',
  device_status_running:'运行中',
  device_status_standby:'待机',
  device_status_offline:'离线',
  device_status_fault:'故障',
  device_status_fix:'维修',
  local_device_account:'本地仪器账号',
  please_enter_account:'请输入账号',
  please_enter_password:'请输入密码',
  //首页-end

  //添加设备页面-begin
  add_device:'添加设备',
  scan:'扫一扫',
  input_device_pn:'请输入产品PN号',
  input_device_link_key:'请输入连接密钥',
  input_or_select_device_room:'请输入仪器归属科室名称或选择',
  connect_failed:'连接失败',
  pn_not_match_key:'PN号和密钥不匹配',
  retry:'重试',
  //添加设备页面-end
  //消息模块-begin

  //消息模块-end

  //设备信息页面-begin
  device_info_action_pause:'暂停',
  device_info_action_stop:'终止',
  device_info_action_continue:'继续',
  device_info_tab_status:'状态',
  device_info_tab_fix:'维护',
  device_info_tab_history:'历史',
  //设备信息页面-end

  //科室页面-begin
  lab_tab_instrument:'仪器',
  lab_tab_member:'成员',
  //科室页面-end

  //个人中心页面-begin
  mine_menu_account_safe:'账号与安全',
  mine_menu_language:'语言',
  mine_menu_system_permission_manager:'系统权限管理',
  mine_menu_user_agreement_manager:'法律信息及隐私管理',
  mine_menu_user_agreement_simple:'隐私政策摘要',
  mine_menu_about_app:'关于APP',

  mine_permission_is_granted:'已允许',
  mine_permission_is_not_granted:'未允许',


  mine_real_name:'真实姓名',
  mine_person_center:'个人中心',
  mine_log_out:'退出登录',

  mine_service_center:'服务中心',
  mine_service_center_phone:'专属热线',
  mine_service_center_email:'Email',
  mine_service_center_customer:'在线客服',
  mine_service_center_copy_success:'复制成功',

  mine_account_safe_bind_phone:'绑定手机号',
  mine_account_safe_log_password:'登录密码',
  mine_account_safe_delete_account:'注销账号',
  mine_account_safe_set_password:'设置密码',
  mine_account_safe_set_log_password:'设置登录密码',
  mine_account_safe_verify:'验证',
  mine_account_safe_verify_tip:'设置密码将通过短信验证码检验身份',
  mine_account_safe_code_send_success_tip:'我们已发送一条验证码到',
  mine_account_safe_set_password_tip:'请设置8~16位密码',
  mine_account_safe_next_step:'下一步',
  mine_input_new_phone_tip:'请输入需要绑定的新手机号',
  mine_input_current_phone_tip:'为了您的帐号安全，请输入当前绑定的手机号',
  mine_input_current_phone_placeholder:'输入当前绑定的手机号',

  mine_about_app_current_version:'当前版本',
  mine_about_app_version_introduction:'版本介绍',
  mine_about_app_version_update_logcat:'版本更新日志',
  //个人中心页面-end
};
