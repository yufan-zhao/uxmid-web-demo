import { View } from "uxmid-dashboard-web";
import { Application, LocalStorage, EnumUtils } from "uxmid-core";
import { ApplicationContext } from "../application";

import { repository } from "src/common/decorator";
import { ApplicationRepository } from "src/repository";
import { ExtendUtils } from "src/common/utils";

export default class CommonView extends View
{
    /**
     * 获取当前应用的上下文实例。
     * @protected
     * @property
     * @returns ApplicationContext
     */
    protected get applicationContext(): ApplicationContext
    {
        return Application.context as ApplicationContext;
    }

    /**
     * 图片处理函数
     * @protected
     * @property
     */
    protected get imagePath(): Function
    {
        return ExtendUtils.imagePath;
    }

    /**
     * 跳转至管理后台
     * 根据能取出的菜单自动选择指定的地址
     * @protected
     * @member
     */
    // protected jumpToManagement()
    // {
    //     // 从上下文中取出菜单
    //     const menus = this.applicationContext.serviceFactory.default.resolve<ApplicationRepository>(ApplicationRepository).primaryMenus;
    //     const destination = menus[0];
        
    //     this.applicationContext.router.push({
    //         path: destination.path
    //     });
    // }

    /**
     * 跳转至工作台
     * @protected
     * @member
     */
    // protected jumpToWorkbench()
    // {
    //     this.applicationContext.router.push({
    //         path: "/workbench"
    //     });
    // }

    /**
     * 动态标签页处理方法
     * @private
     * @returns {void}
     */
    protected jumpTo(path: string, name: string, data?: any): void
    {
        let dynamicTabs = [];
        let parentName = name;
        // 从上下文中取出菜单
        const menus = this.applicationContext.serviceFactory.default.resolve<ApplicationRepository>(ApplicationRepository).primaryMenus;
        menus.forEach(item =>
        {
            if (item.name === parentName)
            {
                dynamicTabs.push(...item.children);
            }
        });
        // this.applicationContext.store.dispatch("application/setTabs", dynamicTabs);

        this.$router.push({ path, query: data || {} });
    }

    // protected isVideo(filePath: string)
    // {
    //     let i = filePath.indexOf(".");
    //     if (i > 0)
    //     {
    //         let suf = filePath.substring(i, filePath.length);
    //         if (suf === ".mp4" || suf === ".3gpp")
    //         {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}
