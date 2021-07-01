import { IHttpResponse } from "src/models";
import { Injectable } from "uxmid-core";

import ServiceBase from "../service-base";

@Injectable()
export default class AuthService extends ServiceBase
{
    public async mainLogin(): Promise<IHttpResponse>
    {
        const res = await this.mainApis.login();
        return res;
    }
}
