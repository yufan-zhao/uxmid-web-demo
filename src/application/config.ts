import { IApplicationSettings } from "src/models";

const applicationSettings: IApplicationSettings =
{
    // 项目全称
    fullName: "web项目全称",

    // 项目简称
    abbreviation: "项目简称",

    // 项目版本
    version: "web项目版本",

    // 项目主接口地址
    mainOriginUrl: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port,

    // 项目主接口前缀
    mainPrefix: "/kaiyangSystem",

    // 鉴权接口地址
    authOriginUrl: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port,

    // 鉴权接口前缀
    authPrefix: "/auth2server",

    // 高德地图配置
    amapSetting:
    {
        // 高德自定义样式
        // style: "x",
        // 高德api密钥
        key: "x",
        // 高德服务密钥
        serviceKey: "x"
    }
};

// TODO 判断window环境下的_applicationSettings是否存在
Object.defineProperty(
    window,
    "_applicationSettings",
    {
        value: applicationSettings,
        writable: false
    }
);

export default applicationSettings;
