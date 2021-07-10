# 开发环境搭建

1. **准备一个[gitee](https://gitee.com/)账号。**

    - 公司采用的是gitee企业版，可以使用已有帐号或者自行注册一个个人账号，等待管理员添加成员

2. **下载[Visual Studio Code](https://code.visualstudio.com/)和[Source Tree](https://www.sourcetreeapp.com/)。**

    - VS code[插件推荐](https://juejin.cn/post/6844904063872532487)
    - Source Tree是作为git仓库可视化操作的客户端，如有其他工具都可替代

3. **下载并安装[Node](https://nodejs.org/zh-cn/)**

    - 请全局安装[yarn](https://yarnpkg.com/getting-started/install)，公司前端项目采用yarn替代npm
    - 替换npm仓库地址为淘宝镜像
    ``` bash
    npm config set registry https://registry.npm.taobao.org
    ```
    - 安装Electron等特殊包[操作说明](http://npm.taobao.org/mirrors)
    ``` bash
    ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install -g electron
    ```

4. **注册[蓝湖](https://lanhuapp.com/)账号**

    - 公司项目的原型图和设计图都会提交蓝湖，注册之后等待管理员邀请

5. **相关工具、文档推荐**

    - [科学上网](http://googlehelper.net/)
    - 截图贴图工具[Snipaste](https://zh.snipaste.com/)
    - Typescript[中文手册](https://typescript.bootcss.com/)
    - Flex布局[完全指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
    - Vue[源码学习](https://jiongks.name/blog/vue-code-review/)
    - View UI[官方文档](https://iviewui.com/docs/introduce)

> 部分网站链接可能要翻墙