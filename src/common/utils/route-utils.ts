import { Route, RouteConfig } from "vue-router";
import { IApplicationMenu } from "src/models";

export default
{
    resolveMenu,
    resolveActiveMenuIndex,
    resolveActiveMenuTabIndex
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
                hideTab: item.meta.hideTab,
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

/**
 * 获取当前路由下的一级菜单索引
 * @param currentRoute 当前路由
 * @param menus 当前系统一级菜单列表
 * @returns {number} 一级菜单索引
 */
export function resolveActiveMenuIndex(currentRoute: Route, menus: Array<IApplicationMenu>): number
{
    let result = 0;

    for (let i = 0; i < menus.length; i++)
    {
        if (currentRoute.matched[0].path === menus[i].route.path)
        {
            result = i;
            break;
        }
    }

    return result;
}

/**
 * 获取当前路由下的二级菜单索引
 * @param currentRoute 当前路由
 * @param tabs 当前系统二级菜单列表
 */
export function resolveActiveMenuTabIndex(currentRoute: Route, tabs: Array<IApplicationMenu>): number
{
    let result = 0;

    for (let i = 0; i < tabs.length; i++)
    {
        if (currentRoute.name === tabs[i].route.name)
        {
            result = i;
            break;
        }
    }

    return result;
}
