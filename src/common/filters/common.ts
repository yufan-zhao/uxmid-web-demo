/*!
 * @Author: Evan <skcy@vip.qq.com>
 * @Date: 2018-08-22 16:52:57
 * @version: 1.0.0
 * Copyright (C) 2018-2018 O&M Cloud Inc. All rights reserved.
 */
import { EnumUtils } from "uxmid-core";
import { ApplicationContext } from "src/application";

/**
 * 给图片加时间戳
 * @param url 图片url
 */
export function urlTimetamp(url: string): string
{
    return url && url + "?t=" + parseInt("" + Math.random() * 1000000);
}

/**
 * 给图片加时间戳
 * @param url 图片url
 */
export function imagePath(url: string, type?): string
{
    return (url && ApplicationContext.current.settings.mainOriginUrl + ApplicationContext.current.settings.mainPrefix + url)
    || (type === "user" && require("assets/application/default-user.jpg"))
    || (type === "woman" && require("assets/application/default-girl.png"))
    || (type === "man" && require("assets/application/default-boy.png"));
}

/**
 * 真实四舍五入算法
 * @param {Number} digit
 * @param {Number} length
 */

export function numberRound(digit, length)
{
    length = length ? parseInt(length) : 0;
    if (length <= 0) return Math.round(digit);
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
    return digit.toFixed(length);
}

/**
 * 格式化价格
 * @param price
 * @param isShowSymbol
 * @param pirceSymbol
 * @param length
 */
export function formartPrice(price: string | number, isShowSymbol: boolean = true, pirceSymbol?: string, length?: number)
{
    if(!price && price !== 0)
    {
        return "";
    }

    let numPart,    // 整数部分
        isNegative,    // 是否负数
        priceSymbol,
        floatPart;    // 小数部分

    let index = -3;

    // 默认保留小数位为2
    length = length >= 0 ? length : 2;

    // 如果没有传入默认为0
    price = price || 0;

    // 是否是个负数
    price < 0 && (isNegative = true);

    // 将小于0的数转换为绝对值
    price = Math.abs(+price);
    // fixed = (fixed ? fixed : 2)

    // 校验传入值
    if (typeof price === "number")
    {
        price = numberRound(price, length).toString();
    }

    if (typeof price === "string")
    {

        if (price.indexOf(".") !== -1)
        {
            // 如果有小数点
            let splitNum = numberRound(parseFloat(price), length).toString().split(".");

            numPart = splitNum[0];
            floatPart = "." + splitNum[1];

        }
        else
        {
            // 如果没有小数点，补齐两位小数显示
            numPart = price;
            floatPart = ".00";
        }

        // 将每个字符串转换为数组
        numPart = numPart.toString().split("");

        while (numPart.length + index > 0)
        {

            numPart.splice(index, 0, ",");    // splice(起始位置，替换个数，数据); 起始位置为负数则倒着操作

            index -= 4;
        }

        // 处理金额符号
        priceSymbol = isShowSymbol ? pirceSymbol ? pirceSymbol : "¥" : "";

        return priceSymbol + (isNegative ? "-" : "") + numPart.join("") + (length > 0 ? floatPart : "");
    }

}

/**
 * 百分比处理
 * @param num
 * @param digit
 */
export function percentage(num: number, digit: number = 2): string
{
    return Math.round(num * 100 * (digit = Math.pow(10, digit))) / digit + "%";
}

/**
 * 把roles数组打平，获取文本。
 * @param roles
 * @requires string
 */
export function roleText(roles: Array<any>): string
{
    return roles && roles.reduce((pre, i, index) =>
    {
        return pre + i.name + (index >= roles.length - 1 ? "" : "，");
    }, "") || "-";
}

/**
 * 去除HTML标签。
 * @param roles
 * @requires string
 */
export function filterHTML(value: string): string
{
    let htmlTag = /<\/?.+?\/?>/g;

    let specialStr = /\&[a-zA-Z]{1,10}\;/g;

    // console.log(str.replace(reg,''));
    return value.replace(htmlTag, "").replace(specialStr, "");
}

/**
 * 取出枚举文本。
 * @param roles
 * @requires string
 */
export function enumText(value, enums): string
{
    return typeof value === "number" && EnumUtils.getEntry(value, enums) ? EnumUtils.getEntry(value, enums).description : "-";
}
/**
 * 取出枚举文本。
 * @param roles
 * @requires string
 */
export function enumAlias(value, enums): string
{
    return typeof value === "number" && EnumUtils.getEntry(value, enums) ? EnumUtils.getEntry(value, enums).alias : "-";
}
/**
 * 取出枚举文本。
 * @param roles
 * @requires string
 */
export function enumDescription(value, enums): any
{
    return typeof value === "number" && EnumUtils.getEntry(value, enums) ? EnumUtils.getEntry(value, enums).description : {};
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

export function createTitleElement(h: Function, label: string, width: number)
{
    // if ()
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
