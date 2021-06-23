import { IWorkbench } from "uxmid-core";
import components, { View, Message } from "uxmid-web";
import Vue, { CreateElement } from "vue";

import ApplicationContext from "./context";

/**
 * 工作空间实现类
 * @class
 */
export default class Workspace extends View
{
    private _workbench: IWorkbench;

    /**
     * 获取工作空间所属的工作台实例。
     * @property
     * @returns {IWorkbench} 工作台实例
     */
    public get workbench(): IWorkbench
    {
        return this._workbench;
    }

    /**
     * 获取全局消息框实例。
     * @property
     * @returns Message
     */
    public get message(): Message
    {
        return this.$message;
    }

    /**
     * 初始化工作空间的新实例。
     * @constructor
     * @param  {IWorkbench} workbench 工作台实例。
     * @param  {Router} context 上下文实例。
     */
    public constructor(workbench: IWorkbench, context: ApplicationContext)
    {
        Vue.config.productionTip = false;
        Vue.config.errorHandler = (err, vm, info) =>
        {
            console.error(err, vm, info);
        };
        Vue.config.warnHandler = (msg, vm, trace) =>
        {
            // `trace` 是组件的继承关系追踪
            console.error(msg, vm, trace);
        };

        let options =
        {
            el: "#workspace",
            router: ApplicationContext.current.router,
            // store: ApplicationContext.current.store,
            render(h: CreateElement)
            {
                return h("div",{ attrs: { id: "workspace" } }, [ h("router-view") ]);
            }
        };

        super(options);
        this._workbench = workbench;
    }
}
