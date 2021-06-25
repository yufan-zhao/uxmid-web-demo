import { IHttpRequest } from "src/models";
import Apis from "../apis";
import ApiUrls from "./application";

export default class MainApis extends Apis<ApiUrls>
{
    public login = (options?: IHttpRequest) => this.send(this._urls.login, options, "post"); // 登录接口

}
