import { IHttpRequest } from "src/models";
import Apis from "../apis";
import ApiUrls from "./application";

export default class MainApis extends Apis<ApiUrls>
{
    // 认证接口
    public login = (options?: IHttpRequest) => this.send(this._urls.login, options, "post"); // 登录

    // 权限接口
    public permissionList   = (options?: IHttpRequest) => this.send(this._urls.permissionList, options, "get");                 // 列表
    public permissionDetail = (options?: IHttpRequest) => this.send(this._urls.permissionDetail, options, "get");               // 详情
    public permissionInsert = (options?: IHttpRequest) => this.send(this._urls.permissionInsert, options, "post");              // 新增
    public permissionUpdate = (options?: IHttpRequest) => this.send(this._urls.permissionUpdate, options, "put");               // 修改
    public permissionDelete = (options?: IHttpRequest) => this.send(this._urls.permissionDelete, options, "put");               // 删除

    // 角色接口
    public roleList   = (options?: IHttpRequest) => this.send(this._urls.roleList, options, "get");                             // 列表
    public roleDetail = (options?: IHttpRequest) => this.send(this._urls.roleDetail, options, "get");                           // 详情
    public roleInsert = (options?: IHttpRequest) => this.send(this._urls.roleInsert, options, "post");                          // 新增
    public roleUpdate = (options?: IHttpRequest) => this.send(this._urls.roleUpdate, options, "put");                           // 修改
    public roleDelete = (options?: IHttpRequest) => this.send(this._urls.roleDelete, options, "put");                           // 删除

    // 用户接口
    public userList   = (options?: IHttpRequest) => this.send(this._urls.userList, options, "get");                             // 列表
    public userDetail = (options?: IHttpRequest) => this.send(this._urls.userDetail, options, "get");                           // 详情
    public userInsert = (options?: IHttpRequest) => this.send(this._urls.userInsert, options, "post");                          // 新增
    public userUpdate = (options?: IHttpRequest) => this.send(this._urls.userUpdate, options, "put");                           // 修改
    public userDelete = (options?: IHttpRequest) => this.send(this._urls.userDelete, options, "put");                           // 删除

    // 用户组接口
    public userGroupList   = (options?: IHttpRequest) => this.send(this._urls.userGroupList, options, "get");                   // 列表
    public userGroupDetail = (options?: IHttpRequest) => this.send(this._urls.userGroupDetail, options, "get");                 // 详情
    public userGroupInsert = (options?: IHttpRequest) => this.send(this._urls.userGroupInsert, options, "post");                // 新增
    public userGroupUpdate = (options?: IHttpRequest) => this.send(this._urls.userGroupUpdate, options, "put");                 // 修改
    public userGroupDelete = (options?: IHttpRequest) => this.send(this._urls.userGroupDelete, options, "put");                 // 删除

    // 数据字典接口
    public dictList   = (options?: IHttpRequest) => this.send(this._urls.dictList, options, "get");                             // 列表
    public dictDetail = (options?: IHttpRequest) => this.send(this._urls.dictDetail, options, "get");                           // 详情
    public dictInsert = (options?: IHttpRequest) => this.send(this._urls.dictInsert, options, "post");                          // 新增
    public dictUpdate = (options?: IHttpRequest) => this.send(this._urls.dictUpdate, options, "put");                           // 修改
    public dictDelete = (options?: IHttpRequest) => this.send(this._urls.dictDelete, options, "put");                           // 删除
}
