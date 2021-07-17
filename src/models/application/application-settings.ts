import { IAmapSettings } from "src/models";

/**
 * 表示项目的全局配置
 * @interface
 */
export default interface IApplicationSettings
{
    /**
     * 项目全称
     * @readonly
     * @returns {string} 字符串
     */
    readonly fullName: string;
    /**
     * 项目简称
     * @readonly
     * @returns {string} 字符串
     */
    readonly abbreviation: string;
    /**
     * 项目版本
     * @readonly
     * @returns {string} 字符串
     */
    readonly version: string;
    /**
     * 项目主接口地址
     * @readonly
     * @returns {string} 字符串
     */
    readonly mainOriginUrl: string;
    /**
     * 项目主接口前缀
     * @readonly
     * @returns {string} 字符串
     */
    readonly mainPrefix: string;
    /**
     * 鉴权接口地址
     * @readonly
     * @returns {string} 字符串
     */
    readonly authOriginUrl: string;
    /**
     * 鉴权接口前缀
     * @readonly
     * @returns {string} 字符串
     */
    readonly authPrefix: string;
    /**
     * 高德地图配置
     * @readonly
     * @returns {IAmapSettings} IAmapSettings
     */
    readonly amapSetting: IAmapSettings;
}
