export default interface IApplicationMenu
{
    /**
     * 路由名称
     * @member
     * @returns {string}
     */
    name: string;

    /**
     * 菜单名称
     * @member
     * @returns {string}
     */
    label: string;

    /**
     * 菜单图标样式
     * @member
     * @returns {string}
     */
    icon: string;
}
