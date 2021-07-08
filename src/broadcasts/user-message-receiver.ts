import { IBroadcastReceiver, BroadcastContext, Receivable, Map } from "uxmid-core";

import BroadcastChannels from "./channels";
import { ApplicationContext } from "src/application";
import { IApplicationCredential } from "src/models";

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
                // 释放系统凭据
                ApplicationContext.current.credential = null;

                // 跳转登录
                ApplicationContext.current.router.replace("/login");
                break;
            }
            case BroadcastChannels.LOGIN:
            {
                // 获取登录信息
                const extras: Map<string, any> = context.extras;
                const { access_token: credentialId, user } = extras.get("loginRes");

                // !! 生成凭据，并保存至上下文中
                const userProfile: any =
                {
                    id: user.userId,
                    username: user.username,
                    realname: user.name,
                    mobile: user.mobile,
                    orgId: user.orgId,
                    filePath: user.headImgUrl
                };
                const credential: IApplicationCredential =
                {
                    userId: user.userId,
                    credentialId: credentialId,
                    user: userProfile
                };
                ApplicationContext.current.credential = credential;

                ApplicationContext.current.router.push("/");
                break;
            }
        }
    }
}
