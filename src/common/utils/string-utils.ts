import { Application, Type } from "uxmid-core";

export default
{
    formatString
};

/**
 * 替换字符串占位符
 * @function
 * @version 1.0.0
 * @param {string} str 传入需要处理的字符串
 * @param {Array | Object} args 传入字符串中要被替换的参数。类型为数组或者object
 * @returns {string}
 */
export function formatString(str: string, args: Array<any> | any): string
{
    let tempStr = str;

    if (arguments.length > 1)
    {
        if (Type.isObject(args))
        {
            for (let key in args)
            {
                if (args[key] !== undefined)
                {
                    let reg = new RegExp("({" + key + "})", "g");
                    tempStr = tempStr.replace(reg, args[key]);
                }
            }
        }

        if (Type.isArray(args))
        {
            for (let i = 0; i < args.length; i++)
            {

                if (args[i] !== undefined)
                {
                    let reg = new RegExp("({)" + i + "(})", "g");
                    tempStr = tempStr.replace(reg, args[i]);
                }
            }
        }
    }
    return tempStr;
}
