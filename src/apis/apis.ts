import { ArgumentException } from "uxmid-core";

import { APPLICATION_PLATFORM } from "src/enums";
import { IApplicationCredential, IHttpApi, IHttpRequest, IHttpResponse } from "src/models";
import HttpClient from "src/common/http/http-client";

export default abstract class Apis implements IHttpApi
{
    public platform: APPLICATION_PLATFORM;
    public credential: IApplicationCredential;
    public apis: { [name: string]: string; };
    public origin: string;
    public prefix: string;

    public constructor(
        platform: APPLICATION_PLATFORM, credential: IApplicationCredential,
        apis: { [name: string]: string; }, origin: string, prefix: string)
    {
        this.platform = platform;
        this.credential = credential;
        this.apis = apis;
        this.origin = origin;
        this.prefix = prefix;
    }

    protected async send(url: string, options?: IHttpRequest, method: string = "post"): Promise<IHttpResponse>
    {
        if (!url)
        {
            throw new ArgumentException("url is null.");
        }

        return HttpClient.instance[method](
        {
            url: `${this.origin}${this.prefix}${url}`,
            ...options
        });
    }
}
