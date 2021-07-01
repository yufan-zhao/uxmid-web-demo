import { WorkbenchBase, ApplicationContextBase, Logger, ConsoleLogHandler, IServiceProvider, ServiceProviderFactory, Map } from "uxmid-core";

import { IHttpApi, AbstractHttpUrl, IApplicationCredential } from "src/models";
import { APPLICATION_PLATFORM } from "src/enums";
import ApplicationContext from "./context";
import Workspace from "./workspace";
import { MainApi, MainUrls } from "src/apis";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase
{
    private _workspace: Workspace;

    /**
     * 获取当前应用的单例服务工厂。
     * @property
     * @returns {IServiceProvider} 服务工厂单例实例
     */
    public get serviceProvider(): IServiceProvider
    {
        return ServiceProviderFactory.instance.default;
    }
    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns {Workspace} 工作空间实例
     */
    public get workspace(): Workspace
    {
        return this._workspace;
    }

    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     * @constructor
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
    }

    /**
     * 当工作台打开时调用。
     * @protected
     * @async
     * @param {Array<string>} args
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        let context = this.applicationContext as ApplicationContext;

        // 注册日志处理程序
        Logger.handlers.add(new ConsoleLogHandler());

        // 初始化请求模块
        await this.initializeHttpApis(context);

        // 初始化工作空间
        this._workspace = this.createWorkspace(context);
    }

    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(context: ApplicationContext): Workspace
    {
        return new Workspace(this, context);
    }

    /**
     * 初始化请求模块。
     * @param context ApplicationContext
     */
    private async initializeHttpApis(context: ApplicationContext): Promise<void>
    {
        try
        {
            context.httpApiMap = new Map<APPLICATION_PLATFORM, IHttpApi<AbstractHttpUrl>>();

            // 添加主接口子模块
            let platform: APPLICATION_PLATFORM = APPLICATION_PLATFORM.MAIN,
                apis: MainUrls = new MainUrls(),
                origin: string = context.settings.mainOriginUrl,
                prefix: string = context.settings.mainPrefix;
            context.httpApiMap.set(platform, new MainApi(platform, apis, origin, prefix));
        }
        catch(err)
        {
            Logger.error("workbench", "初始化系统请求模块异常", err);
        }
    }
}
