import { RouteConfig } from "vue-router";

/**
 * 表示系统的一个一级或菜单。
 * @interface
 */
export default interface IApplicationMenu
{
    /**
     * 菜单名称
     * @member
     */
    label: string;

    /**
     * 菜单图标
     * @member
     */
    icon?: string;

    /**
     * 路由信息
     * @member
     */
    route: RouteConfig;

    /**
     * 是否隐藏tab菜单
     * @member
     */
    hideTab?: boolean;

    /**
     * 子菜单
     * @member
     */
    children?: Array<IApplicationMenu>;
}
