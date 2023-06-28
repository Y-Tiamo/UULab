/**
 * key命名规则：模块名_[页面名]_具体内容
 * 模块分为：通用模块common、登录模块log、首页模块home、消息模块msg、科室模块lab、个人中心mine
 * 页面名称：xxx_page，
 * 完整key示例：
 * 通用操作取消按钮:common_cancel:'取消
 */
const zhTW={
    home: '首页',
    message: '消息',
    lab: '科室',
    mine: '我的',

    //通用
    confirm: '确定',
    cancel: '取消',
    delete: '删除',
    copy: '复制',
    save: '保存',
    verify: '验证',
    next: '下一步',
    success: '操作成功',
    retry: '重试',
    copy_success: '复制成功',
    cancel_success: '注销成功',

    //登录-begin
    phone_or_email: '手机号/邮箱',
    code: '验证码',
    password: '密码',
    send_code: '发送验证码',
    re_send: '重新发送',
    account_or_password_error: '用户名密码不正确',
    log_on: '登录',
    code_login: '验证码登录',
    password_login: '密码登录',
    register: '立即注册',
    user_agreement: '用户协议',
    privacy_policy: '隐私政策',
    read_and_agree: '已阅读并同意',
    forgot_password: '忘记密码',
    code_error: '验证码错误，请重新输入',
    //注册界面
    input_name: '请输入您的真实姓名',
    normal_user: '普通用户',
    admin: '管理员',
    //验证手机号界面
    reset_your_password: '请重置您的账号密码',
    input_password: '请输入密码',
    input_password_again: '请再次输入密码',
    password_length_tip: '密码长度8～16位',
    password_reset_error_tip: '两次输入密码不一致',
    reset_password: '重置密码',
    //登录-end

    //首页-begin
    all: '全部',
    running: '运行中',
    standby: '待机',
    offline: '离线',
    breakdown: '故障',
    repair: '维修',
    local_instrument_account: '本地仪器账号',
    please_input_account: '请输入账号',
    please_input_password: '请输入密码',
    //首页-end

    //添加设备页面-begin
    add_instrument: '添加设备',
    scan: '扫一扫',
    input_instrument_pn_number: '请输入产品PN号',
    input_instrument_link_key: '请输入连接密钥',
    input_or_select_instrument_lab: '请输入仪器归属科室名称或选择',
    connect_failed: '连接失败',
    pn_number_not_match_key: 'PN号和密钥不匹配',
    //添加设备页面-end
    //消息模块-begin

    //消息模块-end

    //设备信息页面-begin
    pause: '暂停',
    stop: '终止',
    continue: '继续',
    state: '状态',
    history: '历史',
    //设备信息页面-end

    //科室页面-begin
    instrument: '仪器',
    member: '成员',
    //科室页面-end

    //个人中心页面-begin
    account_and_safe: '账号与安全',
    language: '语言',
    system_permission_manage: '系统权限管理',
    legacy_and_privacy_manage: '法律信息及隐私管理',
    privacy_desc: '隐私政策摘要',
    about_app: '关于APP',

    allowed: '已允许',
    not_allowed: '未允许',

    mine_real_name: '真实姓名',
    mine_log_out: '退出登录',
    personal_center: '个人中心',


    service_center: '服务中心',
    exclusive_hotline: '专属热线',
    email: 'Email',
    online_customer_service: '在线客服',

    bind_phone: '绑定手机号',
    login_password: '登录密码',
    cancel_the_account: '注销账号',
    set_password: '设置密码',
    reset_password_tip: '设置密码将通过短信验证码检验身份',
    code_send_success_tip: '我们已发送一条验证码到',
    input_password_tip: '请设置8~16位密码',
    mine_input_new_phone_tip: '请输入需要绑定的新手机号',
    current_current_phone_tip: '为了您的帐号安全，请输入当前绑定的手机号',
    input_current_phone_placeholder: '输入当前绑定的手机号',
    input_new_phone_placeholder: '输入需要绑定的新手机号',
    input_code: '请输入验证码',
    cancel_the_account_tip: '是否要注销当前登录账号',

    current_version: '当前版本',
    version_introduction: '版本介绍',
    version_update_log: '版本更新日志',
    //个人中心页面-end
};
export default zhTW