import { default as iviewComponents, install as iviewInstall } from "./iview";

const install = function(Vue: any, opts: any = {})
{
    iviewInstall(Vue, opts);
    
    // Object.keys(components).forEach(key =>
    // {
    //     // uxmid 组件统一加小写 "fw" 标识
    //     // 最终在模板中使用组件时以类似 "fw-number-counter" 方式引用
    //     Vue.component("fw" + key, components[key]);
    // });
};

export * from "./iview";

export default { ...iviewComponents, install };
