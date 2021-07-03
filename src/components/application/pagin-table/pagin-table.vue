<template>
    <div class="pagin-table-view">
        <div class="table-container">
            <i-table
                :data="data"
                v-bind="$attrs"
            >
            </i-table>
        </div>
        <slot>
            <div class="page-container">
                <i-page
                    :total="paginTotal"
                    @on-change="onPageChange"
                ></i-page>
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import { component, watch, config, mixins } from "uxmid-vue-web";
import { Pagin } from "src/common/mixins";
import { IPaginFilterModel } from "src/models";

@component
export default class PaginTable extends mixins(Pagin)
{
    /**
     * 数据加载方法
     * @config
     */
    @config({required: true, type: Function})
    protected loadFunc: <T>(searchFilters: IPaginFilterModel) => T;

    /**
     * 表格数据
     * @property
     */
    protected data: Array<any> = [];

    /**
     * 分页查询条件
     * @property
     */
    protected searchFilters: IPaginFilterModel = {};

    /**
     * 页码变化事件
     * @member
     * @param pageIndex 
     */
    protected async onPageChange(pageIndex: number)
    {
        this.paginCurrentPage = pageIndex;
        this.data = await this.paginLoadRecords(this.loadFunc, this.searchFilters);
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

<style lang="less" scoped>
.pagin-table-view
{
    .table-container
    {
        margin-bottom: 20px;
    }
    .page-container
    {
        display: flex;
        justify-content: flex-end;
    }
}
</style>