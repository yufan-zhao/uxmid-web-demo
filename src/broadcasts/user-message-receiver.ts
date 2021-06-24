import { IBroadcastReceiver, BroadcastContext, Receivable } from "uxmid-core";

import BroadcastChannels from "./channels";

@Receivable(BroadcastChannels.LOGOUT)
@Receivable(BroadcastChannels.LOGIN)
export default class UserMessageReceiver implements IBroadcastReceiver
{
    /**
     * 当接收到广播时调用的方法。
     * @param  {BroadcastContext} context 广播上下文实例。
     * @returns {void} void
     */
    public async receive(context: BroadcastContext): Promise<void>
    {
        switch(context.uri)
        {
            case BroadcastChannels.LOGOUT:
            {
                // TODO 登出
                break;
            }
            case BroadcastChannels.LOGIN:
            {
                // TODO 登录
                break;
            }
        }
    }
}
