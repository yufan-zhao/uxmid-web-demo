import { IHttpResponse } from "src/models";
import { Injectable } from "uxmid-core";

import ServiceBase from "../../service-base";

@Injectable()
export default class DictService extends ServiceBase
{
    public async test()
    {
        const res = await this.mainApis.dictList();
        return res;
    }
}