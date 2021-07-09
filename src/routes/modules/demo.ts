import { RouteConfig } from "vue-router";

const switchTable = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/demo/switch-table/manage")), "demo");
const paginTable = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/demo/pagin-table/manage")), "demo");

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
