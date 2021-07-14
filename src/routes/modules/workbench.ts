import { RouteConfig } from "vue-router";

const workbench = import.meta.glob("/src/views/workbench/workbench.vue");

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
