import { RouteConfig } from "vue-router";

const dict = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/system/dict")), "system");
const organization = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/system/organization")), "system");

const children: Array<RouteConfig> =
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
];

export default children;
