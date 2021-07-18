import { ApplicationContext } from "src/application";
import { IHttpRequest } from "src/models";
import Apis from "../apis";
import MainUrls from "./main-urls";

export default class MainApis extends Apis
{
    // 认证接口
    public getVerifyImg     = (options?: IHttpRequest) => this.send(MainUrls.getVerifyImg, options, "post");                  // 登录页请求图形验证码
    public findPwdMsgCode   = (options?: IHttpRequest) => this.send(MainUrls.findPwdMsgCode, options, "post");                // 找回密码短信验证码
    public findPassword     = (options?: IHttpRequest) => this.send(MainUrls.findPassword, options, "post");                  // 找回密码

    // 权限接口
    public permissionList   = (options?: IHttpRequest) => this.send(MainUrls.permissionList, options, "get");                 // 列表
    public permissionDetail = (options?: IHttpRequest) => this.send(MainUrls.permissionDetail, options, "get");               // 详情
    public permissionInsert = (options?: IHttpRequest) => this.send(MainUrls.permissionInsert, options, "post");              // 新增
    public permissionUpdate = (options?: IHttpRequest) => this.send(MainUrls.permissionUpdate, options, "put");               // 修改
    public permissionDelete = (options?: IHttpRequest) => this.send(MainUrls.permissionDelete, options, "put");               // 删除

    // 角色接口
    public roleList   = (options?: IHttpRequest) => this.send(MainUrls.roleList, options, "get");                             // 列表
    public roleDetail = (options?: IHttpRequest) => this.send(MainUrls.roleDetail, options, "get");                           // 详情
    public roleInsert = (options?: IHttpRequest) => this.send(MainUrls.roleInsert, options, "post");                          // 新增
    public roleUpdate = (options?: IHttpRequest) => this.send(MainUrls.roleUpdate, options, "put");                           // 修改
    public roleDelete = (options?: IHttpRequest) => this.send(MainUrls.roleDelete, options, "put");                           // 删除

    // 用户接口
    public userList   = (options?: IHttpRequest) => this.send(MainUrls.userList, options, "get");                             // 列表
    public userDetail = (options?: IHttpRequest) => this.send(MainUrls.userDetail, options, "get");                           // 详情
    public userInsert = (options?: IHttpRequest) => this.send(MainUrls.userInsert, options, "post");                          // 新增
    public userUpdate = (options?: IHttpRequest) => this.send(MainUrls.userUpdate, options, "put");                           // 修改
    public userDelete = (options?: IHttpRequest) => this.send(MainUrls.userDelete, options, "put");                           // 删除

    // 用户组接口
    public userGroupList   = (options?: IHttpRequest) => this.send(MainUrls.userGroupList, options, "get");                   // 列表
    public userGroupDetail = (options?: IHttpRequest) => this.send(MainUrls.userGroupDetail, options, "get");                 // 详情
    public userGroupInsert = (options?: IHttpRequest) => this.send(MainUrls.userGroupInsert, options, "post");                // 新增
    public userGroupUpdate = (options?: IHttpRequest) => this.send(MainUrls.userGroupUpdate, options, "put");                 // 修改
    public userGroupDelete = (options?: IHttpRequest) => this.send(MainUrls.userGroupDelete, options, "put");                 // 删除

    // 数据字典接口
    public dictList   = (options?: IHttpRequest) => this.send(MainUrls.dictList, options, "get");                             // 列表
    public dictDetail = (options?: IHttpRequest) => this.send(MainUrls.dictDetail, options, "get");                           // 详情
    public dictInsert = (options?: IHttpRequest) => this.send(MainUrls.dictInsert, options, "post");                          // 新增
    public dictUpdate = (options?: IHttpRequest) => this.send(MainUrls.dictUpdate, options, "put");                           // 修改
    public dictDelete = (options?: IHttpRequest) => this.send(MainUrls.dictDelete, options, "put");                           // 删除

    /**
     * 自定义凭证设置实现同步方法
     * @param url 
     * @param options 
     * @param method 
     */
    protected setAuthorizationHeader(requestConfig: IHttpRequest): void
    {
        const applicationContext = ApplicationContext.current;
        if (applicationContext.credential)
        {
            requestConfig.headers["Authorization"] = "Bearer " + applicationContext.credential.credentialId;
        }

        // 主接口用上下文中的凭证即可
        // const credential = this.getCredential();
        // if (credential)
        // {
        //     requestConfig.headers["Authorization"] = credential.token;
        // }
    }
}
