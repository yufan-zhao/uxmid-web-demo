<template>
    <u-crud-modal
        ref="curdModal"
        class="curd-modal"
        :title="title"
        :width="836"
        @on-ops="onOps"
        @on-closed="onClosed"
    >
        <template v-slot:content>
            <i-form class="customed-form" ref="form" :model="formModel" :rules="rules">
                <i-row type="flex" justify="start">
                    <i-col span="12">
                        <i-form-item class="customed-form-item" label="测试名称：" :label-width="108">
                            <i-input placeholder="这是一个输入框"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item class="customed-form-item" label="测试名称：" :label-width="108">
                            <i-input placeholder="这是一个输入框"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item class="customed-form-item" label="测试名称：" :label-width="108">
                            <i-input placeholder="这是一个输入框"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="12">
                        <i-form-item class="customed-form-item" label="测试名称：" :label-width="108">
                            <i-input placeholder="这是一个输入框"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col span="24">
                        <i-form-item class="customed-form-item" label="测试名称：" :label-width="108">
                            <i-input placeholder="这是一个输入框"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
            </i-form>
        </template>
    </u-crud-modal>
</template>

<script lang="ts">
import { component, View, mixins, config, watch } from "uxmid-vue-web";

/**
 * 新增、编辑弹层
 * @component
 */
@component
export default class InsertUpdateModal extends View
{
    /**
     * 新增接口
     * @protected
     * @config
     */
    @config({required: true, type: Function})
    protected insert: Function;
    /**
     * 修改接口
     * @protected
     * @config
     */
    @config({required: true, type: Function})
    protected update: Function;

    /**
     * 弹层标题
     * @protected
     * @property
     */
    protected title: string = "";

    /**
     * 表单对象
     * @protected
     * @property
     */
    protected formModel: any = {};

    /**
     * 表单校验规则
     * @protected
     * @property
     */
    protected rules: any =
    {

    };

    /**
     * 打开方法
     * @public
     */
    public open(data?: any)
    {
        if (data && data.id)
        {
            // 更新
            this.title = "编辑";
            this.formModel = data;
        }
        else
        {
            // 新增
            this.title = "新增";
        }
        this._curdModal.open();
    }

    /**
     * 弹层操作事件
     * @param type 操作方式
     */
    protected onOps(type: string, onValidateFailed: Function)
    {
        if (type === "submit")
        {
            this._form.validate(async valid =>
            {
                if (!valid)
                {
                    onValidateFailed();
                    return;
                }

                try
                {
                    if (this.formModel.id)
                    {
                        // 更新
                        await this.update(this.formModel);
                        this.$message.success("编辑成功");
                    }
                    else
                    {
                        // 新增
                        await this.insert(this.formModel);
                        this.$message.success("新增成功");
                    }
                    this.$emit("on-refresh", this.formModel);
                    this._curdModal.close();
                }
                catch(err)
                {
                    this.$message.error(err.msg || err.message);
                    onValidateFailed();
                }
            });
        }
        else
        {
            this._curdModal.close();
        }
    }

    /**
     * 弹层完全关闭时事件
     * @protected
     * @member
     */
    protected onClosed()
    {
        this.formModel = {};
        this._form.resetFields();
    }

    /**
     * 表格ref
     * @private
     */
    protected get _form(): any
    {
        return this.$refs["form"] as any;
    }
    /**
     * 弹层实例
     * @private
     * @ref
     */
    protected get _curdModal(): any
    {
        return this.$refs["curdModal"] as any;
    }
}
</script>

<style lang="less" scoped>
.customed-form
{
    padding: 30px 30px 0 5px;
}
</style>