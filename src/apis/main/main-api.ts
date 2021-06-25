import { IHttpRequest } from "src/models";
import Apis from "../apis";
import { default as ApiUrl} from "./application";

export default class MainApis extends Apis<ApiUrl>
{
    public login = (options?: IHttpRequest) => this.send(this.apis.login, options, "post"); // 登录接口
    
}
