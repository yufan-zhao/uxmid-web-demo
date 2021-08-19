<template>
    <div class="v-login">
        <div class="bg"></div>
        <div class="form-wrap" ref="formWrap">
            <u-login-form class="login-form" scope="loginPage" remember retrieve ref="loginForm" @sendCode="onSendCode" @submit="onSubmit">
                <!-- 后台验证码 -->
                <div slot="verify-code" class="verify-code">
                    <img title="刷新验证码" :src="verifyCode" alt="验证码" v-if="verifyCode" @click="getVerifyCode">
                </div>
                <!-- 短线验证码倒计时文本自定义 -->
                <span slot="countdown" slot-scope="props">{{props.countdown}}s</span>
                <!-- 找回密码提交按钮文本自定义 -->
                <span slot="retrieve-submit-btn">确定并登录</span>
            </u-login-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { uLoginForm } from "src/components/application";
import { IMode as ILoginMode, ILoginForm, IRetrieveForm } from "src/components/application/form/login/i-login";
import { service } from "src/common/decorator";

@Component({
    components:
    {
        "u-login-form": uLoginForm
    }
})
export default class Login extends Vue
{
    @service("AuthService")
    protected authService: IServices.AuthService;

    /**
     * 表单组件Ref
     */
    protected get loginFormRef(): uLoginForm
    {
        return this.$refs.loginForm as uLoginForm;
    }

    /**
     * 背景动画交互事件代理元素
     */
    protected dotlineEventAgent = null;

    /**
     * 验证码
     */
    protected verifyCode: string = "";

    /**
     * 获取验证码
     */
    protected async getVerifyCode(): Promise<void>
    {
        this.verifyCode = await this.authService.getVerifyImg();
    }

    /**
     * 监听表单提交事件
     */
    protected onSubmit(params: { type: ILoginMode; payload: ILoginForm | IRetrieveForm }): void
    {
        const { type, payload } = params;
        
        if (type === "login")
        {
            this.login(payload as ILoginForm);
        }
        else if (type === "retrieve")
        {
            // const form = payload as IRetrieveForm;
        }
    }

    /**
     * 监听发送短线验证码事件
     */
    protected onSendCode(params: { mobile: string }): void
    {
        const { mobile } = params;
        // TODO 调用发送短线验证码接口
        
    }

    /**
     * 表单提交状态重置
     */
    protected resetSubmit(): void
    {
        this.loginFormRef.resetSubmit();
    }

    /**
     * 登录
     */
    protected async login(form: ILoginForm): Promise<void>
    {
        try
        {
            await this.authService.login(form);
            // this.$router.push({ name: this.$applicationContext.permissionRoutes[0].name });
        }
        catch (error)
        {
            this.resetSubmit();
            this.getVerifyCode();
        }
    }

    /**
     * 找回密码
     * @param form 表单
     */
    protected retrieve(form: IRetrieveForm)
    {
        // TODO 调用找回密码接口
        // 密码找回成功后，直接调用登录接口
    }

    /**
     * @mounted
     */
    private async mounted(): Promise<void>
    {
        this.getVerifyCode();
    
        this.dotlineEventAgent = this.$refs.formWrap;

        // if (this.$applicationContext.credential)
        // {
        //     this.$router.push({ name: this.$applicationContext.permissionRoutes[0].name });
        // }
    }
}
</script>

<style lang="less" scoped>
.v-login
{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .bg
    {
        flex: 1 1 55%;
        height: 100%;
        .bg-image("src/views/login/img_bg", "jpg");
        background: no-repeat top right / cover;
    }
    
    .form-wrap
    {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45%;
        height: 100%;

        @{deep}.login-form
        {
            max-width: 560px;
            width: 65%;

            .title
            {
                margin-bottom: 6.66%;
                line-height: 40px;
                font-size: 40px;
                font-weight: 400;
                color: #182334;
            }

            .submit
            {
                .ivu-btn
                {
                    width: 184px;
                    height: 52px;
                    font-size: 18px;
                }
            }

            .form-main
            {
                &.login
                {
                    transform: translateY(-12%);

                    .switch-mode
                    {
                        margin: 30px 0 40px 0;
                        padding-left: 20px;
                        box-sizing: border-box;
                        font-size: 16px;

                        span
                        {
                            font-size: 16px;
                            color: #5D6673;
                        }
                    }
                }

                &.retrieve
                {
                    transform: translateY(-5%);

                    .switch-mode
                    {
                        margin: 30px 0 40px 0;
                        padding-left: 20px;
                        box-sizing: border-box;
                        font-size: 16px;
                        
                        span
                        {
                            font-size: 16px;
                        }
                    }
                }

                .form
                {
                    background: #fff;
                    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.06);

                    .form-item
                    {
                        margin-bottom: 0;
                        padding: 8px 5.8%;
                        box-sizing: border-box;
                        border-bottom: 1px solid #F2F2F6;

                        &:last-child
                        {
                            border-bottom: none;
                        }

                        &.code
                        {
                            position: relative;
                            
                            .verify-code-wrap
                            {
                                position: absolute;
                                right: 0;

                                .verify-code
                                {
                                    overflow: hidden;
                                    position: relative;
                                    width: 100px;
                                    height: 36px;
                                    cursor: pointer;

                                    img
                                    {
                                        position: absolute;
                                        width: 100%;
                                        top: 50%;
                                        transform: translateY(-50%);
                                    }
                                }
                            }
                            
                            .verify-code-btn,
                            .verify-code-countdown
                            {
                                position: absolute;
                                right: 0;
                            }
                        }

                        .ivu-form-item-label
                        {
                            font-size: 16px;
                            color: #A6ABB5;
                        }

                        .ivu-form-item-content
                        {
                            position: relative;

                            .ivu-form-item-error-tip
                            {
                                position: absolute;
                                top: 40px;
                                right: 0;
                                text-align: right;
                                pointer-events: none;
                            }

                            .ivu-input
                            {
                                padding: 0;
                                border: none;
                                font-size: 18px;
                                color: #1A1A1A;

                                &::placeholder
                                {
                                    font-size: 16px;
                                }

                                &:focus
                                {
                                    box-shadow: none;
                                }
                            }
                        }

                        &:last-child
                        {
                            .ivu-form-item-content
                            {
                                .ivu-form-item-error-tip
                                {
                                    top: unset;
                                    right: unset;
                                    bottom: -30px;
                                }
                            }
                        }
                    }
                }

                .focus
                {
                    position: relative;

                    &:before 
                    {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: block;
                        width: 4px;
                        height: 100%;
                        border-radius: 1px;
                        transform: scaleY(0) translateZ(0);
                        transition: transform .4s cubic-bezier(0.25, 0.8, 0.5, 1);
                        background-color: #2d52f2;
                    }

                    &:focus-within:before
                    {
                        transform: scaleY(1) translateZ(0);
                    }
                }
            }
        }
    }

    .dotline
    {
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        width: 45%;
        height: 100%;
    }
}
</style>
