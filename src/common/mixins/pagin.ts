import { component, Component } from "uxmid-vue-web";
import { IHttpResponse, IPaginFilterModel } from "src/models";

/**
 * 一个vue混入类
 * 提供表格分页的基本封装
 * @class
 */
@component
export default class Pagin extends Component
{
    /**
     * 分页信息-当前页数
     * @property
     */
    protected paginCurrentPage: number = 0;

    /**
     * 分页信息-当前总页数
     * @property
     */
    protected paginPages: number = 0;

    /**
     * 分页信息-当前请求每页条数
     * @property
     */
    protected paginSize: number = 10;

    /**
     * 分页信息-当前总条数
     * @property
     */
    protected paginTotal: number = 0;

    /**
     * 分页信息-表格是否正在加载
     * @property
     */
    protected paginIsLoading: boolean = false;

    /**
     * 调用接口并且处理返回数据方法
     * @param loadFunc 
     * @param searchFilters 
     */
    protected async paginLoadRecords(loadFunc: <T>(filters: IPaginFilterModel) => T, searchFilters: IPaginFilterModel): Promise<Array<any>>
    {
        searchFilters.params =
        {
            current: this.paginCurrentPage,
            size: this.paginSize
        };
        this.paginIsLoading = true;
        const res = await loadFunc<IHttpResponse>(searchFilters);
        this.paginIsLoading = false;
        this.paginCurrentPage = res.extras.current;
        this.paginPages = res.extras.pages;
        this.paginTotal = res.extras.total;
        return res.content.records;
    }
}
