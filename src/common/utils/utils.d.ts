import { ITreeTools } from "src/common/utils/tree/i-tree";
import { IDownloadUtil } from "src/common/utils/download/i-download";
import { IExtendUtil } from "src/common/utils/extend/i-extend";
import { IPattern } from "src/common/utils/pattern/i-pattern";
import { IUrlUtil } from "src/common/utils/url/i-url";
import { IObserverUtil } from "src/common/utils/observer/i-observer";

declare global
{
    namespace IUtils
    {
        /**
         * 树操作
         */
        type TreeTools = ITreeTools;

        /**
         * 文件下载
         */
        type DownloadUtil = IDownloadUtil;

        /**
         * 扩展方法
         */
        type ExtendUtil = IExtendUtil;

        /**
         * 常用正则表达式
         */
        type Pattern = IPattern;

        /**
         * url操作
         */
        type UrlUtil = IUrlUtil;

        /**
         * 页面元素观察者
         */
        type ObserverUtil = IObserverUtil;
    }
}
