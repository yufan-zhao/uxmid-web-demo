import { ArgumentException, Exception } from "uxmid-core";

import { APPLICATION_PLATFORM } from "src/enums";
import { IApplicationCredential, IHttpApi, IHttpRequest, IHttpResponse } from "src/models";
import { ApplicationContext } from "src/application";
import HttpClient from "src/common/http/http-client";

export default abstract class Apis implements IHttpApi
{
    public _platform: APPLICATION_PLATFORM;
    public _credential: IApplicationCredential;
    // public _urls: T;
    public _origin: string;
    public _prefix: string;

    public constructor(platform: APPLICATION_PLATFORM, origin: string, prefix: string)
    {
        this._platform = platform;
        // this._urls = urls;
        this._origin = origin;
        this._prefix = prefix;
    }

    /**
     * 发送请求方法
     * @param url 
     * @param options 
     * @param method 
     */
    protected send(url: string, options?: IHttpRequest, method?: string): Promise<IHttpResponse>
    {
        const requestConfig: IHttpRequest =
        {
            url: `${this._origin}${this._prefix}${url}`,
            headers: {},
            ...options
        };

        // 主动设置凭证
        this.setAuthorizationHeader(requestConfig);

        return HttpClient.instance[method](requestConfig);
    }

    /**
     * 自定义设置请求头凭证
     * @param headers 请求头对象 
     * @returns {void}
     */
    protected abstract setAuthorizationHeader(requestConfig: IHttpRequest): void;

    /**
     * 获取当前请求api的凭证
     * @protected
     * @returns {IApplicationCredential}
     */
    protected getCredential(): IApplicationCredential
    {
        if (!this._credential)
        {
            const credentialMap = ApplicationContext.current.credentialMap;
            if (credentialMap)
            {
                this._credential = credentialMap.get(this._platform);
            }
        }
        
        return this._credential;
    }
}
