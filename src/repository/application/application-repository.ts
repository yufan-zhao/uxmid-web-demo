import { Injectable } from "uxmid-core";
import BaseRepository from "../base-repository";
import { RouteConfig } from "vue-router";

@Injectable()
export default class ApplicationRepository extends BaseRepository
{
    /**
     * 左侧菜单列表
     * 一级菜单
     * @public
     * @returns { Array<RouteConfig> }
     */
    public primaryMenus: Array<RouteConfig> = [];

    /**
     * 当前路由动态面包屑菜单列表
     * 二级动态菜单
     * @public
     * @returns { Array<RouteConfig> }
     */
    public secondMenus: Array<RouteConfig> = [];

    /**
     * 当前tab菜单名称
     * @public
     * @return {String}
     */
    public currentTabName: string = "";
}
