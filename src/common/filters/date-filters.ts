/*!
 * @Author: Evan <skcy@vip.qq.com>
 * @Date:  2019-06-20 11:57:42
 * @version: 1.0.0
 * Copyright (C) 2018-2019 O&M Cloud Inc. All rights reserved.
 */

// import { formatDate, formatDateTime, formatDateHHMM, formatHHMM } from "common/utils/extends";
import { DateUtils } from "src/common/utils";
import dayjs from "dayjs";
export function dateFilter(value: string | Date)
{
    return DateUtils.formatDate(value) || "-";
}

export function dateTimeFilter(value: string | Date)
{
    return DateUtils.formatDateTime(value) || "-";
}

export function DateHHMMFilter(value: string | Date)
{
    return DateUtils.formatDateHHMM(value) || "-";
}
export function HHMMFilter(value: string | Date)
{
    return DateUtils.formatHHMM(value) || "-";
}
/**
 * 计算时间
 * @param roles
 * @requires string
 */
export function getDuration(t1 = 0, t2 = 0)
{
    let value = dayjs(t2).valueOf() - dayjs(t1).valueOf();

    let days    = value / 1000 / 60 / 60 / 24;
    let daysRound = Math.floor(days);
    let hours = value / 1000 / 60 / 60 - (24 * daysRound);
    let hoursRound = Math.floor(hours);
    let minutes = value / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    let minutesRound = Math.floor(minutes);
    let seconds = value / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    let time = daysRound + "天" + hoursRound + "时" + minutesRound + "分" + seconds + "秒";
    daysRound && (time = daysRound + "天" + hoursRound + "时" + minutesRound + "分" + seconds + "秒");
    hoursRound && !daysRound && (time = hoursRound + "时" + minutesRound + "分" + seconds + "秒");
    minutesRound && !daysRound && !hoursRound && (time = minutesRound + "分" + seconds + "秒");
    !minutesRound && !daysRound && !hoursRound && seconds && (time = seconds + "秒");
    return time;
}
