import { Type } from "uxmid-core";

/**
 * 应用程序对应平台枚举
 * @enum
 */
enum APPLICATION_PLATFORM
{
    /**
     * 主平台
     */
    MAIN = 0,
    /**
     * 鉴权平台
     */
    AUTH = 1,
}
Type.setMetadata(APPLICATION_PLATFORM,
{
    MAIN:
    {
        alias: "主平台",
        description: "默认一个web系统只对接一个后端系统"
    },
    AUTH:
    {
        alias: "鉴权平台",
        description: "默认一个web系统只对接一个鉴权平台"
    }
});

export default APPLICATION_PLATFORM;
