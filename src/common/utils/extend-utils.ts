import { Application, Type } from "uxmid-core";
import { ApplicationContext } from "src/application";
import { IPaginFilterItem } from "src/models";
import { APPLICATION_PLATFORM } from "src/enums";

export default
{
    imagePath,
    decodeFilterValue,
    throttle
};

/**
 * 给图片加时间戳
 * @param url 图片url
 */
export function imagePath(url: string, type?): string
{
    const applicationContext = Application.context as ApplicationContext;
    const mainHttpApi = applicationContext.httpApiMap.get(APPLICATION_PLATFORM.MAIN);
    const baseUrl = mainHttpApi._origin + mainHttpApi._prefix;
    return (url && baseUrl + url);
}

/**
 * 函数节流，在监听频繁触发函数（scroll, touchmove, mouseover等）时调用，
 * @param {Function} func 
 * @param {numebr} wait 
 * @param {number} mustRun
 * @returns {any}
 */
export function throttle(func: Function, wait: number): any
{
    let timeout;
    return function ()
    {
        let context = this;
        let args = arguments;

        if (!timeout)
        {
            timeout = setTimeout(() =>
            {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}

/**
 * 根据过滤条件的数据类型解码条件值。
 * @param  {IFilter} filter 过滤条件实例。
 * @param  {string} value 需要解码的字符串值。
 * @returns {any} 解码后的真实数据。
 */
export function decodeFilterValue(filter: IPaginFilterItem, value: any): any
{
    // 如果没有设置类型，则默认做字符串处理
    let filterType = filter.type || String;
    let filterValue: any;

    // 解码字符串值
    value = decodeURIComponent(value);

    switch (filterType)
    {
        case String:
        case Date:
            {
                filterValue = value;

                break;
            }
        case Number:
            {
                filterValue = parseFloat(value);

                break;
            }
        case Boolean:
            {
                filterValue = (value === "true" || value === "1");

                break;
            }
        default:
            {
                filterValue = JSON.parse(value);

                break;
            }
    }

    return filterValue;
}
