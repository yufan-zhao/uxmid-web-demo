import { ICredential } from "uxmid-core";

/**
 * 表示一个凭证。
 * @interface
 */
export default interface IApplicationCredential extends ICredential
{
    token?: string;

    /**
     * 用户对象
     */
    user?: any;
}
