var applicationSettings =
{
    fullName: "web项目全称",
    abbreviation: "web项目简称",
    version: "web项目版本"
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
