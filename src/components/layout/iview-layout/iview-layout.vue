<template>
    <div class="iview-dashboard-layout">
        <i-layout>
            <i-sider breakpoint="md" collapsible :collapsed-width="78" :width="192" v-model="isCollapsed">
                <i-menu active-name="1-2" theme="dark" width="auto" class="menu-instance" :class="menuitemClasses">
                    <div class="sub-title">
                        <span class="label">{{subTitle}}</span>
                    </div>
                    <i-menu-item class="menu-instance-item" name="1-1">
                        <i-icon type="ios-navigate"></i-icon>
                        <span>首页</span>
                    </i-menu-item>
                    <i-menu-item class="menu-instance-item" name="1-2">
                        <i-icon type="ios-search"></i-icon>
                        <span>业务模块</span>
                    </i-menu-item>
                    <i-menu-item class="menu-instance-item" name="1-3">
                        <i-icon type="ios-settings"></i-icon>
                        <span>系统设置</span>
                    </i-menu-item>
                </i-menu>
                
                <div slot="trigger"></div>
            </i-sider>

            <i-layout>
                <i-header class="layout-header-bar">
                    <div class="header-bar-content">
                        <div class="switch-btn">
                            <svg t="1625109564103" class="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1817" width="200" height="200">
                                <path fill="#70737B" d="M64.863 89.086v84.283h898.993V89.086H64.863z m322.252 338.777h576.741v-84.278H387.115v84.278z m0 252.844h576.741v-84.283H387.115v84.283zM64.863 935.202h898.993v-84.283H64.863v84.283z m241.871-592.225L64.429 512.12l242.305 169.143V342.977z" p-id="1818"></path>
                            </svg>
                        </div>
                        <span class="split-line"></span>
                        <span class="header-title">{{headerTitle}}</span>
                    </div>
                </i-header>
                <i-content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                    <div style="height: 400px;width: 800px;">
                        Content
                        <i-button type="primary">测试按钮</i-button>
                    </div>
                </i-content>
            </i-layout>
        </i-layout>
    </div>
</template>

<script lang="ts">
import { component, Component } from "uxmid-vue-web";
import { ApplicationContext } from "src/application";

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
}
</script>

<style lang="less" scoped>
.iview-dashboard-layout
{
    height: 100vh;

    @{deep}>.ivu-layout
    {
        height: 100%;
    }

    // 顶部header部分样式
    .layout-header-bar
    {
        .header-bar-content
        {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;

            .switch-btn
            {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 70px;

                .icon-svg
                {
                    height: 16px;
                    width: 16px;
                    cursor: pointer;
                }
            }
            .split-line
            {
                width: 1px;
                height: 16px;
                background-color: #E0E0E0;
            }
            .header-title
            {
                margin-left: 20px;
                font-size: 16px;
                font-weight: bold;
                color: #182334;
            }
        }
    }

    .menu-instance
    {
        .sub-title
        {
            display: flex;
            align-items: center;
            height: 68px;
            padding-left: 28px;
            background-color: #2D52F2;

            .label
            {
                font-size: 18px;
                font-weight: bold;
                color: #fff;
            }
        }
        .menu-instance-item
        {
            display: flex;
            align-items: center;
            height: 54px;
            padding: 0;
            color: #7E8791;

            i
            {
                margin-left: 31px;
                font-size: 18px;
            }
        }
        .menu-instance-item::before
        {
            content: " ";
            width: 3px;
            height: 100%;
        }
        .menu-instance-item.ivu-menu-item-selected
        {
            color: #fff;

            i
            {
                color: #2D52F2;
            }
        }
        .menu-instance-item.ivu-menu-item-selected::before
        {
            background-color: #2D52F2;
        }
    }
}
</style>