import { IWorkbench, ApplicationContextBase, Exception, IEventProvider, Map } from "uxmid-core";
import Router, { Route } from "vue-router";

import { IApplicationSettings, IApplicationCredential, IHttpApi, AbstractHttpUrl } from "src/models";
import { APPLICATION_PLATFORM } from "src/enums";
import Workbench from "./workbench";

/**
 * 应用程序上下文实现类
 * @class
 */
export default class ApplicationContext extends ApplicationContextBase
{
    private _settings: IApplicationSettings;
    private _router: Router;
    private _httpApiMap: Map<APPLICATION_PLATFORM, IHttpApi<AbstractHttpUrl>>;
    private _credentialMap: Map<APPLICATION_PLATFORM, IApplicationCredential>;

    /**
     * 单例化上下文示例
     * @static
     * @readonly
     * @returns {ApplicationContext} 应用程序上下文实现类
     */
    public static readonly current: ApplicationContext = new ApplicationContext();

    /**
     * 获取当前应用的全局配置。
     * @public
     * @returns {IApplicationSettings} 当前应用的全局配置
     */
    public get settings(): IApplicationSettings
    {
        if (!this._settings)
        {
            this._settings = this.loadSettings();
        }
        return this._settings;
    }

    /**
     * 获取当前应用的路由对象。
     * @public
     * @returns {Router} Vue路由对象
     */
    public get router(): Router
    {
        return this._router;
    }

    /**
     * 设置当前应用的路由对象。
     * @public
     */
    public set router(value: Router)
    {
        this._router = value;
    }

    /**
     * 获取当前应用的http请求对象Map
     * @public
     * @returns {Map<APPLICATION_PLATFORM, IHttpApi<AbstractHttpUrl>>} http请求Map
     */
    public get httpApiMap(): Map<APPLICATION_PLATFORM, IHttpApi<AbstractHttpUrl>>
    {
        return this._httpApiMap;
    }

    /**
     * 设置当前应用的http请求对象Map
     * @public
     */
    public set httpApiMap(value: Map<APPLICATION_PLATFORM, IHttpApi<AbstractHttpUrl>>)
    {
        this._httpApiMap = value;
    }

    /**
     * 获取当前应用的凭证Map
     * @public
     */
    public get credentialMap(): Map<APPLICATION_PLATFORM, IApplicationCredential>
    {
        return this._credentialMap;
    }

    /**
     * 设置当前应用的凭证Map
     * @public
     */
    public set credentialMap(value: Map<APPLICATION_PLATFORM, IApplicationCredential>)
    {
        this._credentialMap = value;
    }

    /**
     * 私有构造函数。
     * @protected
     * @constructor
     */
    protected constructor()
    {
        super("wayto-web");
    }

    /**
     * 创建一个工作台对象。
     * @override
     * @returns IWorkbench
     */
    protected createWorkbench(args: Array<string>): IWorkbench
    {
        return new Workbench(this);
    }

    /**
     * 加载应用配置。
     * @returns {IApplicationSettings} 应用全局配置
     */
    private loadSettings(): IApplicationSettings
    {
        const settings = (<any>window)._applicationSettings;
        if (!settings)
        {
            throw new Exception("无法找到全局_applicationSettings");
        }
        return settings;
    }
}
