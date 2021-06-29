<template>
    <i-layout class="layout">
        <div class="layout-context">
            <div class="layout-menu">
                <u-sidebar class="layout-sidebar"></u-sidebar>
            </div>
            <div class="layout-context-warp">
                <u-header
                    @on-logout="onLogout"
                    @on-update-logs="onUpdateLogs"
                    @on-update-profile="onUpdateProfile"
                    @on-update-password="onUpdatePassword"
                ></u-header>
                <slot>
                    <router-view></router-view>
                </slot>
            </div>
        </div>

        <!-- <pwd-update-modal ref="pwdUpdateModal"></pwd-update-modal> -->
    </i-layout>
</template>

<script lang="ts">
import { component, Component } from "uxmid-dashboard-web";
import { Broadcast, BroadcastManager, Application, Map } from "uxmid-core";
import Header from "components/layout/header";
import Sidebar from "components/layout/sidebar";
// import updateUserPassword from "src/components/business/user-password-modal/user-password-modal.vue";
// import PwdUpdateModal from "src/components/temp/pwd-update-modal";
import ApplicationContext from "application/context";
import { BroadcastChannels } from "src/broadcasts";

/**
 * 表示一个包含头部的布局母版。
 * @class
 * @version 1.0.0
 */
@component({
    components:
    {
        "u-header": Header,
        "u-sidebar": Sidebar
        // PwdUpdateModal
    }
})
export default class MainLayout extends Component
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
     * 获取或设置一个布尔值，表示是否需要进行资料维护。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdateProfile: boolean = false;

    /**
     * 获取或设置一个布尔值，表示是否需要进行资料维护。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdateLogs: boolean = false;

    /**
     * 获取或设置一个布尔值，表示是否需要进行密码修改。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdatePassword: boolean = false;

    /**
     * 当用户点击退出登录时调用。
     * @protected
     * @returns void
     */
    protected onLogout(): void
    {
        const broadcastMsg = new Broadcast(BroadcastChannels.LOGOUT);
        BroadcastManager.instance.send(broadcastMsg);
    }

    /**
     * 当用户点击修改资料时调用。
     * @protected
     * @returns void
     */
    protected onUpdateProfile(): void
    {
        this.isUpdateProfile = true;
    }

    /**
     * 当用户点击修改密码时调用。
     * @protected
     * @returns void
     */
    protected onUpdatePassword(): void
    {
        this.isUpdatePassword = true;
        // this._pwdUpdateModal.open();
    }

    /**
     * 当用户点击我的动态时调用。
     * @protected
     * @returns void
     */
    protected onUpdateLogs(): void
    {
        this.isUpdateLogs = true;
    }

    // private get _pwdUpdateModal(): PwdUpdateModal
    // {
    //     return this.$refs["pwdUpdateModal"] as PwdUpdateModal;
    // }
}
</script>

<style lang="less" scoped>
    // @import "~styles/index.less";
.layout
{
    &,
    &-context
    {
        height: 100%;
        overflow: hidden;
    }

    &-context
    {
        display: flex;


        &.dark
        {
            
            .layout-header
            {
                background-color: #090D1B;
                border-bottom-color: #090D1B;
                color: @white-color;
            }

            .layout-menu .trigger,
            // @{deep}.layout-header-user .username,
            .layout-header-user .username,
            .layout-header-textlogo
            {
                color: @white-color;
            }
        }
    }

    .layout-context-warp
    {
        flex: auto;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    &-generic
    {
        overflow: hidden;
        position: relative;
    }

    &-generic-content
    {   
        position: relative;
        flex: auto;
        display: flex;
        flex-direction: column;
        // overflow-y: auto;
        background:#ffffff; // ;
    }

    .fade-enter-active,
    .fade-leave-active 
    {
        transition: opacity .3s;
    }

    .fade-enter,
    .fade-leave-active 
    {
        opacity: 0;
    }
    
    > .iconfont
    {
        &:hover
        {
            color: #4D76FF;
        }
        cursor: pointer;
        font-size: 26px;
    }
}
</style>
