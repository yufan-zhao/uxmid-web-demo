var applicationSettings =
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
    mainPrefix: "/appraiseApi"
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
