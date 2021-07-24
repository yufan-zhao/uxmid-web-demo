<template>
    <div class="sub-detail">
        <h3 class="sub-detail-title u-form-content-title">基础信息</h3>
        <div class="sub-content u-form-content">
            <i-form class="u-form" label-position="left">
                <i-row type="flex" justify="start">
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                    <i-col class-name="u-col" span="8">
                        <i-form-item class="u-form-item" :label-width="90" label="评估编号">-</i-form-item>
                    </i-col>
                </i-row>
            </i-form>
        </div>
    </div>
</template>

<script lang="ts">
import { vueComponent, View, watch, config } from "uxmid-iview-web";

@vueComponent
export default class InfoView extends View
{

}
</script>

<style lang="less" scoped>
@import "src/styles/business/sub-detail";
</style>