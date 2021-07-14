import { RouteConfig } from "vue-router";

const switchTable = import.meta.glob("/src/views/demo/switch-table/manage.vue");
const paginTable = import.meta.glob("/src/views/demo/pagin-table/manage.vue");

const children: Array<RouteConfig> =
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
];

export default children;
