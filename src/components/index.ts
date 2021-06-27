import * as ApplicationComponents from "./application";
import * as LayoutComponents from "./layout";

const globalComponents =
{
    ...ApplicationComponents,
    ...LayoutComponents
};

export function install(vueClass: any, opts: any = {})
{
    const _Vue = vueClass;
    Object.keys(globalComponents).forEach(key =>
    {
        _Vue.component(key, globalComponents[key]);
    });
}

export default {...globalComponents, install};
