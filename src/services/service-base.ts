import { Application } from "uxmid-core";

import { APPLICATION_PLATFORM } from "src/enums";
import { ApplicationContext } from "src/application";
import { MainApis } from "src/apis";

/**
 * 业务服务基类。
 * @abstract
 * @class
 */
export default abstract class ServiceBase
{
    /**
     * 获取当前应用的上下文实例。
     * @protected
     * @property
     * @returns ApplicationContext
     */
    protected get applicationContext(): ApplicationContext
    {
        return Application.context as ApplicationContext;
    }

    /**
     * 获取当前应用的主接口实例
     * @protected
     * @property
     * @returns {MainApis} 主接口实例
     */
    protected get mainApis(): MainApis
    {
        return <MainApis>this.applicationContext.httpApiMap.get(APPLICATION_PLATFORM.MAIN);
    }
}
