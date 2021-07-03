import { Injectable, Logger } from "uxmid-core";
import { IHttpResponse, IPaginFilterModel } from "src/models";

import ServiceBase from "../service-base";

/**
 * 表示一个分页接口的标准实现
 * @service
 */
@Injectable()
export default class TestPaginTableService extends ServiceBase
{
    /**
     * 标准的分页接口示例
     * @param filters 
     */
    public async pagin(filters: IPaginFilterModel): Promise<IHttpResponse>
    {
        Logger.debug("[TestPaginTableService pagin]", "请求报文：", JSON.stringify(filters));
        let result: IHttpResponse = null;

        if (filters.params.current === 1)
        {
            result =
            {
                code: 200,
                content:
                {
                    records:
                    [
                        {name: "jason1", age: 22, gender: "男"},
                        {name: "jason2", age: 23, gender: "男"},
                        {name: "jason3", age: 24, gender: "男"},
                        {name: "jason4", age: 25, gender: "男"},
                        {name: "jason5", age: 26, gender: "男"},
                        {name: "jason6", age: 27, gender: "男"},
                        {name: "jason7", age: 28, gender: "男"},
                        {name: "jason8", age: 29, gender: "男"},
                        {name: "jason9", age: 30, gender: "男"},
                        {name: "jason0", age: 31, gender: "男"}
                    ]
                },
                extras:
                {
                    pages: 2,
                    total: 13,
                    current: 1
                }
            };
        }
        else if (filters.params.current === 2)
        {
            result =
            {
                code: 200,
                content:
                {
                    records:
                    [
                        {name: "jack1", age: 22, gender: "男"},
                        {name: "jack2", age: 23, gender: "男"},
                        {name: "jack3", age: 24, gender: "男"}
                    ]
                },
                extras:
                {
                    pages: 2,
                    total: 13,
                    current: 2
                }
            };
        }
        Logger.debug("[TestPaginTableService pagin]", "返回报文：", JSON.stringify(result));
        return result;
    }
}
