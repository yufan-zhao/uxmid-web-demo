<template>
    <div class="u-nodata">
        <img src="src/assets/application/none-data.png" :alt="label" />
        <p>{{label}}</p>
    </div>
</template>
<script lang="ts">
import { View, vueComponent, config } from "uxmid-iview-web";

@vueComponent
export default class Nodata extends View
{
    @config({required: false, type: String, default: "暂无数据"})
    protected label: string;
    /**
     * 图片
     */
    // protected src = require("src/assets/application/none-data.png");
}
</script>
<style lang="less">
@import "./nodata.less";
</style>
