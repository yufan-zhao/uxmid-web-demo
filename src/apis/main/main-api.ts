import { IHttpRequest } from "src/models";
import Apis from "../apis";

export default class MainApis extends Apis
{
    public login = (options?: IHttpRequest) => this.send(this.apis.login, options, "post"); // 登录接口
    
}
