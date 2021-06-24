import ApplicationCredential from "./application-credential";
import { APPLICATION_PLATFORM } from "src/enums";

/**
 * 表示一个平台的Api
 */
export default interface IHttpApi
{
    /**
     * Api所属平台
     * @returns {APPLICATION_PLATFORM} 枚举值
     */
    platform: APPLICATION_PLATFORM;

    /**
     * 请求所需的凭证。
     * @returns {ApplicationCredential} 安全凭证
     */
    credential: ApplicationCredential;

    /**
     * 请求接口路径对象。
     * @returns {{[name: string]: string}} 路径对象
     */
    apis: {[name: string]: string};

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
