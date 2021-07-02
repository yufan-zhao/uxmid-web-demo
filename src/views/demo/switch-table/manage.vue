<template>
    <div class="manage-view">
        <u-page-content :class="{open: isOpenOperation}" :isOpenOperation="isOpenOperation">
            <i-form slot="search-left" ref="searchBox" @submit.native.prevent>
                <i-form-item label="关键字：">
                    <i-input placeholder="项目名称/编号/施工单位/姓名/手机"></i-input>
                </i-form-item>

                <i-form-item>
                    <i-button type="primary" @click="onSearch">查询</i-button>
                    <i-button type="info" @click="onReset">重置</i-button>
                    <i-button type="info" @click="isOpenOperation = !isOpenOperation">{{isOpenOperation ? "收起" : "高级搜索"}}</i-button>
                </i-form-item>
            </i-form>

            <template slot="operation-btn">
                <i-button type="primary" @click="onOperations('insert')">新增</i-button>
            </template>

            <!-- 高级搜索列 BEGIN-->
            <i-form slot="senior">
                <i-row class="row-inputs" type="flex" justify="start">
                    <i-form-item class="input-item" label="客户名称：">
                        <i-input placeholder="项目名称/编号/施工单位/姓名/手机"></i-input>
                    </i-form-item>
                </i-row>
            </i-form>
            <!-- 高级搜索列 END-->

            <template slot="page-table">
                <u-switch-table 
                    ref="switchTable" 
                    :row-columuns="rowColumuns" 
                    :col-columuns="colColumuns"
                    :load-func="loadFunc"
                    @on-row-click="onRowClick"
                    @no-data="detail = {}"
                >
                    <template slot="detail">
                        <u-detail ref="detail" :detail="detail" @operations="onOperations"></u-detail>
                    </template>
                </u-switch-table>
            </template>
        </u-page-content>
    </div>
</template>

<script lang="ts">
import { component, View, watch } from "uxmid-vue-web";
import { IHttpResponse } from "src/models";
import ManageDetail from "./detail.vue";

@component({
    components:
    {
        "u-detail": ManageDetail
    }
})
export default class ManageView extends View
{
    /**
     * 是否展开高级搜索
     * @protected
     * @property
     */
    protected isOpenOperation: boolean = false;

    /**
     * 当前项详情
     * @protected
     * @property
     */
    protected detail: any = {};

    /**
     * 表格列表模式行渲染
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected get rowColumuns(): Array<any>
    {
        // 列表模式行渲染
        return [];
    }

    /**
     * 表格详情模式行渲染
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected get colColumuns(): Array<any>
    {
        // 详情模式行渲染
        return [];
    }

    /**
     * 触发查询列表
     * @member
     * @protected
     * @returns {void}
     */
    protected onSearch(): void
    {
        //
    }

    /**
     * 触发重置查询方法
     * @member
     * @protected
     * @returns {void}
     */
    protected onReset(): void
    {
        //
    }

    /**
     * 列表操作
     * @protected
     * @member
     */
    protected async onOperations(type: string, data?: any)
    {
        //
    }

    protected async loadFunc(filter: any): Promise<any>
    {
        const result: IHttpResponse =
        {
            code: 200,
            content:
            {
                records: []
            },
            extras:
            {
                current: 1,
                total: 0,
                pages: 0
            }
        };
        return result;
    }

    /**
     * 触发列表选中操作
     * @member
     * @protected
     * @returns {void}
     */
    protected async onRowClick(row: any, index?: number): Promise<void>
    {
        // this.detail = await this.assessService.detail(row.id);
        this.detail = row;
    }
}
</script>

<style lang="less" scoped>
.manage-view
{
    height: 100%;
}
</style>