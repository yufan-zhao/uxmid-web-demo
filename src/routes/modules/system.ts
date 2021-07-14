import { RouteConfig } from "vue-router";

const dict = () => import("/src/views/system/dict.vue");
const organization = () => import("/src/views/system/organization.vue");

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
