import { Type } from "uxmid-core";
import dayjs from "dayjs";

/**
 * 秒数转为人类可读格式
 * XXXXXX秒 -> 3小时26分
 * @param seconds 
 */
function formatSeconds(seconds: number)
{
    let result = "";
    let s = Math.floor(seconds / 1) % 60;
    seconds = Math.floor(seconds / 60);
    let i = seconds % 60;
    seconds = Math.floor(seconds / 60);
    let h = seconds % 24;
    seconds = Math.floor(seconds / 24);
    let d = seconds;

    if (s > 0)
    {
        i = i + 1;
    }

    if (d > 0)
    {
        result += `${d}天`;
    }
    if (h > 0)
    {
        result += `${h}小时`;
    }
    if (i > 0)
    {
        result += `${i}分钟`;
    }

    return result;
}

/**
 * 根据开始结束时间计算时间段
 * 几天几小时几分
 * @param startTime YYYY-MM-DD hh:mm:ss
 * @param endTime YYYY-MM-DD hh:mm:ss
 */
function formatTimeRange(startTime: string, endTime: string): string
{
    // 参数一定都要有值
    if (!(startTime && endTime))
    {
        return "-";
    }

    try
    {
        let sArr = getDateTimeArray(startTime);
        let eArr = getDateTimeArray(endTime);

        let dArr =
        [
            eArr[0] - sArr[0],
            eArr[1] - sArr[1],
            eArr[2] - sArr[2],
            eArr[3] - sArr[3],
            eArr[4] - sArr[4],
            eArr[5] - sArr[5]
        ];

        // 秒
        if (dArr[5] < 0)
        {
            dArr[5] = dArr[5] + 60;
            dArr[4]--;
        }
        // 分
        if (dArr[4] < 0)
        {
            dArr[4] = dArr[4] + 60;
            dArr[3]--;
        }
        // 时
        if (dArr[3] < 0)
        {
            dArr[3] = dArr[3] + 24;
            dArr[2]--;
        }
        // 日
        if (dArr[2] < 0)
        {
            dArr[2] = dArr[2] + getMonthDays(sArr[1], sArr[0]);
            dArr[1]--;
        }
        // 月
        if (dArr[1] < 0)
        {
            dArr[1] = dArr[1] + 12;
            dArr [0]--;
        }
        // 年
        if (dArr[0] < 0)
        {
            throw new Error("起始日期不能晚于结束日期");
        }

        let texts = ["年", "月", "天", "小时", "分钟", "秒"];
        let result = dArr.reduce((acc, cur, i, arr) =>
        {
            if (cur === 0 || i === 5)
            {
                return acc;
            }
            else
            {
                return acc + cur + texts[i];
            }
        }, "");
        return result;
    }
    catch(err)
    {
        // console.error("多半是日期格式问题", err);
        return "-";
    }
}

/**
 * 获取指定年的月份有多少天
 * @param month 月份 1-12
 * @param year 年 YYYY
 * @returns {number}
 */
function getMonthDays(month: number, year: number): number
{
    let standard = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    {
        standard[1] = 29;
    }
    return standard[month - 1];
}

/**
 * 转换成arr 严格按照格式来
 * @param dateTime YYYY-MM-DD hh:mm:ss
 * @returns {Array<number>} [年 ,月 ,日 ,时 ,分 ,秒 ]
 */
function getDateTimeArray(dateTime: string): Array<number>
{
    let dateTimePart = dateTime.split(" ");
    let datePart = dateTimePart[0].split("-");
    let timePart = dateTimePart[1].split(":");
    let finalArr = datePart.concat(timePart);
    let result = [];
    for (let i = 0; i < finalArr.length; i++)
    {
        result[i] = Number(finalArr[i]);
    }
    return result;
}
/**
 * 秒数转为人类可读格式
 * XXXXXX秒 -> 3小时26分
 * @param seconds 
 */
function formatToHours(seconds: number)
{
    let result = "";
    // let s = Math.floor(seconds / 1) % 60;
    // seconds = Math.floor(seconds / 60);
    // let i = seconds % 60;
    // seconds = Math.floor(seconds / 60);
    // let h = seconds % 24;
    // let sun = Math.floor(seconds / 3600);
    let sun = (seconds / 3600).toFixed(5) ;
    // let d = seconds;
    let suns = Number(sun.substr(sun.length - 1));

    if(suns >= 5)
    {
        sun = (Number(sun) + 0.0001).toFixed(4);
    }
    else
    {
        sun = Number(sun).toFixed(4);
    }
    result = `${sun}小时`;
    // if (s > 0)
    // {
    //     i = i + 1;
    // }

    // if (d > 0)
    // {
    //     result += `${d}天`;
    // }
    // if (h > 0)
    // {
    //     result += `${h}小时`;
    // }
    // if (i > 0)
    // {
    //     result += `${i}分钟`;
    // }

    return result;
}

/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd` 形式。
 * @param  {string|Date} value
 * @returns string
 */
function formatDate(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("YYYY-MM-DD");
    }
    
    return null;
}

/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd` 形式。
 * @param  {string|Date} value
 * @returns string
 */
function formatDateHHMM(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("YYYY-MM-DD HH:mm");
    }
    
    return null;
}

/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd hh:mm:ss` 形式。
 * @param  {string|Date} value
 * @returns string
 */
function formatDateTime(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
    
    return null;
}
/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd` 形式。
 * @param  {string|Date} value
 * @returns string
 */
function formatHHMM(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("HH:mm");
    }

    return null;
}

export default
{
    formatSeconds,
    formatTimeRange,
    formatToHours,
    formatDate,
    formatDateHHMM,
    formatDateTime,
    formatHHMM
};
