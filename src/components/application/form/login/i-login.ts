/**
 * 登录 | 找回密码
 */
export type IMode = "login" | "retrieve";

/**
 * 登录表单
 */
export interface ILoginForm
{
    /**
     * 账号
     */
    username: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 验证码
     */
    verifyCode: string;

    /**
     * 是否记住密码
     */
    rememberPassword: boolean;
}

/**
 * 找回密码表单
 */
export interface IRetrieveForm
{
    /**
     * 账号
     */
    username: string;

    /**
     * 新密码
     */
    newPassword: string;

    /**
     * 确认密码
     */
    confirmPassword: string;

    /**
     * 手机号
     */
    mobile: string;

    /**
     * 验证码
     */
    verifyCode: string;
}
