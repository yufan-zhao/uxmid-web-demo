# 目录结构

::: tip 一个后台管理项目的前端目录结构大体如下：
```
.
├── public
│   ├── static          // 静态文件
│   ├── favicon.ico     // 图标
│   └── index.html      // 单页应用index.html
├── src
│   ├── apis            // 请求api和url
│   ├── application     // web上下文
│   ├── assets          // 静态资源
|   ├── broadcasts      // 广播
|   ├── common          // 通用工具、vue工具、装饰器等
|   ├── components      // 全局组件
|   ├── enums           // 枚举
|   ├── models          // 模型
|   ├── repository      // 仓储
|   ├── routes          // 路由
|   ├── services        // MVVM中的服务
|   ├── styles          // 全局样式
|   ├── types           // ts声明
|   ├── views           // 模块页面组件
|   ├── main.ts         // app入口
│   └── vendor.ts       // 第三方入口
│ 
└── package.json
```
:::

::: warning 注意
以上目录是项目中都有可能新增或者修改的目录和文件
:::