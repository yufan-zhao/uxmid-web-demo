<template>
    <i-header class="layout-header">
        <h1 class="layout-header-textlogo" @click="toHome">{{applicationContext.settings.fullName}}</h1>
        <aside class="layout-header-side" v-if="currentUser">
            <!-- <span class="back" @click="onGoWorkbench" v-permission="[WEB_BUSINESS_AUTH.WORKBENCH_WATCH]"><i class="iconfont iconicon_shujuzhongxin"></i>工作台</span> -->
            <i-row class="layout-header-user" type="flex" justify="end" align="middle">
                <i-avatar class="user-avatar ml20" :src="imagePath(currentUser.filePath) || require('assets/application/default-user.jpg')">{{currentUser.realname}}</i-avatar>
                <i-dropdown trigger="click" placement="bottom-end" @on-click="onDropdownClick">
                    <a class="username" href="javascript:void(0)">
                        <span>欢迎您，{{currentUser.orgInfo && `${currentUser.orgInfo.name} > `}} {{ currentUser.realname || currentUser.username }} </span>
                        <i class="iconfont iconicon_right"></i>
                    </a>
                    <i-dropdown-menu class="user-options-dropdown" slot="list">
                        <i-dropdown-item name="update-password">修改密码</i-dropdown-item>
                        <i-dropdown-item name="logout">安全退出</i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </i-row>
        </aside>
    </i-header>
</template>

<script lang="ts">
import { Application } from "uxmid-core";
import { component, View, config, Component, watch } from "uxmid-dashboard-web";
import CommonView from "src/views/common-view";
import { ApplicationContext } from "src/application";
import { IApplicationCredential } from "src/models";
// import { imagePath } from "utils/extends";
// const isDebug = process.env.NODE_ENV === "development";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Header extends CommonView
{
    /**
     * 获取当前应用的上下文实例。
     * @protected
     * @property
     * @returns ApplicationContext
     */
    protected get applicationContext(): ApplicationContext
    {
        return Application.context as ApplicationContext;
    }

    /**
     * 获取当前上下文中的登录用户信息
     * @protected
     * @property
     */
    protected get currentUser(): any
    {
        const currentUser = (<IApplicationCredential>this.applicationContext.credential);
        return currentUser;
    }

    /**
     * 获取当前上下文中的系统设置中的系统描述
     * @protected
     * @property
     * @returns {IApplicationDescribe}
     */
    // protected get appDescribe(): IApplicationDescribe
    // {
    //     return this.applicationContext.settings.describe;
    // }

    /**
     * 当点击用户下拉选项时调用。
     * @protected
     * @param  {string} name 选项名称。
     * @returns void
     */
    protected onDropdownClick(name: string): void
    {
        const eventName = `on-${name}`;
        this.$emit(eventName);
    }

    /**
     * 返回Saas首页。
     * @protected
     * @returns {void}
     */
    protected toHome(): void
    {
        this.$router.push("/home");
    }

    /**
     * 跳转工作台按钮
     * @protected
     */
    // protected onGoWorkbench()
    // {
    //     this.jumpToWorkbench();
    // }
}
</script>

<style lang="less" scoped>
    @import "./header";
    .drop-arrow
    {
        width: 10px;
    }

    .back
    {
        margin-right: 30px;
        cursor: pointer;

        i
        {
            font-size: 16px;
            margin-right: 5px;
            position: relative;
            top: 1px;
            font-weight: bold;
        }
    }
</style>
