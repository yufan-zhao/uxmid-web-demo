<template>
    <div class="iview-dashboard-layout">
        <i-layout>
            <i-sider breakpoint="md" collapsible :collapsed-width="78" :width="192" v-model="isCollapsed">
                <i-menu :active-name="currentMenuLabel" theme="dark" width="auto" class="menu-instance" :class="menuitemClasses" @on-select="onMenuSelect">
                    <div class="sub-title">
                        <img class="logo-img" src="src/assets/application/logo.png" alt="logo">
                        <span class="label">{{subTitle}}</span>
                    </div>
                    <i-menu-item
                        class="menu-instance-item"
                        v-for="(item, i) in menuList"
                        :key="i"
                        :name="item.label"
                    >
                        <i class="iconfont" :class="[item.icon]"></i>
                        <span>{{item.label}}</span>
                    </i-menu-item>
                </i-menu>
                
                <div slot="trigger"></div>
            </i-sider>

            <i-layout>
                <i-header class="layout-header-bar">
                    <div class="header-bar-content">
                        <div class="left">
                            <div class="switch-btn" :class="{collapsed: isCollapsed}">
                                <svg
                                    t="1625109564103"
                                    class="icon-svg"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1817"
                                    width="200"
                                    height="200"
                                    @click="isCollapsed = !isCollapsed"
                                >
                                    <path fill="#333" d="M64.863 89.086v84.283h898.993V89.086H64.863z m322.252 338.777h576.741v-84.278H387.115v84.278z m0 252.844h576.741v-84.283H387.115v84.283zM64.863 935.202h898.993v-84.283H64.863v84.283z m241.871-592.225L64.429 512.12l242.305 169.143V342.977z" p-id="1818"></path>
                                </svg>
                            </div>
                            <span class="split-line"></span>
                            <span class="header-title">{{headerTitle}}</span>
                        </div>
                        <div class="right">
                            <span class="avatar"></span>
                        </div>
                    </div>
                </i-header>
                <i-content class="main-content" :class="{'hide-tab': hideTab}">
                    <div class="tab-layout">
                        <ul class="tab-list">
                            <li 
                                class="tab-item"
                                v-for="(item, i) in tabList"
                                :key="i"
                                :class="{active: i === currentTab}"
                                @click="onTabClick(item, i)"
                            >{{item.label}}</li>
                        </ul>
                    </div>
                    <div class="content-layout">
                        <slot></slot>
                    </div>
                </i-content>
            </i-layout>
        </i-layout>
    </div>
</template>

<script lang="ts">
import { vueComponent, Component, config, watch } from "uxmid-vue-web";
import { ApplicationContext } from "src/application";
import { IApplicationMenu } from "src/models";
import { RouteUtils } from "src/common/utils";

@vueComponent
export default class IViewLayout extends Component
{
    /**
     * 传入的一级菜单列表
     * @config
     */
    @config({required: false, type: Array, default: () => []})
    protected menus: Array<IApplicationMenu>;

    /**
     * 传入的二级菜单列表
     * @config
     */
    @config({required: false, type: Array, default: () => []})
    protected tabs: Array<IApplicationMenu>;

    /**
     * 是否隐藏一级菜单下的tab菜单
     * @config
     */
    @config({required: false, type: Boolean, default: false})
    protected hideTab: boolean;

    /**
     * 是否收缩菜单
     * @property
     */
    protected isCollapsed: boolean = false;

    /**
     * 当前的menu索引
     * @property
     */
    protected currentMenu: number = -1;

    /**
     * 当前menu的名字
     * @property
     */
    protected currentMenuLabel: string = "";

    /**
     * 当前的tab索引
     * @property
     */
    protected currentTab: number = -1;

    /**
     * menu列表
     * @property
     */
    protected menuList: Array<IApplicationMenu> = [];

    /**
     * tab列表
     * @property
     */
    protected tabList: Array<IApplicationMenu> = [];

    /**
     * 菜单动态class
     * @property
     * @get
     */
    protected get menuitemClasses(): Array<string>
    {
        const classList: Array<string> =
        [
            "menu-item",
            this.isCollapsed ? "collapsed-menu" : ""
        ];
        return classList;
    }
    
    /**
     * 应用程序上下文。
     * @property
     * @get
     */
    protected get applicationContext(): ApplicationContext
    {
        return ApplicationContext.current;
    }

    /**
     * web应用全称
     * @property
     * @get
     */
    protected get headerTitle(): string
    {
        return this.applicationContext.settings.fullName || "请在config.js中配置fullName";
    }

    /**
     * 项目简称
     * @property
     * @get
     */
    protected get subTitle(): string
    {
        return this.applicationContext.settings.abbreviation || "请在config.js中配置abbreviation";
    }

    /**
     * menus监听
     * @watch
     */
    @watch("menus", {immediate: true})
    protected menusWatcher(val: Array<IApplicationMenu>)
    {
        if (val.length === 0)
        {
            this.menuList = [];
            return;
        }
        const currentRoute = this.applicationContext.router.currentRoute;
        const index = RouteUtils.resolveActiveMenuIndex(currentRoute, val);

        this.onMenuClick(val[index], index);
        this.menuList = val;
    }

    /**
     * tabs监听
     * @watch
     */
    @watch("tabs", {immediate: true})
    protected tabsWatcher(val: Array<IApplicationMenu>)
    {
        if (val.length === 0)
        {
            this.tabList = [];
            return;
        }

        const currentRoute = this.applicationContext.router.currentRoute;
        const index = RouteUtils.resolveActiveMenuTabIndex(currentRoute, val);

        this.onTabClick(val[index], index);
        this.tabList = val;
    }

    /**
     * 菜单选择事件
     * @member
     */
    protected onMenuSelect(label: string)
    {
        // 根据菜单label找到指定的IApplicationMenu菜单
        let i = -1;
        const target = this.menuList.find((item, index) =>
        {
            if (item.label === label)
            {
                i = index;
                return true;
            }
            else
            {
                return false;
            }
        });
        if (i === this.currentMenu)
        {
            return;
        }
        this.onMenuClick(target, i);
    }

    /**
     * 菜单点击事件
     * @member
     */
    protected onMenuClick(item: IApplicationMenu, index: number)
    {
        this.currentMenu = index;
        this.currentMenuLabel = item.label;
        this.$emit("on-menu-change", item, index);
    }

    /**
     * 二级菜单tab点击事件
     * @member
     */
    protected onTabClick(item: IApplicationMenu, index: number)
    {
        this.currentTab = index;
        this.$emit("on-tab-change", item, index);
    }
}
</script>

<style lang="less" scoped>
@import "./header.less";
@import "./menu.less";
@import "./tab-layout.less";

.iview-dashboard-layout
{
    height: 100%;
    overflow-y: auto;

    >.ivu-layout
    {
        height: 100%;
    }

    .main-content
    {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .content-layout
        {
            width: 100%;
            height: 100%;
            overflow-y: hidden;
            background-color: #fff;
            border-top: 1px solid #DCE0E7;
        }
    }
    .main-content.hide-tab
    {
        .tab-layout
        {
            display: none;
        }
        .content-layout
        {
            border-top: none;
        }
    }
}
</style>