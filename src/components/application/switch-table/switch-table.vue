<template>
    <div class="table-display-view">

        <div class="display-header">
            <!-- 切换表格风格  BEGIN -->
            <u-table-style-switch v-model="isRowStyle"></u-table-style-switch>
            <!-- 切换表格风格 END -->

            <!-- 页码信息 BEGIN -->
            <span class="display-page">共{{paginTotal}}条数据，<span class="font-main">{{paginCurrentPage}}</span>/{{paginPages}}</span>
            <!-- 页码信息 END -->
        </div>
        
        <div class="display-data-box" :class="{columun: !isRowStyle}">
            <!-- 数据表格部分 BEGIN -->
            <div class="display-table-box" :style="{'border-top': isRowStyle ? 'none' : '1px solid #E9EBEC;'}">
                <slot name="table">
                    <u-table
                        class="display-table"
                        @click.native.stop
                        stripe
                        :highlightRow="true"
                        :disabledHover="false"
                        :style="{'left': isRowStyle ? '30px' :0,'right': isRowStyle ? '30px' :0}"
                        :columns="columns"
                        :records="records"
                        :loading="paginIsLoading"
                        :page-size="paginSize"
                        :page-index="paginCurrentPage"
                        :page-count="paginPages"
                        :all-loaded="allLoaded"
                        :record-count="paginTotal"
                        @on-page-change="onPageChange"
                        @on-row-click="onRowClick"
                        :showCount="showCount">
                    </u-table>
                </slot>
            </div>
            <!-- 数据表格部分 END -->

            <!-- 右侧部分 BEGIN -->
            <div class="display-detail">
                <slot name="detail">
                    我是右侧详情页吧。
                </slot>
            </div>
            <!-- 右侧部分 END -->
        </div>
    </div>
</template>

<script lang="ts">
import { component, View, config, mixins } from "uxmid-vue-web";
import { Pagin } from "src/common/mixins";
import { IPaginFilterModel } from "src/models";

@component
export default class SwitchTable extends mixins(Pagin)
{
    /**
     * 表格行显示
     * @protected
     */
    @config({required: true, type: [Function, Array]})
    protected rowColumuns: [Function, Array<any>];

    /**
     * 表格列显示
     * @protected
     */
    @config({required: true, type: [Function, Array]})
    protected colColumuns: [Function, Array<any>];

    /**
     * 表格数据加载方法，来自service
     * @protected
     */
    @config({type: Function, default: () => ({})})
    protected loadFunc: <T>(searchFilters: IPaginFilterModel) => T;

    /**
     * 表格加载状态
     * @protected
     */
    protected isRowStyle: boolean = false;

    /**
     * 是否显示总数
     * @member
     * @protected
     * @returns boolean
     */
    protected showCount: boolean = false;

    /**
     * 表格数据
     * @property
     */
    protected data: Array<any> = [];

    /**
     * 分页查询筛选条件
     * @property
     */
    protected searchFilters: IPaginFilterModel = {};

    /**
     * 当前渲染的column配置
     * @get
     */
    protected get columns()
    {
        return this.isRowStyle ? this.rowColumuns : this.colColumuns;
    }

    /**
     * 表格传入数据
     * @get
     */
    protected get records(): Array<any>
    {
        return this.data;
    }

    /**
     * 是否全部加载完毕
     * @get
     */
    protected allLoaded(): boolean
    {
        return this.paginCurrentPage === this.paginPages;
    }

    /**
     * 获取用户列表
     * @protected
     * @override
     * @returns Promise<void>
     */
    protected onRowClick(row, index): void
    {
        this.isRowStyle && (this.isRowStyle = false);
        
        this.$emit("on-row-click", row, index);
    }

    /**
     * 页码变化事件
     * @member
     * @param pageIndex 
     */
    protected async onPageChange(pageIndex: number)
    {
        this.paginCurrentPage = pageIndex;
        const appendData = await this.paginLoadRecords(this.loadFunc, this.searchFilters);
        this.data.push(...appendData);
    }

    /**
     * vue钩子
     * @created
     */
    protected async created()
    {
        this.paginCurrentPage += 1;
        this.data = await this.paginLoadRecords(this.loadFunc, this.searchFilters);
    }
}
</script>

<style lang="less">
@import "./switch-table";
@import "./col.less";
@import "./row.less";
</style>
