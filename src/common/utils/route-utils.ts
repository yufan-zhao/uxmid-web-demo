import { RouteConfig } from "vue-router";
import { IApplicationMenu } from "src/models";

export default
{
    resolveMenu
};

/**
 * 由路由表处理为包含二级tab菜单的一级菜单
 * @param routes 当前系统的路由表
 * @returns {Array<IApplicationMenu>} 包含二级tab菜单的一级菜单列表
 */
export function resolveMenu(routes: Array<RouteConfig>): Array<IApplicationMenu>
{
    const result: Array<IApplicationMenu> = [];
    routes.forEach(item =>
    {
        if (Array.isArray(item.children))
        {
            result.push({
                label: item.meta.label,
                icon: item.meta.icon,
                route: item,
                children: item.children.map(jtem =>
                {
                    return {
                        label: jtem.meta.label,
                        route: jtem
                    };
                })
            });
        }
    });
    return result;
}
