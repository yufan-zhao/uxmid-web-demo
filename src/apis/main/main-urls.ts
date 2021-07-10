export default
{
    // 认证接口
    login            : "/oauth/token",                                           // 登录
    getVerifyImg     : "/free/getVerifyImg",                                     // 登录页请求图形验证码
    findPwdMsgCode   : "/users/getPwdSendMsg/{userName}/{mobile}",               // 找回密码短信验证码
    findPassword     : "/users/retrievePwd",                                     // 找回密码

    // 权限接口
    permissionList   : "/permission/list",
    permissionDetail : "/permission/getDetailById",
    permissionInsert : "/permission/save",
    permissionUpdate : "/permission/updateById",
    permissionDelete : "/permission/virtualRemoveById",

    // 角色接口
    roleList         : "/role/list",
    roleDetail       : "/role/getDetailById",
    roleInsert       : "/role/save",
    roleUpdate       : "/role/updateById",
    roleDelete       : "/role/virtualRemoveById",

    // 用户接口
    userList         : "/user/list",
    userDetail       : "/user/getDetailById",
    userInsert       : "/user/save",
    userUpdate       : "/user/updateById",
    userDelete       : "/user/virtualRemoveById",

    // 用户组接口
    userGroupList    : "/userGroup/list",
    userGroupDetail  : "/userGroup/getDetailById",
    userGroupInsert  : "/userGroup/save",
    userGroupUpdate  : "/userGroup/updateById",
    userGroupDelete  : "/userGroup/virtualRemoveById",

    // 数据字典接口
    dictList         : "/dataDictionary/list",
    dictDetail       : "/dataDictionary/getDetailById",
    dictInsert       : "/dataDictionary/save",
    dictUpdate       : "/dataDictionary/updateById",
    dictDelete       : "/dataDictionary/virtualRemoveById",
};
