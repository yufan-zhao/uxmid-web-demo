import { Application, Type } from "uxmid-core";
import { ApplicationContext } from "src/application";
import { IPaginFilterItem } from "src/models";
import { APPLICATION_PLATFORM } from "src/enums";

export default
{
    imagePath,
    decodeFilterValue,
    throttle,
    createTipElement,
    createStatusElement,
    tooltipElement
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

/**
 * 创建标签
 * @param h 创建函数
 * @param label 标签文字
 * @param color 标签颜色
 * @param invert 是否反色
 */
export function createTipElement(h: Function, label: string, color: string, invert: boolean = false)
{
    return h("span", {
        class: "title-tip",
        style: {
            color: invert ? "#fff" : color,
            "background-color": invert ? color : "transparent",
            "border": `1px solid ${color}`,
            "font-size": "12px"
        }
    }, label);
}

/**
 * 创建一个状态标签
 * @param h 
 * @param label 
 * @param color 
 * @param invert 
 */
export function createStatusElement(h: Function, label: string, color: string, invert: boolean = false)
{
    return h("span", {
        class: "status-tip",
        style: {
            color: invert ? "#fff" : color,
            "background-color": invert ? color : "transparent",
            "border": `1px solid ${color}`
        }
    }, label);
}

/**
 * 单行文本一处 采取省略号+tooltip。
 * value（内容） lengths（截取内容长度或字数） h（表格里render的h函数）
 * maxWidth（div最大宽度） ele（标签类型） className（class名）
 * @param value
 * @requires any
 */
export function tooltipElement(value, lengths, h, maxWidth, ele = "div",className = ""): any
{
    let nameDiv = null;

    if (value && value.length > lengths)
    {
        if (typeof value !== "object")
        {
            nameDiv = h("i-tooltip",
            {
                props: {
                    theme: "light",
                    content: value,
                    transfer: true,
                    "max-width": maxWidth
                },
                class: "more-text-tooltip f14"
            },
            [
                h(ele,
                {
                    style:
                    {
                        maxWidth: maxWidth,
                        display: "inline-block",
                        "white-space": "nowrap"
                    },
                    class: `rows-1 ${className}`
                },value || "-")

            ]);
        }
        else
        {
            let element = [];
            for(let i of value)
            {
                let box = h("span",{},[
                    h("span",i.userName),
                    h("u-user-tooltip",
                    {
                        attrs:
                        {
                            userId: i.userId,
                            type: "user",
                            userInfo: {}
                        }

                    },
                    [
                        h("i",
                        {
                            class: "iconfont icon-icon_information cursor-pointer main-color"
                        } , "；")
                    ])
                ]);

                element.push(box);
            }

            nameDiv = h("i-tooltip",
            {
                props: {
                    theme: "light",
                    content: "替换内同容",
                    transfer: true,
                    "max-width": maxWidth
                },
                class: "more-text-tooltip f14"
            },
            [
                h("div",{slot:  "content"},
                [
                    element
                ]),
                h("div",{
                    class: "rows-1",
                    style:
                    {
                        maxWidth: maxWidth,
                        display: "inline-block"
                    }
                },element)
            ]);
        }
    }

    else
    {
        nameDiv = h(ele,
        {
            class: className,
            style:
            {
                maxWidth: maxWidth,
                display: "inline-block",
                "white-space": "nowrap"
            }
        },value || "-");
    }

    return nameDiv;
}
