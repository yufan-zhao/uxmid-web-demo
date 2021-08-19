<template>
    <div class="component-upload-image">
        <ul class="upload-image-list">
            <li class="upload-image-item" v-for="(item, index) in uploadList" :key="item.id">
                <video style="height: 76px;width: 76px;" v-if="isVideo(item.filePath)" :src="imagePath(item.filePath)"></video>
                <div class="upload-image-image" v-else :style="{backgroundImage: `url(${imagePath(item.filePath)})`}"></div>
                <div class="upload-upload-list-cover cursor-pointer">
                    <i-icon type="ios-trash-outline" class="font-white delete-img" size="28" @click.native="onImageRemove(index)"></i-icon>
                </div>
            </li>
            <li class="upload-image-item" v-if="maxLength === 0 || uploadList.length < maxLength">
                <u-upload-base
                    :data="{type: 2}"
                    :show-upload-list="false"
                    :action="''"
                    accept="image/*, video/*"
                    :format="['jpg', 'jpeg', 'png', 'gif', 'mp4', '3gp', 'avi', 'mpeg']"
                    :on-format-error="onFormatError"
                    :on-exceeded-size="onExceededSize"
                    :on-error="onUploadError"
                    :on-get-result="onGetFileResult">
                    <!-- <i class="iconfont iconplus"></i> -->
                    <i-icon type="ios-add" size="40" class="font-lightgrey"/>
                    <!-- <i-icon class="font-main-base" type="ios-plus-empty" size="60"></i-icon> -->
                    <slot></slot>
                </u-upload-base>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { vueComponent, View, config } from "uxmid-iview-web";
import { ExtendUtils } from "src/common/utils";
import messages from "src/common/utils/message";

/**
 * 图片上传组件
 * @event on-removed 当移除图片时触发
 * @event on-uploaded 当上传图片完成时触发
 */
@vueComponent
export default class ComponentUploadImage extends View
{
    
    protected imagePath: any = ExtendUtils.imagePath;

    /**
     * 上传图片文件地址
     * @member
     * @protected
     * @returns string
     */
    // @config({type: String, default: ""})
    // protected uploadFileUrl: string;

    /**
     * 上传图片文件地址
     * @member
     * @protected
     * @returns Array<any>
     */
    @config({type: Array})
    protected value: Array<any>;

    /**
     * 限定上传数量 0标识不限制
     * @member
     * @protected
     * @returns Array<any>
     */
    @config({type: Number, default: 0})
    protected maxLength: number;

    /**
     * 图片列表数据
     * @member
     * @protected
     * @returns Array<any>
     */
    protected get uploadList(): Array<any>
    {
        return this.value;
    }

    /**
     * 图片列表数据
     * @member
     * @protected
     */
    protected set uploadList(value: Array<any>)
    {
        
        this.$emit("input", value);
    }

    /**
     * 删除对应的图片
     * @protected
     * @param {number} index 图片索引
     * @returns void
     */
    protected onImageRemove(index: number): void
    {
        // 删除对应的图片
        let currentRemoveItem = this.uploadList.splice(index, 1);

        // 复制已有图片列表
        let uploadList = this.uploadList.slice();

        // 计算
        let attachmentMarks = uploadList
            .map(item => item.id)
            .toString();

        this.$emit("on-removed", uploadList, attachmentMarks, currentRemoveItem);
        // this.$set(this.model, "attachmentMark", this.attachmentMarks);
    }

    /**
     * 当文件格式验证失败时调用。
     * @param  {any} file 当前上传文件。
     * @param  {Array<any>} fileList 当前已上传文件集合。
     * @protected
     * @returns void
     */
    protected onFormatError(file: any, fileList: Array<any>): void {
        this.$Message.error(messages["work.report.file.format.error"]);
    }

    /**
     * 当文件超出指定大小限制时调用。
     * @protected
     * @param  {any} file 当前上传文件。
     * @param  {Array<any>} fileList 当前已上传文件集合。
     * @returns void
     */
    protected onExceededSize(file: any, fileList: Array<any>): void {
        this.$Message.error(messages["work.report.file.exceeded.size"]);
    }

    /**
     * 当文件上传失败时调用。
     * @protected
     * @param  {any} error 错误信息。
     * @param  {any} file 当前上传文件。
     * @param  {Array<any>} fileList 当前已上传文件集合。
     * @returns void
     */
    protected onUploadError(error: any, file: any, fileList: Array<any>): void {
        this.$Message.error(messages["file.upload.failed"]);
    }

    /**
     * 当文件上传成功后获取上传结果时调用。
     * @protected
     * @param  {any} result 上传成功结果。
     * @param  {number} index 下标。
     * @returns void
     */
    protected onGetFileResult(result: any, index: number): void
    {
        console.log("image-upload", result);
        if (result.content && result.content.length > 0)
        {

            // 复制已有图片列表
            let uploadList = this.uploadList.slice();

            // 添加图片结果
            uploadList.push(...result.content);

            // 计算
            let attachmentMarks = uploadList
                .map(item => item.id)
                .toString();

            // this.$set(this, "attachmentMark", attachmentMarks);

            this.$set(this, "uploadList", uploadList);

            this.$emit("on-uploaded", uploadList, attachmentMarks, result.content[0]);
        }

        // 这里一般是头像，头像没有attachmentMarks.
        if(result.content && result.content.url)
        {
            // 复制已有图片列表
            let uploadList = this.uploadList.slice();

            // 添加图片结果
            uploadList.push(result.content);

            this.$set(this, "uploadList", uploadList);

            this.$emit("on-uploaded", uploadList, null, result.content);
        }
    }

    protected isVideo(filePath: string)
    {
        let i = filePath.indexOf("."); // 无效数据会导致异常，先删除无效数据源
        if (i > 0)
        {
            let suf = filePath.substring(i, filePath.length);
            if (suf === ".mp4")
            {
                return true;
            }
        }
        return false;
    }
}
</script>

<style lang="less" scoped>
    @import "./style";
</style>
