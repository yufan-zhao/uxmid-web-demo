import { ApplicationContext } from "src/application";
import { IHttpRequest } from "src/models";
import Apis from "../apis";
import AuthUrls from "./auth-urls";

export default class AuthApis extends Apis
{
    // 鉴权
    public login            = (options?: IHttpRequest) => this.send(AuthUrls.login, options, "post");                         // 登录
    public logout           = (options?: IHttpRequest) => this.send(AuthUrls.logout, options, "get");                         // 退出登录

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
    }
};
