<template>
    <div class="v-login-form" @keyup.enter="submit">
        <!-- 请登录 -->
        <div class="form-main login" v-show="mode === 'login'">
            <div class="title">请登录</div>
            <i-form class="form" ref="loginForm" hide-required-mark :model="loginForm" :rules="loginFormRules">
                <i-form-item class="form-item focus" label="账号" prop="username">
                    <i-input placeholder="请输入账号" v-model.trim="loginForm.username"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus" label="密码" prop="password">
                    <i-input type="password" placeholder="请输入密码" v-model.trim="loginForm.password"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus code" label="验证码" prop="verifyCode" v-if="verifyCode">
                    <i-input placeholder="请输入验证码" v-model.trim="loginForm.verifyCode"></i-input>
                    <div class="verify-code-wrap">
                        <slot name="verify-code" :countdown="countdown">
                            <img src="" alt="验证码">
                        </slot>
                    </div>
                </i-form-item>
            </i-form>
            <div class="switch-mode">
                <i-checkbox v-model="loginForm.rememberPassword" v-if="remember"><span>记住密码</span></i-checkbox>
                <span v-if="retrieve" @click="switchMode('retrieve')">忘记密码？</span>
            </div>
            <div class="submit">
                <i-button type="primary" :loading="loadingState.login" @click="submit">登录</i-button>
            </div>
        </div>
        <!-- 找回密码 -->
        <div class="form-main retrieve" v-show="mode === 'retrieve'">
            <div class="title">找回密码</div>
            <i-form class="form" ref="retrieveForm" hide-required-mark :model="retrieveForm" :rules="retrieveFormRules">
                <i-form-item class="form-item focus" label="账号" prop="username">
                    <i-input placeholder="请输入账号" v-model.trim="retrieveForm.username"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus" label="新密码" prop="newPassword">
                    <i-input type="password" placeholder="请输入密码" v-model.trim="retrieveForm.newPassword"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus" label="再次确认密码" prop="confirmPassword">
                    <i-input type="password" placeholder="请输入密码" v-model.trim="retrieveForm.confirmPassword"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus" label="手机号" prop="mobile">
                    <i-input placeholder="请输入手机号" v-model.trim="retrieveForm.mobile"></i-input>
                </i-form-item>
                <i-form-item class="form-item focus code" label="验证码" prop="verifyCode">
                    <i-input placeholder="请输入验证码" v-model.trim="retrieveForm.verifyCode"></i-input>
                    <span class="verify-code-btn" @click="getMobileVerifyCode" v-if="!mobileVerifyCodeState.cooling">获取验证码</span>
                    <span class="verify-code-countdown" v-else>
                        <slot name="countdown" :countdown="mobileVerifyCodeState.countdown">{{mobileVerifyCodeState.countdown}}s</slot>
                    </span>
                </i-form-item>
            </i-form>
            <div class="switch-mode">已有账号，<span @click="switchMode('login')">去登录</span></div>
            <div class="submit">
                <i-button type="primary" :loading="loadingState.retrieve" @click="submit">
                    <slot name="retrieve-submit-btn">确定</slot>
                </i-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { vueComponent, View, config, watch } from "uxmid-iview-web";
import { IMode, ILoginForm, IRetrieveForm } from "./i-login";
import { Form } from "view-design";
import { util } from "src/common/decorator";

/**
 * 用户登录表单
 */
@vueComponent
export default class Login extends View
{
    /**
     * 缓存命名空间
     */
    @config({ required: true, type: String })
    protected scope: string;

    /**
     * 是否开启找回密码功能。默认不开启
     */
    @config({ required: false, type: Boolean, default: false })
    protected retrieve: boolean;

    /**
     * 登录是否需要后台验证码。默认需要
     */
    @config({ required: false, type: Boolean, default: true })
    protected verifyCode: boolean;

    /**
     * 是否开启记住密码功能。默认不开启
     */
    @config({ required: false, type: Boolean, default: false })
    protected remember: boolean;

    /**
     * 短信验证码冷却时间。默认为60s
     */
    @config({ required: false, type: Number, default: 60 })
    protected countdown: number;

    /**
     * 正则
     */
    @util("Patterns")
    protected pattern;

    /**
     * 本地缓存key
     */
    protected get localStorageScope()
    {
        return this.scope + "/loginForm";
    }

    /**
     * 登录表单Ref
     */
    protected get loginFormRef()
    {
        return this.$refs.loginForm as Form;
    }

    /**
     * 忘记密码表单Ref
     */
    protected get retrieveFormRef()
    {
        return this.$refs.retrieveForm as Form;
    }

    /**
     * 表单正则
     */
    protected get formPattern()
    {
        return this.pattern;
    }

    /**
     * 当前模式
     */
    protected mode: IMode = "login";

    /**
     * loading状态
     */
    protected loadingState =
    {
        login: false,
        retrieve: false
    };
    
    /**
     * 短线验证码倒计时
     */
    protected mobileVerifyCodeState =
    {
        // 短线验证码按钮是否冷却🥶
        cooling: false,
        // 倒计时，单位(秒)
        countdown: 0,
        // 计时器
        timer: null
    };

    /**
     * 登录表单
     */
    protected loginForm: ILoginForm =
    {
        username: null,
        password: null,
        verifyCode: null,
        rememberPassword: false
    };

    /**
     * 登录表单验证规则
     */
    protected loginFormRules =
    {
        username:
        {
            required: true,
            trigger: "blur",
            message: "请输入账号"
        },
        password:
        {
            required: true,
            trigger: "blur",
            message: "请输入密码"
        },
        verifyCode:
        {
            required: true,
            trigger: "blur",
            message: "请输入验证码"
        }
    };

    /**
     * 找回密码表单
     */
    protected retrieveForm: IRetrieveForm =
    {
        username: null,
        newPassword: null,
        confirmPassword: null,
        mobile: null,
        verifyCode: null
    };

    /**
     * 找回密码表单验证规则
     */
    protected retrieveFormRules =
    {
        username:
        {
            required: true,
            trigger: "blur",
            message: "请输入账号"
        },
        newPassword:
        {
            required: true,
            trigger: "blur",
            message: "请输入密码"
        },
        confirmPassword:
        [
            {
                required: true,
                trigger: "blur",
                message: "请输入密码"
            },
            {
                trigger: "blur",
                message: "与新密码不一致",
                validator: (rule, value) =>
                {
                    return value === this.retrieveForm.newPassword;
                }
            }
        ],
        mobile:
        [
            {
                required: true,
                trigger: "blur",
                message: "请输入手机号"
            },
            {
                trigger: "blur",
                max: 11,
                message: "长度不能超过11位"
            },
            {
                trigger: "blur",
                message: "手机号格式不正确",
                pattern: this.formPattern.mobile
            }
        ],
        verifyCode:
        {
            required: true,
            trigger: "blur",
            message: "请输入验证码"
        }
    };

    /**
     * 表单提交
     */
    public submit()
    {
        const mode = this.mode;
        if (mode === "login")
        {
            this.loginSubmit();
        }
        else if (mode === "retrieve")
        {
            this.retrieveSubmit();
        }
    }

    /**
     * 表单重置
     */
    public resetForm(): void
    {
        this.loginFormRef.resetFields();
        this.retrieveFormRef.resetFields();

        this.loadingState =
        {
            login: false,
            retrieve: false
        };
    }

    /**
     * 按钮状态重置
     */
    public resetSubmit()
    {
        this.loadingState =
        {
            login: false,
            retrieve: false
        };
    }

    /**
     * 切换模式
     */
    protected switchMode(nextMode: IMode)
    {
        this.mode = nextMode;
        
        // 清空当前表单的输入
        if (nextMode === "login")
        {
            this.retrieveFormRef.resetFields();
        }
        else if (nextMode === "retrieve")
        {
            this.loginFormRef.resetFields();
        }
    }

    /**
     * 登录表单提交
     */
    protected loginSubmit()
    {
        this.loginFormRef.validate((valid: boolean) =>
        {
            if (valid)
            {
                this.loadingState.login = !this.loadingState.login;
                const params: { type: IMode; payload: ILoginForm } =
                {
                    type: "login",
                    payload:
                    {
                        ...this.loginForm
                    }
                };
                this.$emit("submit", params);
            }
        });
    }

    /**
     * 找回密码表单提交
     */
    protected retrieveSubmit()
    {
        this.retrieveFormRef.validate((valid: boolean) =>
        {
            if (valid)
            {
                this.loadingState.retrieve = !this.loadingState.retrieve;
                const params: { type: IMode; payload: IRetrieveForm } =
                {
                    type: "retrieve",
                    payload:
                    {
                        ...this.retrieveForm
                    }
                };
                this.$emit("submit", params);
            }
        });
    }

    /**
     * 获取手机短线验证码
     */
    protected getMobileVerifyCode()
    {
        this.retrieveFormRef.validateField("mobile", (valid: boolean) =>
        {
            if (typeof valid === "string")
            {
                // ? 实际返回 message 的字段内容，属于组件自身的问题，但不影响使用。
                const message: string = valid;

                // 验证通过时，返回空字符串。
                if (message === "")
                {
                    this.sendMobileVerifyCode();
                }
            }
            else if (valid === true)
            {
                // ? 理想状态是接收boolean值
                this.sendMobileVerifyCode();
            }
        });
    }

    /**
     * 发送短线验证码
     */
    protected sendMobileVerifyCode()
    {
        this.mobileVerifyCodeState.cooling = true;
        window.localStorage.setItem(this.localStorageScope, new Date().getTime().toString());

        this.runMobileVerifyCodeTimer();

        this.$emit("sendCode",
        {
            mobile: this.retrieveForm.mobile
        });
    }
    
    /**
     * 开启短线验证码冷却定时器
     */
    protected runMobileVerifyCodeTimer()
    {
        this.mobileVerifyCodeState.timer = setInterval(() =>
        {
            // 重置
            if (this.mobileVerifyCodeState.countdown <= 0)
            {
                clearInterval(this.mobileVerifyCodeState.timer);
                window.localStorage.removeItem(this.localStorageScope);
                this.mobileVerifyCodeState.countdown = this.countdown;
                this.mobileVerifyCodeState.cooling = false;
                return;
            }
            this.mobileVerifyCodeState.countdown--;
        }, 1000);
    }

    /**
     * 检察本地缓存同步短线验证码冷却状态
     */
    protected syncCoolingState(): void
    {
        // 当前时间，单位(毫秒)
        const currentTime = new Date().getTime();

        // 上一次保存的时间，单位(毫秒)
        const lastTime = +window.localStorage.getItem(this.localStorageScope) || 0;

        // 冷却时长，单位(毫秒)
        const countdown = 1000 * this.countdown;

        // 冷却完毕。公式：当前时间 > 上一次保存的时间 + 冷却时长
        if (currentTime < lastTime + countdown)
        {
            // 剩余时间，单位(毫秒)
            const remainTime = countdown - (currentTime - lastTime);
            
            // 继续倒计时
            this.mobileVerifyCodeState.countdown = remainTime / 1000 >> 0;
            this.mobileVerifyCodeState.cooling = true;
            this.runMobileVerifyCodeTimer();
        }
    }

    /**
     * 接收外部传入的短信验证码冷却时间
     */
    @watch("countdown", { deep: true, immediate: true })
    protected countdownWatcher()
    {
        this.mobileVerifyCodeState.countdown = this.countdown;
    }

    /**
     * @beforeDestroy
     */
    private beforeDestroy()
    {
        if (this.mobileVerifyCodeState.timer)
        {
            clearInterval(this.mobileVerifyCodeState.timer);
        }
    }

    /**
     * @mounted
     */
    private mounted()
    {
        this.syncCoolingState();
    }
}
</script>

<style lang="less" scoped>
.v-login-form
{
    .form-main
    {
        &.login
        {
            .form
            {
                .verify-code-wrap
                {
                    display: inline-block;
                }
            }

            .switch-mode
            {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span
                {
                    cursor: pointer;
                }
            }
        }

        &.retrieve
        {
            .form
            {
                .verify-code-btn
                {
                    cursor: pointer;
                    color: #2d52f2;
                }
            }

            .switch-mode
            {
                span
                {
                    cursor: pointer;
                    color: #2d52f2;
                }
            }
        }
    }
}
</style>
