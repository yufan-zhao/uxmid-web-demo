# 从switch-table开始

::: tip 重点
后台管理模块是围绕switch-table组件搭建而成，所以使用switch-table组件是一切的开始。
:::

## 增加一个模块

::: tip 具体代码
见示例项目[uxmid-web-demo](https://gitee.com/yufan_zhao/uxmid-web-demo/tree/develop/src/views/demo/switch-table)
:::

1. 主模块页面组件manage.vue
2. 主模块页面详情组件detail.vue
3. 主模块页面的子模块组件目录subs

目录大致如下：
```
.
├── src
|   ...
│   ├── views
|   |   ├── new-module
|   |   |   ├──subs
|   |   |   ├──detail.vue
|   |   |   └──manage.vue
|   |   ...
|   ...
```

## 模块增加一个service

::: tip 示例代码
见示例项目[uxmid-web-demo](https://gitee.com/yufan_zhao/uxmid-web-demo/tree/develop/src/services/demo)
:::

service应该包含的几个方法：
``` typescript
@Injectable()
export default class ModuleService extends ServiceBase
{
    public async page(filters: IPaginFilterModel): Promise<IHttpResponse>
    {
        // 分页查询
    }

    public async insert(data: any): Promise<IHttpResponse>
    {
        // 新增
    }

    public async update(data: any): Promise<IHttpResponse>
    {
        // 更新
    }

    public async delete(id: number): Promise<IHttpResponse>
    {
        // 根据id删除
    }
}
```

## 对接接口

参照代码添加urls和apis，在service中去掉mock数据采用接口调用。

::: tip 示例代码
登录服务[AuthService](https://gitee.com/yufan_zhao/uxmid-web-demo/blob/develop/src/services/application/auth-service.ts)
:::

## 结合service和views

参照在.vue文件中引入service的方法，完成MVVM模块开发。

::: tip 示例代码
页面中如何引用[manage.vue](https://gitee.com/yufan_zhao/uxmid-web-demo/blob/develop/src/views/demo/switch-table/manage.vue)
:::

> 更多细节请阅读整个demo项目源码