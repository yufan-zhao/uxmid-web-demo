import { IServiceProvider, ServiceProviderFactory } from "uxmid-core";
import Vue from "vue";
import { Message, Notice, Spin, ModalInstance } from "view-design";
import iview from "../components/iview";

const components: any = iview;

export class Component extends Vue
{
    /**
     * 获取默认服务容器实例。
     * @protected
     * @property
     * @returns uxmid.IServiceProvider
     */
    protected get serviceProvier(): IServiceProvider
    {
        return ServiceProviderFactory.instance.default;
    }

    /**
     * 获取一个全局加载条实例。
     * @returns LoadingBar
     */
    protected get $loading(): any
    {
        return components.LoadingBar;
    }
    
    /**
     * 获取一个全局消息提示框实例。
     * @returns Message
     */
    protected get $message(): Message
    {
        return components.Message;
    }
    
    /**
     * 获取一个全局模态框实例。
     * @returns Modal
     */
    protected get $modal(): ModalInstance
    {
        return components.Modal;
    }
    
    /**
     * 获取一个全局通知提醒实例。
     * @returns Notice
     */
    protected get $notice(): Notice
    {
        return components.Notice;
    }
    
    /**
     * 获取一个全局加载中组件实例。
     * @returns Spin
     */
    protected get $spin(): Spin
    {
        return components.Spin;
    }
}
