/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2017-present Wayto Inc. All rights reserved. 
 */

/**
 * 表示高德地图的配置。
 * @interface
 * @version 1.0.0
 */
export default interface IAmapSettings
{
    /**
     * 获取地图Key。
     * @member
     * @returns string
     */
    readonly key: string;

    /**
     * 获取Web服务Key。
     * @member
     * @returns string
     */
    readonly serviceKey: string;
    
    /**
     * 获取地图地图风格。
     * @member
     * @returns string
     */
    readonly style?: string;
    
    /**
     * 获取地图版本号。
     * @member
     * @returns string
     */
    readonly version?: string;
    
    /**
     * 获取地图UI库版本号。
     * @member
     * @returns string
     */
    readonly uiVersion?: string;
    
    /**
     * 获取地图地址。
     * @member
     * @returns string
     */
    readonly host?: string;

    /**
     * 获取地图协议。
     * @member
     * @returns string
     */
    readonly protocol?: string;
    
    /**
     * 获取一个布尔值，表示是否延迟加载地图库。
     * @member
     * @returns boolean
     */
    readonly lazyload?: boolean;

    /**
     * 获取高德插件列表。
     * @member
     * @returns Array<string>
     */
    readonly plugins?: Array<string>;
}
