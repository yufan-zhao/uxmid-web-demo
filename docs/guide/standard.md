# 前端编码规范

::: tip 完整的规范
详见[前端编码指南](https://github.com/uxmid/FE-code-guide)
:::

**常见的代码规范示例：**

1. **花括号、中括号需要换行（并不强求，总监都躺平了）**

``` typescript
// 正确示范
let obj: any =
{
    code: 200
};
function setName(name: string)
{
    this.name = name;
}

// 错误示范
let obj: any = {
    code: 200
} // 漏了分号
function setName(name: string){ // 右括号后没有空格
    this.name = name;
}
```

2. **导入模块请使用绝对路径（相信我，这个真的有用，老胡已经离不开绝对路径了）**

``` typescript
// 正确示范
import MainModal from "../_components/main-modal.vue"; // 虽然是相对路径，但是仅仅是向上一级，还算ok
import HikPlayer from "src/components/business/hik-player"; // 这种可以通过按住ctrl键直接打开组件文件，在没有文档的前提下相当方便

// 错误示范
import MainModal from "../../../../../_components/main-modal.vue" // 宛如噩梦，点不进去就算了，还要自己去算在哪一级目录下
import HikPlayer from "~business/hik-player"; // 鬼知道这个是哪个目录的简写
```

3. **枚举值请主动配置（虽然TS中会自增数值，但是多了之后特别难数）**

``` typescript
enum EVENT_TYPE
{
    /**
     * 类型A
     **/ 
    TYPE_A = 0,
    /**
     * 类型B
     **/ 
    TYPE_B = 1,
    /**
     * 类型C
     **/ 
    TYPE_C = 2
}
```
> 注释请使用如上的完整注释，使用时鼠标悬浮会有代码提示