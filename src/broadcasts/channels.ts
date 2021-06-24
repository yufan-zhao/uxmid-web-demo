export default class BroadcastChannels
{
    /**
     * 用户登录频道
     * @public
     * @static
     * @readonly
     * @returns {string} 频道名称
     */
    public static readonly LOGIN: string = "application://user/login";

    /**
     * 用户登出频道
     * @public
     * @static
     * @readonly
     * @returns {string} 频道名称
     */
    public static readonly LOGOUT: string = "application://user/logout";
}
