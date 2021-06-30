<template>
    <div class="iview-layout">
        <i-layout>
            <i-sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <i-menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <i-menu-item name="1-1">
                        <i-icon type="ios-navigate"></i-icon>
                        <span>Option 1</span>
                    </i-menu-item>
                    <i-menu-item name="1-2">
                        <i-icon type="ios-search"></i-icon>
                        <span>Option 2</span>
                    </i-menu-item>
                    <i-menu-item name="1-3">
                        <i-icon type="ios-settings"></i-icon>
                        <span>Option 3</span>
                    </i-menu-item>
                </i-menu>
                <div slot="trigger"></div>
            </i-sider>

            <i-layout>
                <i-header class="layout-header-bar"></i-header>
                <i-content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                    <div style="height: 400px;width: 800px;">
                        Content
                    </div>
                </i-content>
            </i-layout>
        </i-layout>
    </div>
</template>

<script lang="ts">
import { component, Component } from "uxmid-vue-web";

@component
export default class IViewLayout extends Component
{
    /**
     * 是否收缩菜单
     * @property
     */
    protected isCollapsed: boolean = false;

    /**
     * 菜单动态class
     * @property
     * @get
     */
    protected get menuitemClasses(): Array<string>
    {
        return [
            "menu-item",
            this.isCollapsed ? "collapsed-menu" : ""
        ];
    }
}
</script>

<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    position: fixed;
    width: 100%;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>