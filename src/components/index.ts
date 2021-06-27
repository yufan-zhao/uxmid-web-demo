import * as ApplicationComponents from "./application";
import * as LayoutComponents from "./layout";

const globalComponents =
{
    ...ApplicationComponents,
    ...LayoutComponents
};

export function install(Vue: any, opts: any = {})
{
    Object.keys(globalComponents).forEach(key =>
    {
        Vue.component(key, globalComponents[key]);
    });
}

export default {...globalComponents, install};
