import { IHttpResponse } from "src/models";
import { Injectable } from "uxmid-core";

import ServiceBase from "../../service-base";

@Injectable()
export default class UploadService extends ServiceBase
{
    /**
     * blob文件上传
     * @param blobs Array<Blob>
     * @param onUploadProgress 
     * @returns {IHttpResponse} IHttpResponse
     */
    public async blobUpload(blobs: Array<Blob>, onUploadProgress?: (progressEvent: any) => void): Promise<IHttpResponse>
    {
        // const result: Array<any> = [];
        const res = await this.mainApis.fileUpload({
            files: blobs,
            onUploadProgress
        });
        // res.content.forEach(item =>
        // {
        //     result.push(item);
        // });
        return res;
    }
}
