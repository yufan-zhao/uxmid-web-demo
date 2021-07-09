import { RouteConfig } from "vue-router";
import workbench from "./modules/workbench";
import system from "./modules/system";
import demo from "./modules/demo";

const dashboard = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/dashboard")), "dashboard"); // iview dashboard后台管理系统布局组合组件
const login = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/login/login")), "login");

const routes: Array<RouteConfig> =
[
    {
        path: "/login",
        component: login
    },
    {
        name: "demo",
        path: "/demo",
        component: dashboard,
        meta:
        {
            label: "示例代码",
            icon: ""
        },
        children: [...demo]
    },
    {
        name: "workbench",
        path: "/workbench",
        component: dashboard,
        meta:
        {
            label: "工作台",
            icon: "",
            hideTab: true
        },
        children: [...workbench]
    },
    {
        name: "system",
        path: "/system",
        component: dashboard,
        meta:
        {
            label: "系统设置",
            icon: ""
        },
        children: [...system]
    }
];

export
{
    routes
};
