<template>
    <div class="manage-view">
        <u-pagin-table
            :columns="columns"
            :loadFunc="loadFunc"
        ></u-pagin-table>
    </div>
</template>

<script lang="ts">
import { component, View, watch } from "uxmid-vue-web";
import { IHttpResponse, IPaginFilterModel } from "src/models";

@component
export default class ManageView extends View
{
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

    /**
     * 模拟接口返回
     */
    protected async loadFunc(filters: IPaginFilterModel): Promise<IHttpResponse>
    {
        // console.log(filters);

        let result: IHttpResponse = null;

        if (filters.params.current === 1)
        {
            result =
            {
                code: 200,
                content:
                {
                    records:
                    [
                        {name: "jason1", age: 22, gender: "男"},
                        {name: "jason2", age: 23, gender: "男"},
                        {name: "jason3", age: 24, gender: "男"},
                        {name: "jason4", age: 25, gender: "男"},
                        {name: "jason5", age: 26, gender: "男"},
                        {name: "jason6", age: 27, gender: "男"},
                        {name: "jason7", age: 28, gender: "男"},
                        {name: "jason8", age: 29, gender: "男"},
                        {name: "jason9", age: 30, gender: "男"},
                        {name: "jason0", age: 31, gender: "男"}
                    ]
                },
                extras:
                {
                    pages: 2,
                    total: 13,
                    current: 1
                }
            };
        }
        else if (filters.params.current === 2)
        {
            result =
            {
                code: 200,
                content:
                {
                    records:
                    [
                        {name: "jack1", age: 22, gender: "男"},
                        {name: "jack2", age: 23, gender: "男"},
                        {name: "jack3", age: 24, gender: "男"}
                    ]
                },
                extras:
                {
                    pages: 2,
                    total: 13,
                    current: 2
                }
            };
        }

        return result;
    }
}
</script>

<style lang="less" scoped>
.manage-view
{
    padding: 30px;
}
</style>