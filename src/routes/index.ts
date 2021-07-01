import { RouteConfig } from "vue-router";

const dashboard = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/dashboard")), "dashboard"); // iview dashboard后台管理系统布局组合组件

const applicationMenu: Array<RouteConfig> =
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
            label: "欢迎菜单",
            icon: "iconfont iconicon_board"
        }
    }
];

export
{
    applicationMenu
};
