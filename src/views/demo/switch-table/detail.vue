<template>
    <div class="manage-detail">
        {{detail}}
    </div>
</template>

<script lang="ts">
import { component, View, watch, config } from "uxmid-vue-web";

@component
export default class ManageDetailView extends View
{
    @config({required: true, default: () => ({})})
    protected detail: any;
}
</script>

<style lang="less" scoped>
@import "~styles/application/manage-detail";
</style>