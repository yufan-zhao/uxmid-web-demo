<template>
    <i-modal
        class="crud-modal"
        v-model="isShow"
        :width="width"
        :mask-closable="false"
        @on-cancel="onOps('cancel')"
    >
        <p class="title-container" slot="header">
            <span class="title">{{title}}</span>
        </p>

        <!-- 弹层内容插槽 -->
        <slot name="content"></slot>

        <!-- 弹层下方内容 -->
        <div slot="footer">
            <slot name="footer">
                <i-button type="info" v-if="isSave" @click="onOps('onSave')">保存并添加</i-button>
                <i-button type="info" @click="onOps('cancel')">取消</i-button>
                <i-button type="primary" @click="onOps('submit')" :loading="isLoading">{{submitBtnLabel}}</i-button>
            </slot>
        </div>
        
    </i-modal>
</template>

<script lang="ts">
import { component, Component, config } from "uxmid-vue-web";

/**
 * 配合switch-table的新增-编辑弹层
 * @class
 */
@component
export default class CrudModal extends Component
{
    /**
     * 弹层标题
     * @protected
     * @property
     * @config
     */
    @config({required: false, type: String, default: "弹层"})
    protected title: string;

    /**
     * 弹层宽度
     * @protected
     * @property
     * @config
     */
    @config({required: false, type: Number, default: 566})
    protected width: number;

    /**
     * 弹层宽度
     * @protected
     * @property
     * @config
     */
    @config({required: false, type: Boolean, default: false})
    protected isSave: boolean;

    /**
     * 确定按钮文字
     * @protected
     * @property
     * @config
     */
    @config({required: false, type: String, default: "保存"})
    protected submitBtnLabel: string;

    /**
     * 是否弹出弹层
     * @protected
     * @property
     */
    protected isShow: boolean = false;

    /**
     * 提交按钮是否正在异步加载数据
     * @protected
     * @property
     */
    protected isLoading: boolean = false;

    /**
     * 打开方法
     * @protected
     * @member
     */
    protected open()
    {
        this.isShow = true;
    }

    /**
     * 关闭方法
     * @protected
     * @member
     */
    protected close()
    {
        this.isShow = false;
        this.reset();
    }

    /**
     * 重置弹层
     * @protected
     * @member
     */
    protected reset()
    {
        // 等待关闭动画结束后执行
        setTimeout(() =>
        {
            this.isLoading = false;
            this.$emit("on-closed");
        }, 300);
    }

    /**
     * 弹层表单校验失败
     * @protected
     * @member
     */
    protected onValidateFailed()
    {
        this.isLoading = false;
    }

    /**
     * 操作事件
     * @protected
     * @member
     */
    protected onOps(opName: string)
    {
        try
        {
            this.isLoading = true;
            this.$emit("on-ops", opName, this.onValidateFailed);
        } catch (error)
        {
            //
        }finally
        {
            this.isLoading = false;
        }
    }
}
</script>

<style lang="less" scoped>
@import "./crud-modal.less";
</style>