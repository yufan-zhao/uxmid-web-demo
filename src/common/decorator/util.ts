import * as utils from "src/common/utils";

type IUtilName = "TreeTools" | "DownloadUtil" | "ExtendUtil" | "Patterns" | "UrlUtil" | "ObserverUtil";

export function util(name: IUtilName)
{
    return (target: any, key: string) =>
    {
        if (!name)
        {
            throw new Error("工具名称不能为空！");
        }

        // 当前选择的工具
        const util = utils[name];

        // 检查当前工具是否存在
        if (!util)
        {
            throw new Error(`不存在${name}工具，再见！`);
        }

        // 检测是否存在单实例，如果存在直接返回单实例
        if (util["instance"])
        {
            target[key] = util["instance"];
        }
        else
        {
            target[key] = util;
        }
    };
}
