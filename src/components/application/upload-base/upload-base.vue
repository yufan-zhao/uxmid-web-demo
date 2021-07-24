<template>
    <i-upload ref="upload"
        :action="action"
        :multiple="multiple"
        :show-upload-list="showUploadList"
        :type="type"
        :accept="accept"
        :format="format"
        :max-size="maxSize"
        :before-upload="uploadAdapter"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-format-error="onFormatError"
        :on-exceeded-size="onExceededSize"
        :default-file-list="defaultFileList">
        <slot v-if="loading" name="loading"></slot>
        <slot v-else></slot>
        <slot name="tip"></slot>
    </i-upload>
</template>

<script lang="ts">
import { Type } from "uxmid-core";
import { vueComponent, config, Component } from "uxmid-iview-web";
import HttpClient from "src/common/http/http-client";
import { ApplicationContext } from "src/application";
import { UploadService } from "src/services";

/**
 * 表示一个文件上传组件。
 * @class
 * @version 1.0.0
 */
@vueComponent
export default class FileUploadBase extends Component
{
    /**
     * 获取 iview 的文件上传组件。
     * @protected
     * @property
     * @returns any
     */
    protected get $upload(): any
    {
        return this.$refs.upload;
    }

    /**
     * 获取或设置是否显示加载动画。
     * @protected
     * @member
     * @returns boolean
     */
    protected loading: boolean = false;

    /**
     * 获取或设置上传控件下标。
     * @public
     * @config
     * @returns Number
     */
    @config({type: Number, default: 0})
    public index: number;

    /**
     * 获取或设置上传的地址。
     * @public
     * @config
     * @returns String
     */
    @config({type: String, required: true})
    public action: string;

    /**
     * 获取或设置是否支持多选文件。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean, default: false})
    public multiple: boolean;

    /**
     * 获取或设置是否显示已上传文件列表。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean, default: false})
    public showUploadList: boolean;

    /**
     * 获取或设置上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）。
     * @public
     * @config
     * @default drag
     * @returns String
     */
    @config({type: String, default: "drag"})
    public type: string;

    /**
     * 获取或设置上传的文件名。
     * @public
     * @config
     * @returns String
     */
    @config({type: String})
    public name: string;

    /**
     * 获取或设置上传时附带的额外参数。
     * @public
     * @config
     * @returns String
     */
    @config({type: Object})
    public data: object;

    /**
     * 获取或设置文件大小限制，单位kb。
     * @public
     * @config
     * @default 20480
     * @returns Number
     */
    @config({type: Number, default: 20480})
    public maxSize: number;

    /**  
     * 获取或设置接受上传的文件类型。
     * @public
     * @config
     * @default "application/pdf, image/jpeg, image/png, image/gif, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/x-rar-compressed, application/zip"
     * @returns String
     */
    @config({type: String, default: "application/pdf, image/jpeg, image/png, image/gif, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/x-rar-compressed, application/zip"})
    public accept: string;

    /**
     * 获取或设置支持的文件类型。
     * @description 与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
     * @public
     * @config
     * @default ["pdf", "jpg", "jpeg", "png", "gif", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "rar", "zip", "mp4"]
     * @returns Array<string>
     */
    @config({type: Array, default: () => ["pdf", "jpg", "jpeg", "png", "gif", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "rar", "zip", "mp4"]})
    public format: Array<string>;

    /**
     * 获取或设置上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function})
    public beforeUpload: Function;

    /**
     * 获取或设置文件上传时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onProgress: Function;

    /**
     * 获取或设置文件上传成功时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onSuccess: Function;

    /**
     * 获取或设置文件上传失败时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onError: Function;

    /**
     * 获取或设置点击已上传的文件链接时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onPreview: Function;

    /**
     * 获取或设置文件列表移除文件时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onRemove: Function;

    /**
     * 获取或设置文件格式验证失败时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onFormatError: Function;

    /**
     * 获取或设置文件超出指定大小限制时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onExceededSize: Function;

    /**
     * 获取或设置文件上传成功后获取结果时的钩子。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Function, default: () => undefined})
    public onGetResult: Function;

    /**
     * 获取或设置默认已上传的文件列表。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Array})
    public defaultFileList: Array<Object>;

    /**
     * 清空已上传的文件列表。
     * @public
     * @returns void
     */
    public clearFiles(): void
    {
        this.$upload.clearFiles();
    }

    // /**
    //  * 当组件创建完毕时调用。
    //  * @protected
    //  * @override
    //  * @returns void
    //  */
    // protected mounted(): void
    // {
    //     let $upload = this.$upload;

    //     // 替换 iview 的上传方法
    //     if(!$upload.replaced)
    //     {
    //         $upload.post = this.post.bind(this);
            
    //         $upload.replaced = true;
    //     }
    // }

    /**
     * 文件上传实际接口
     * @protected
     * @member
     * @param arg1 input产生的文件对象 File | FileList
     */
    protected uploadAdapter(arg1: File)
    {
        let $upload = this.$upload;

        const uploadService = ApplicationContext.current.serviceFactory.default.resolve<UploadService>(UploadService);
        if (arg1 instanceof File)
        {
            // check format
            if($upload.format.length)
            {
                const FILE_FORMAT = arg1.name.split(".").pop().toLocaleLowerCase();
                const checked = $upload.format.some(item => item.toLocaleLowerCase() === FILE_FORMAT);

                if(!checked)
                {
                    $upload.onFormatError(arg1, $upload.fileList);
                    
                    return false;
                }
            }

            // 开始上传动画
            this.loading = true;

            uploadService.blobUpload([arg1], (e: any) =>
            {
                if(e.total > 0)
                {
                    e.percent = e.loaded / e.total * 100;
                }

                if (typeof this.onProgress === "function")
                {
                    this.onProgress(e, arg1);
                }
            }).then(res =>
            {
                // 结束上传动画
                this.loading = false;
                if (typeof this.onSuccess === "function")
                {
                    this.onSuccess();
                }
                if (typeof this.onGetResult === "function")
                {
                    console.log("base-upload");
                    this.onGetResult.call(this, res, this.index);
                }
            }).catch(err =>
            {
                // 结束上传动画
                this.loading = false;
                if (typeof this.onError === "function")
                {
                    this.onError(err, arg1);
                }
            });
        }
        else
        {
            console.error("暂不支持该上传参数，请检查上传实现方法");
        }

        return false; // 主动打断iview上传组件上传，改用service中的上传方法
    }

    // /**
    //  * 文件上传方法。
    //  * @private
    //  * @returns void
    //  */
    // private post(file: any)
    // {
    //     let $upload = this.$upload;

    //     // check format
    //     if($upload.format.length)
    //     {
    //         const FILE_FORMAT = file.name.split(".").pop().toLocaleLowerCase();
    //         const checked = $upload.format.some(item => item.toLocaleLowerCase() === FILE_FORMAT);

    //         if(!checked)
    //         {
    //             $upload.onFormatError(file, $upload.fileList);
                
    //             return false;
    //         }
    //     }

    //     // check maxSize
    //     // if($upload.maxSize)
    //     // {
    //     //     if(file.size > $upload.maxSize * 1024)
    //     //     {
    //     //         $upload.onExceededSize(file, $upload.fileList);

    //     //         return false;
    //     //     }
    //     // }

    //     $upload.handleStart(file);

    //     // 开始上传动画
    //     this.loading = true;

    //     // 开始上传
    //     HttpClient.instance.upload
    //     ({
    //         url: this.action,

    //         data: this.data,

    //         files:
    //         {
    //             [this.name || file.name] : file
    //         },

    //         onUploadProgress: (e: any) =>
    //         {
    //             if(e.total > 0)
    //             {
    //                 e.percent = e.loaded / e.total * 100;
    //             }

    //             $upload.handleProgress(e, file);
    //         }
    //     })
    //     .then((result: any) =>
    //     {
    //         // 结束上传动画
    //         this.loading = false;

    //         if(!Type.isEmptyObject(this.onGetResult) && Type.isFunction(this.onGetResult))
    //         {
    //             this.onGetResult.call(this, result, this.index);
    //         }

    //         $upload.handleSuccess(result, file);
    //     })
    //     .catch((error: any) =>
    //     {
    //         // 结束上传动画
    //         this.loading = false;

    //         $upload.handleError(error, {}, file);
    //     });
    // }
}
</script>

<style lang="less">
    @import "./upload-base.less";
</style>
