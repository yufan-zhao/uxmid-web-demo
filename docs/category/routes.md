# routes

## 常规使用说明

``` typescript
{
    name: "demo",              // 路由名称
    path: "/demo",             // 路由地址（请使用绝对路径，以"/"开头）
    component: dashboard,      // 布局组件
    meta:
    {
        label: "title",        // 菜单标题
        icon: ""               // 菜单图标（可选）
    },
    children: [...demo]        // 二级菜单（包含二级菜单的路由都会被解析为一级菜单）
}
```

标准的vue-router配置，其中携带children路由的都会被解析为侧栏菜单，children内的路由会被解析为二级tab菜单。

路由的顺序即是菜单的顺序。

不需要特别配置默认路由地址，"/"路由会取出第一个菜单的路由地址。

meta中携带的信息说明：
| 字段 | 类型 | 含义 |
| --- | --- | --- |
| label | string | 菜单的显示名称 |
| icon | string |菜单左侧icon（iconfont类） |
| hideTab | boolean |该菜单不展示tab菜单 |

## 配合权限使用说明

TODO