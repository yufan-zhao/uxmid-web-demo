import "@babel/polyfill";
import { ApplicationSettings, ApplicationContext } from "src/application";
import { Application } from "uxmid-core";

// 获取应用上下文
const context = ApplicationContext.current;

// 启动应用程序
Application.start(context);
