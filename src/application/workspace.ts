import { IWorkbench } from "uxmid-core";
import components, { View } from "uxmid-iview-web";
import Vue, { CreateElement } from "vue";
import Router from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import AMap from "flagwind-amap";

// import ViewUI from "view-design";
// import "view-design/dist/styles/iview.css";

import ApplicationContext from "./context";
import { routes } from "src/routes";
import globalComponents from "src/components";
import "src/styles/index.less";
import { RouteUtils } from "src/common/utils";
import filters from "src/common/filters";

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

        // 初始化路由
        Workspace.initializeRouter(context);

        // 初始化系统及自定义组件
        Workspace.initializeComponent(context);

        // 初始化Vue过滤器
        Workspace.initializeFilters(context);

        let options =
        {
            el: "#workspace",
            router: context.router,
            // store: ApplicationContext.current.store,
            render(h: CreateElement)
            {
                return h("div",{ attrs: { id: "workspace" } }, [ h("router-view") ]);
            }
        };

        super(options);
        this._workbench = workbench;
    }

    /**
     * 初始化vue路由。
     * @param context {ApplicationContext} context 应用程序上下文实例。
     * @returns {void} void
     */
    public static initializeRouter(context: ApplicationContext): void
    {
        // 注册路由组件
        Vue.use(Router);

        const menus = RouteUtils.resolveMenu(routes);

        routes.push({path: "/", redirect: menus[0].route.path});

        // 初始化路由程序
        let router = new Router({mode: "history", routes: routes});

        context.menus = menus;
        context.router = router;
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns {void} void
     */
    public static initializeComponent(context: ApplicationContext): void
    {
        // Vue.use(ViewUI);
        console.log(components);
        Vue.use(components);
        Vue.use(globalComponents);

        dayjs.locale("zh-cn");
        dayjs.extend(relativeTime);

        // 初始化高德地图配置
        AMap.init
        ({
            key: context.settings.amapSetting.key,
            version: "1.4.14",
            uiVersion: "1.0",
            plugins:
            [
                "Autocomplete",
                "PlaceSearch",
                "Scale",
                "OverView",
                "ToolBar",
                "MapType",
                "CircleEditor",
                "Geocoder",
                "PositionPicker",
                "AMap.MouseTool",
                "AMap.PolyEditor",
                "AMap.MarkerClusterer",
                "Map3D",
                "AMap.Object3DLayer",
                "AMap.DistrictSearch"
            ]
        });

        // 注册高德地图组件
        Vue.use(AMap);
    }

    /**
     * 初始化所有全局 Vue 过滤器。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns {void} void
     */
    public static initializeFilters(context: ApplicationContext): void
    {
        Object.keys(filters).forEach(key =>
        {
            Vue.filter(key, filters[key]);
        });
    }
}
