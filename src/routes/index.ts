import { RouteConfig } from "vue-router";

const admin = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/admin")), "admin"); // tab布局

const applicationMenu: Array<RouteConfig> =
[
    {
        name: "home",
        path: "/home",
        component: admin,
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
