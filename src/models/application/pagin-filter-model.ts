import IPaginSearchModel from "./pagin-search-model";

/**
 * 表示一个查询模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IPaginFilterModel
{
    /**
     * 获取或设置当前页码。
     * @member
     * @returns number
     */
    params?: IPaginSearchModel;

    /**
     * 过滤和排序条件。
     * @member
     * @returns number
     */
    data?: any;

}
