import { RouteConfig } from "vue-router";
import workbench from "./modules/workbench";
import system from "./modules/system";
import demo from "./modules/demo";

const dashboard = () => import("src/views/dashboard.vue"); // iview dashboard后台管理系统布局组合组件
const login = () => import("src/views/login/login.vue");

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
            icon: "iconicon_shouye"
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
            icon: "iconicon_board",
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
            icon: "iconicon_xitongguanli"
        },
        children: [...system]
    }
];

export
{
    routes
};
