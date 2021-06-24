import { Application } from "uxmid-core";

import { ApplicationContext } from "src/application";

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
}
