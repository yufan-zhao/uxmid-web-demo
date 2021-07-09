<template>
    <l-iview-layout
        :menus="menus"
        :tabs="tabs"
        :hideTab="currentMenu === null ? false : currentMenu.hideTab"
        @on-menu-change="onMenuChange"
        @on-tab-change="onTabChange"
    >
        <router-view></router-view>
    </l-iview-layout>
</template>

<script lang="ts">
import { component, View, watch } from "uxmid-vue-web";

import { ApplicationContext } from "src/application";
import { IApplicationMenu } from "src/models";

/**
 * 后台管理系统iview dashboard基础布局组件
 * @component
 */
@component
export default class DashboardView extends View
{
    /**
     * 一级菜单列表
     * @property
     */
    protected menus: Array<IApplicationMenu> = [];

    /**
     * 二级菜单列表
     * @property
     */
    protected tabs: Array<IApplicationMenu> = [];

    /**
     * 当前菜单
     * @property
     */
    protected currentMenu: IApplicationMenu = null;

    /**
     * 系统上下文
     * @property
     */
    protected get applicationContext(): ApplicationContext
    {
        return ApplicationContext.current;
    }

    /**
     * 菜单change事件
     * @member
     */
    protected onMenuChange(item: IApplicationMenu, index: number)
    {
        this.currentMenu = item;
        console.log("currentMenu", this.currentMenu);
        this.tabs = item.children;
    }

    /**
     * 标签页change事件
     * @member
     */
    protected onTabChange(item: IApplicationMenu, index: number)
    {
        if (this.applicationContext.router.currentRoute.fullPath === item.route.path)
        {
            return;
        }
        this.applicationContext.router.push({name: item.route.name});
    }

    /**
     * vue钩子
     * @created
     */
    protected created()
    {
        this.menus = this.applicationContext.menus;
    }
}
</script>

<style lang="less" scoped>

</style>