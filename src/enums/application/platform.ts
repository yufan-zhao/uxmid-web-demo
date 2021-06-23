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
    MAIN = 0
}
Type.setMetadata(APPLICATION_PLATFORM,
{
    MAIN:
    {
        alias: "主平台",
        description: "默认一个web系统只对接一个后端系统"
    }
});

export default APPLICATION_PLATFORM;
