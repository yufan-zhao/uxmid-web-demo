<template>
    <l-iview-layout
        :menus="menus"
        :tabs="tabs"
        @on-menu-change="onMenuChange"
        @on-tab-change="onTabChange"
    >
        <h1>测试核心插槽</h1>
    </l-iview-layout>
</template>

<script lang="ts">
import { component, View, watch } from "uxmid-vue-web";
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
    protected menus: Array<IApplicationMenu> =
    [
        {
            label: "首页",
            icon: "",
            route: null
        },
        {
            label: "测试",
            icon: "",
            route: null
        }
    ];

    /**
     * 二级菜单列表
     * @property
     */
    protected tabs: Array<IApplicationMenu> =
    [
        {
            label: "标签1",
            route: null
        },
        {
            label: "标签2",
            route: null
        }
    ];

    /**
     * 菜单change事件
     * @member
     */
    protected onMenuChange(item: IApplicationMenu, index: number)
    {
        console.log("Menu Change: ", item);
        // TODO 获取子路由填充至二级菜单中
    }

    /**
     * 标签页change事件
     * @member
     */
    protected onTabChange(item: IApplicationMenu, index: number)
    {
        console.log("Tab Change: ", item);
        // TODO 跳转路由
    }
}
</script>

<style lang="less" scoped>

</style>