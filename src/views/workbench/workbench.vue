<template>
    <div class="workbench-view">
        <h1>Workbench</h1>
        <i-button type="primary">Test</i-button>
        <div style="padding: 10px;">
            <i-upload
                :action="''"
                :before-upload="beforeUpload"
            >
                <i-button type="info">Upload</i-button>
            </i-upload>
        </div>
        <div style="padding: 10px;">
            <u-upload-image
                v-model="images"
            >
            </u-upload-image>
        </div>
    </div>
</template>

<script lang="ts">
import { vueComponent, View, watch } from "uxmid-vue-web";
import { UploadService } from "src/services";
import { service } from "src/common/decorator";

@vueComponent
export default class WorkbenchView extends View
{
    @service("UploadService")
    private uploadService: UploadService;

    protected images: Array<any> = [];

    protected beforeUpload(file: File)
    {
        console.log(file);
        this.uploadService.blobUpload([file]).then(res =>
        {
            console.log(res);
        });
        return false;
    }
}
</script>

<style lang="less" scoped>
.workbench-view
{
    width: 100%;
    height: 100%;
}
</style>