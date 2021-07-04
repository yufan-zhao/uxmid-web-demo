<template>
    <div class="u-nodata">
        <img :src="src" :alt="label" />
        <p>{{label}}</p>
    </div>
</template>
<script lang="ts">
import { View, component, config } from "uxmid-web";

@component
export default class Nodata extends View
{
    @config({required: false, type: String, default: "暂无数据"})
    protected label: string;
    /**
     * 图片
     */
    protected src = require("assets/application/none-data.png");
}
</script>
<style lang="less">
@import "./nodata.less";
</style>
