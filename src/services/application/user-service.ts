import { Injectable, BroadcastManager, Broadcast, Map, Logger } from "uxmid-core";

import ServiceBase from "../service-base";
import { IHttpResponse, IHttpRequest } from "src/models";
import { BroadcastChannels } from "src/broadcasts";

@Injectable()
export default class UserService extends ServiceBase
{
    /**
     * 登录
     * @public
     * @async
     * @param {ILoginModel} model
     * @returns {Promise<void>}
     */
    public async login(model: any): Promise<void>
    {
        // 登录之前清空上次的凭证
        this.applicationContext.credential = null;
        const loginReq: IHttpRequest =
        {
            serializeType: "application/x-www-form-urlencoded",
            data:
            {
                client_id: "oauth-client-id",
                client_secret: "oauth-client-secret",
                grant_type: "password",
                terminal: "web",
                ...model
            }
        };

        Logger.debug("[UserService] login", "请求报文：", loginReq);
        const res = await this.mainApis.login(loginReq);
        Logger.debug("[UserService] login", "返回报文：", res);

        const loginMap = new Map<string, any>();
        loginMap.set("loginRes", res.content);
        const loginMessage = new Broadcast(BroadcastChannels.LOGIN, loginMap);
        BroadcastManager.instance.send(loginMessage); // !! 重要：保存用户凭据至上下文中
    }

    /**
     * 获取图形验证码
     * @public
     * @async
     * @param {number} uuid
     * @returns {Promise<IHttpResponse>}
     */
    public async getVerifyImg(uuid: number): Promise<IHttpResponse>
    {
        const res = await this.mainApis.getVerifyImg({
            params:
            {
                uuid: uuid
            },
            responseType: "blob"
        });
        return res;
    }

    /**
     * 获取手机验证码
     * @public
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findPwdMsgCode(params): Promise<IHttpResponse>
    {
        const { username: userName, mobile } = params;
        const res = await this.mainApis.findPwdMsgCode({
            urlPath:
            {
                userName,
                mobile
            }
        });
        return res;
    }

    /**
     * 找回密码
     * @public
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findPassword(params): Promise<IHttpResponse>
    {
        const res = await this.mainApis.findPassword({
            data: params
        });
        return res;
    }
}
