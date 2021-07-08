import { RouteConfig } from "vue-router";

const dashboard = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/dashboard")), "dashboard"); // iview dashboard后台管理系统布局组合组件

const login = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/login/login")), "login");
const switchTable = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/demo/switch-table/manage")), "demo");
const paginTable = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/demo/pagin-table/manage")), "demo");
const home = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/home/home")), "home");
const dict = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/system/dict")), "system");
const organization = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/system/organization")), "system");

const routes: Array<RouteConfig> =
[
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        component: login
    },
    {
        name: "home",
        path: "/home",
        component: dashboard,
        meta:
        {
            label: "首页",
            icon: ""
        },
        children:
        [
            {
                name: "home-index",
                path: "/home/index",
                component: home,
                meta:
                {
                    label: "首页"
                }
            }
        ]
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
        children:
        [
            {
                name: "demo-switch-table",
                path: "/demo/switch-table",
                component: switchTable,
                meta:
                {
                    label: "SwitchTable"
                }
            },
            {
                name: "demo-pagin-table",
                path: "/demo/pagin-table",
                component: paginTable,
                meta:
                {
                    label: "PaginTable"
                }
            }
        ]
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
        children:
        [
            {
                name: "system-dict",
                path: "/system/dict",
                component: dict,
                meta:
                {
                    label: "数据字典"
                }
            },
            {
                name: "system-organization",
                path: "/system/organization",
                component: organization,
                meta:
                {
                    label: "组织管理"
                }
            }
        ]
    }
];

export
{
    routes
};
