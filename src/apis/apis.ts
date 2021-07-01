import { ArgumentException, Exception } from "uxmid-core";

import { APPLICATION_PLATFORM } from "src/enums";
import { IApplicationCredential, IHttpApi, IHttpRequest, IHttpResponse } from "src/models";
import { ApplicationContext } from "src/application";
import HttpClient from "src/common/http/http-client";

export default abstract class Apis<T> implements IHttpApi<T>
{
    public _platform: APPLICATION_PLATFORM;
    public _credential: IApplicationCredential;
    public _urls: T;
    public _origin: string;
    public _prefix: string;

    public constructor(platform: APPLICATION_PLATFORM, urls: T, origin: string, prefix: string)
    {
        this._platform = platform;
        this._urls = urls;
        this._origin = origin;
        this._prefix = prefix;
    }

    protected async send(url: string, options?: IHttpRequest, method: string = "post"): Promise<IHttpResponse>
    {
        if (!url)
        {
            throw new ArgumentException("url is null.");
        }
        const credential = this.getCredential();

        return HttpClient.instance[method](
        {
            url: `${this._origin}${this._prefix}${url}`,
            ...options,
            token: credential ? credential.token : null
        });
    }

    private getCredential(): IApplicationCredential
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
