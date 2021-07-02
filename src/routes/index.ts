import { RouteConfig } from "vue-router";

const dashboard = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/dashboard")), "dashboard"); // iview dashboard后台管理系统布局组合组件
const home = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/home/home")), "home");
const dict = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/system/dict")), "dict");

const routes: Array<RouteConfig> =
[
    {
        path: "/",
        redirect: "/home"
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
            }
        ]
    }
];

export
{
    routes
};
