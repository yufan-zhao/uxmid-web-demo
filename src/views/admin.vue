<template>
    <l-main class="iview-reset">
        <l-generic>
            <u-page-list :active="currentRoute.name" :custom="true" @onTabClick="onTabClick">
                <!--选项卡列表 BEGIN-->
                <template slot="head">
                    <i-tab-pane v-for="(item, i) in tabs" :key="i" :label="item.meta.label" :name="item.name"></i-tab-pane>
                </template>
                <!--选项卡列表 END-->

                <!-- 选项卡内容 BEGIN -->
                <router-view class="content-layout"></router-view>
                <!-- 选项卡内容 END -->
            </u-page-list>
        </l-generic>
    </l-main>
</template>
<script lang="ts">
import { component, View, watch } from "uxmid-web";
import { Broadcast, BroadcastManager, Map } from "uxmid-core";
import { Route, RouteConfig } from "vue-router";
import { ApplicationRepository } from "src/repository";
import { repository } from "src/common/decorator";
import { broadcasts } from "src/common";

@component
export default class AdminTemplate extends View
{
    @repository("ApplicationRepository")
    private applicationRepository: ApplicationRepository;
    /**
     * 动态菜单容器
     * @protected
     * @property
     * @returns {Array<RouteConfig>}
     */
    protected tabs: Array<RouteConfig> = [];

    /**
     * 全局当前路由
     * @protected
     * @property
     * @returns {Route}
     */
    protected get currentRoute(): Route
    {
        return this.applicationContext.currentRoute;
    }

    /**
     * 动态菜单存储监听
     * @watch
     * @protected
     */
    @watch("applicationRepository.secondMenus", {immediate: true})
    protected tabsWatch(val: Array<RouteConfig>): void
    {
        this.tabs = val;
    }

    /**
     * tab切换事件
     * @protected
     * @member
     */
    protected onTabClick(name: string)
    {
        let msg = new Map<string, string>();
        msg.set("currentTabName", name);
        const broadcastMsg = new Broadcast(broadcasts.TAB_CHANGE, msg);
        BroadcastManager.instance.send(broadcastMsg);
    }
}
</script>

<style lang="less" scoped>
.content-layout
{
    height: 100%;
    background-color: #fff;
}
</style>
