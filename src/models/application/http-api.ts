import IApplicationCredential from "./application-credential";
import { APPLICATION_PLATFORM } from "src/enums";

/**
 * 表示一个平台的Api
 */
export default interface IHttpApi<T>
{
    /**
     * Api所属平台
     * @returns {APPLICATION_PLATFORM} 枚举值
     */
    platform: APPLICATION_PLATFORM;

    /**
     * 请求所需的凭证。
     * @returns {IApplicationCredential} 安全凭证
     */
    credential: IApplicationCredential;

    /**
     * 请求接口路径对象。
     * @returns {T} 路径对象
     */
    apis: T;

    /**
     * 接口前半部分。
     * "http://localhost:8080"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
     * @returns {string} 接口头部
     */
    origin: string;

    /**
     * 路径前缀。
     * @returns {string} 前缀
     */
    prefix?: string;
}
