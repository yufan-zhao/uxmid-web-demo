import BusinessUrl from "./business";

export default class ApplicationUrl extends BusinessUrl
{
    // 认证接口
    public login            = "/oauth/token";

    // 权限接口
    public permissionList   = "/permission/list";
    public permissionDetail = "/permission/getDetailById";
    public permissionInsert = "/permission/save";
    public permissionUpdate = "/permission/updateById";
    public permissionDelete = "/permission/virtualRemoveById";

    // 角色接口
    public roleList         = "/role/list";
    public roleDetail       = "/role/getDetailById";
    public roleInsert       = "/role/save";
    public roleUpdate       = "/role/updateById";
    public roleDelete       = "/role/virtualRemoveById";

    // 用户接口
    public userList         = "/user/list";
    public userDetail       = "/user/getDetailById";
    public userInsert       = "/user/save";
    public userUpdate       = "/user/updateById";
    public userDelete       = "/user/virtualRemoveById";

    // 用户组接口
    public userGroupList    = "/userGroup/list";
    public userGroupDetail  = "/userGroup/getDetailById";
    public userGroupInsert  = "/userGroup/save";
    public userGroupUpdate  = "/userGroup/updateById";
    public userGroupDelete  = "/userGroup/virtualRemoveById";

    // 数据字典接口
    public dictList         = "/dataDictionary/list";
    public dictDetail       = "/dataDictionary/getDetailById";
    public dictInsert       = "/dataDictionary/save";
    public dictUpdate       = "/dataDictionary/updateById";
    public dictDelete       = "/dataDictionary/virtualRemoveById";
}
