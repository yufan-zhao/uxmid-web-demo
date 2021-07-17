import { WorkbenchBase, ApplicationContextBase, Logger, ConsoleLogHandler, IServiceProvider, ServiceProviderFactory, Map, Broadcast, BroadcastManager } from "uxmid-core";

import { IHttpApi, IHttpRequest, IHttpResponse } from "src/models";
import { APPLICATION_PLATFORM, HTTP_RESPONSE_CODE } from "src/enums";
import ApplicationContext from "./context";
import Workspace from "./workspace";
import { BroadcastChannels } from "src/broadcasts";
import { MainApis, AuthApis } from "src/apis";
import HttpClient from "src/common/http/http-client";

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

        // 初始化全局请求处理函数
        await this.initializeHttpClientHandlers(context);

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
            context.httpApiMap = new Map<APPLICATION_PLATFORM, IHttpApi>();

            // 添加主接口子模块
            let platform: APPLICATION_PLATFORM = APPLICATION_PLATFORM.MAIN,
                origin: string = context.settings.mainOriginUrl,
                prefix: string = context.settings.mainPrefix;
            context.httpApiMap.set(platform, new MainApis(platform, origin, prefix));

            // 添加鉴权子模块
            context.httpApiMap.set(
                APPLICATION_PLATFORM.AUTH, 
                new AuthApis(APPLICATION_PLATFORM.AUTH, context.settings.authOriginUrl, context.settings.authPrefix)
            );
        }
        catch(err)
        {
            Logger.error("workbench", "初始化系统请求模块异常", err);
        }
    }

    /**
     * 初始化请求模块全局处理。
     * @param context ApplicationContext
     */
    private async initializeHttpClientHandlers(context: ApplicationContext): Promise<void>
    {
        try
        {
            HttpClient.instance.handlers.add((code: number, content: IHttpResponse, request: IHttpRequest) =>
            {
                switch(code)
                {
                    case HTTP_RESPONSE_CODE.sessionLost:
                    case HTTP_RESPONSE_CODE.invalidCredential:
                    {
                        // token无效，登出
                        const logoutData = new Map<string, any>();
                        const logoutMessage = new Broadcast(BroadcastChannels.LOGOUT, logoutData);
                        BroadcastManager.instance.send(logoutMessage);

                        break;
                    }
                    case HTTP_RESPONSE_CODE.unauthorized:
                    {
                        break;
                    }
                }
            });
        }
        catch(err)
        {
            Logger.error("workbench", "初始化系统请求模块全局处理异常", err);
        }
    }
}
