<template>
    <div class="manage-view">
        <u-pagin-table
            :columns="columns"
            :loadFunc="testPaginTableService.pagin.bind(testPaginTableService)"
        ></u-pagin-table>
    </div>
</template>

<script lang="ts">
import { vueComponent, View, watch } from "uxmid-vue-web";
import { IHttpResponse, IPaginFilterModel } from "src/models";
import { TestPaginTableService } from "src/services";
import { service } from "src/common/decorator";

@vueComponent
export default class ManageView extends View
{
    @service("TestPaginTableService")
    protected testPaginTableService: TestPaginTableService;

    /**
     * 列渲染render模式
     * @property
     */
    protected columns: Array<any> =
    [
        {
            title: "姓名",
            key: "name"
        },
        {
            title: "年龄",
            key: "age"
        },
        {
            title: "性别",
            key: "gender"
        }
    ];
}
</script>

<style lang="less" scoped>
.manage-view
{
    padding: 30px;
}
</style>