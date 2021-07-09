import { RouteConfig } from "vue-router";

const workbench = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/workbench/workbench")), "workbench");

const children: Array<RouteConfig> =
[
    {
        name: "workbench-index",
        path: "/workbench/index",
        component: workbench,
        meta: {label: "工作台"}
    }
];

export default children;
